const router = require('express').Router();
const { Department, Course, Enrollment, Grades, Student } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all courses and JOIN with department data
    const courseData = await Course.findAll({
      include: [
        {
          model: Department,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const courses = courseData.map((course) => course.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      courses, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/course/:id', async (req, res) => {
  try {
    const courseData = await Course.findByPk(req.params.id, {
      include: [
        {
          model: Department,
          attributes: ['name'],
        },
      ],
    });

    const course = courseData.get({ plain: true });

    res.render('course', {
      ...course,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in student based on the session ID
    const studentData = await Student.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Enrollment }],
    });

    const student = studentData.get({ plain: true });

    res.render('profile', {
      ...student,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
