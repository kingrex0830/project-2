const router = require('express').Router();
const { Department, Course, Enrollment, Grades, Student, User } = require('../models');
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

// dashboard url: page displays specified model data! ((ADD WITH AUTHINTICATION!!!!!))
router.get('/dashboard', async (req, res) => {
  try {


    const userData = await User.findAll();
    const users = userData.map((user) => user.get({ plain: true }));
    console.log(users);


    const departmentData = await Department.findAll();
    const departments = departmentData.map((department) => department.get({ plain: true }));
    console.log(departments);


    const studentData = await Student.findAll();
    const students = studentData.map((student) => student.get({ plain: true }));
    console.log(students);

    const courseData = await Course.findAll({
      include: {
        model: Department,
        attributes: ['department_name'],
      },
    });
    const courses = courseData.map((course) => course.get({ plain: true }));
    console.log(courses);

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
    console.log(grades);

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





// the diff is that this has Enrollment, which is not needed??? Yea...
// router.get('/dashboard', async (req, res) => {
//   try {

//     // // if not logged in, go to the login page!
//     // if (!req.session.logged_in) {
//     //   res.redirect('/login');
//     //   return;
//     // }


    
        
//     // Extract data from the Course model
//     const studentData = await Student.findAll();
//     const students = studentData.map((student) => student.get({ plain: true }));
//     console.log(students);



//     // Extract data from the Course model
//     const courseData = await Course.findAll({
//       include: [
//         {
//           model: Department,
//           attributes: ['department_name'],
//         },
//       ],
//     });
//     const courses = courseData.map((course) => course.get({ plain: true }));
//     console.log(courses);

//     // Extract data from the Grades model
//     const gradesData = await Grades.findAll({
//       include: [
//         {
//           model: Student,
//           attributes: ['first_name', 'last_name'],
//           through: { model: Enrollment },
//         },
//         {
//           model: Course,
//           attributes: ['course_name', 'description'],
//           through: { model: Enrollment },
//         },
//       ],
//     });
//     const grades = gradesData.map((grade) => grade.get({ plain: true }));

//     console.log(grades);

//     // // Extract data from the Enrollment model
//     // const enrollmentData = await Enrollment.findAll(
//     //   {
//     //   include: [
//     //     {
//     //       model: Student,
//     //       attributes: ['first_name', 'last_name'],
//     //     },
//     //     {
//     //       model: Course,
//     //       attributes: ['course_name', 'description'],
//     //     },
//     //     {
//     //       model: Grades,
//     //       attributes: ['value'],
//     //     },
//     //   ],
//     // }
//     // );
//     // const enrollment = enrollmentData.map((enroll) => enroll.get({ plain: true }));
//     // console.log(enrollment);

//     // Pass serialized data and session flag into template
//     res.render('dashboard', {
//       courses,
//       students,
//       grades,
//       // enrollment,
//       logged_in: req.session.logged_in,
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

// not there yet: Does Not Work because no students.handlebars file
router.get('/students', withAuth, async (req, res) => {
  try {
    // Extract data from the Course model
    const studentData = await Student.findAll();
    const students = studentData.map((student) => student.get({ plain: true }));

    res.render('students', {
      students,
      logged_in: true
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
//   //   res.redirect('/students');
//   //   return;
//   // }

//   res.render('dashboard', {student,});
// });

module.exports = router;
