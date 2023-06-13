const router = require('express').Router();
const { Department, Course, Enrollment, Grades, Student } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const courseData = await Course.findAll(
      {
      include: [
        {
          model: Department,
          attributes: ['department_name'],
        },
      ],
    }
    );

    console.log(courseData);

    // Serialize data so the template can read it (priject is a placeholder, can be i)
    const courses = courseData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      courses, 
      // logged_in: req.session.logged_in 

    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const departmentData = await Department.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const departments = departmentData.map((project) => project.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       departments, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// router.get('/', async (req, res) => {
//   try {
//     // Get all courses and JOIN with department data
//     const courseData = await Course.findAll({
//       include: [
//         {
//           model: Department,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const courses = courseData.map((course) => course.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       courses, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in student based on the session ID
//     const studentData = await Student.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Enrollment }],
//     });

//     const student = studentData.get({ plain: true });

//     res.render('profile', {
//       ...student,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// not there yet
router.get('/student', withAuth, async (req, res) => {
  try {
    // Find the logged in student based on the session ID
    const studentData = await Student.findAll();

    const student = studentData.get({ plain: true });

    res.render('/student', {
      ...student,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/courselist', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // get courses from database and send to courselist.handlebars

  res.render('courselist.handlebars');
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
