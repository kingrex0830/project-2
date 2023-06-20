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
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// login url
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
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

    // Sort the grades array by student name
    const sortedGrades = grades.slice().sort((a, b) => {
      const nameA =
        `${a.student.first_name} ${a.student.last_name}`.toLowerCase();
      const nameB =
        `${b.student.first_name} ${b.student.last_name}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    res.render('dashboard', {
      courses,
      students,
      departments,
      grades,
      sortedGrades,
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

// // get student by id
// router.get('/student/:id', async (req, res) => {
//   try {
//     const studentData = await Student.findByPk(req.params.id);

//     const student = studentData.get({ plain: true });

//     res.render('students', {
//       student,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/api/grades', async (req, res) => {
  try {
    const { student_id } = req.query;

    const student = await Student.findOne({
      where: { id: student_id },
      attributes: ['id'],
    });

    if (!student) {
      // Handle the case when the student is not found
      return res.status(404).json({ error: 'Student not found' });
    }

    const grades = await Grades.findAll({
      where: { student_id: student.id },
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

    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;
