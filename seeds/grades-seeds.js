const { Grades } = require('../models');

const gradesData = [
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
  // Add more grades data HERE
];

const seedGrades = () => Grades.bulkCreate(gradesData);

module.exports = seedGrades;
