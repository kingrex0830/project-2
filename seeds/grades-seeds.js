const { Grades } = require('../models');

const gradesData = [
  // Course 1 Grades
  {
    value: 'A',
    student_id: 1,
    course_id: 1,
  },
  {
    value: 'B',
    student_id: 2,
    course_id: 1,
  },
  {
    value: 'B',
    student_id: 3,
    course_id: 1,
  },
  {
    value: 'C',
    student_id: 4,
    course_id: 1,
  },
  {
    value: 'A',
    student_id: 5,
    course_id: 1,
  },

  // Course 2 Grades
  {
    value: 'B',
    student_id: 1,
    course_id: 2,
  },
  {
    value: 'C',
    student_id: 2,
    course_id: 2,
  },
  {
    value: 'A',
    student_id: 3,
    course_id: 2,
  },
  {
    value: 'B',
    student_id: 4,
    course_id: 2,
  },
  {
    value: 'C',
    student_id: 5,
    course_id: 2,
  },

  // Course 3 Grades
  {
    value: 'A',
    student_id: 6,
    course_id: 3,
  },
  {
    value: 'B',
    student_id: 7,
    course_id: 3,
  },
  {
    value: 'C',
    student_id: 8,
    course_id: 3,
  },
  {
    value: 'A',
    student_id: 9,
    course_id: 3,
  },
  {
    value: 'B',
    student_id: 10,
    course_id: 3,
  },

  // Course 4 Grades
  {
    value: 'B',
    student_id: 6,
    course_id: 4,
  },
  {
    value: 'C',
    student_id: 7,
    course_id: 4,
  },
  {
    value: 'A',
    student_id: 8,
    course_id: 4,
  },
  {
    value: 'B',
    student_id: 9,
    course_id: 4,
  },
  {
    value: 'C',
    student_id: 10,
    course_id: 4,
  },

  // Course 5 Grades
  {
    value: 'A',
    student_id: 1,
    course_id: 5,
  },
  {
    value: 'B',
    student_id: 7,
    course_id: 5,
  },
  {
    value: 'C',
    student_id: 3,
    course_id: 5,
  },
  {
    value: 'A',
    student_id: 10,
    course_id: 5,
  },
  {
    value: 'B',
    student_id: 5,
    course_id: 5,
  }
];

const seedGrades = () => Grades.bulkCreate(gradesData);

module.exports = seedGrades;
