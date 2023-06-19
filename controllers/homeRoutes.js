const router = require('express').Router();
const {
  Department,
  Course,
  Enrollment,
  Grades,
  Student,
  User,
} = require('../models');
const withAuth = require('../utils/auth');

// default url
router.get('/', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  res.render('login');
});

// login url
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

// homepage routes
router.get('/homepage', withAuth, (req, res) => {
  res.render('homepage');
});

// dashboard url: page displays specified model data! ((ADD WITH AUTHINTICATION!!!!!))
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll();
    const users = userData.map((user) => user.get({ plain: true }));

    const departmentData = await Department.findAll();
    const departments = departmentData.map((department) =>
      department.get({ plain: true })
    );

    const studentData = await Student.findAll();
    const students = studentData.map((student) => student.get({ plain: true }));

    const courseData = await Course.findAll({
      include: {
        model: Department,
        attributes: ['department_name'],
      },
    });
    const courses = courseData.map((course) => course.get({ plain: true }));

    const gradesData = await Grades.findAll({
      include: [
        {
          model: Student,
          attributes: ['first_name', 'last_name'],
        },
        {
          model: Course,
          attributes: ['course_name', 'description'],
          include: {
            model: Department,
            attributes: ['department_name'],
          },
        },
      ],
    });
    const grades = gradesData.map((grade) => grade.get({ plain: true }));

    res.render('dashboard', {
      courses,
      students,
      departments,
      grades,
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get course by id
router.get('/course/:id', async (req, res) => {
  try {
    const courseData = await Course.findByPk(req.params.id, {
      include: [
        {
          model: Department,
          attributes: ['department_name'],
        },
      ],
    });

    const course = courseData.get({ plain: true });

    res.render('course', {
      course,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all students
router.get('/students', withAuth, async (req, res) => {
  try {
    // Extract data from the Course model
    const studentData = await Student.findAll();
    const students = studentData.map((student) => student.get({ plain: true }));

    res.render('students', {
      students,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

router.get('/profile', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/homepage');
  //   return;
  // }

  res.render('profile');
});

// router.get('/dashboard', async (req, res) => {

//   const studentData = await Student.findAll();

//   const student = studentData.get({ plain: true });


//   // If the user is already logged in, redirect the request to another route
//   // if (req.session.logged_in) {
//   //   res.redirect('/student');
//   //   return;
//   // }

//   res.render('dashboard', {student,});
// });

module.exports = router;
