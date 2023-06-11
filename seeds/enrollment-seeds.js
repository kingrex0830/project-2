const { Enrollment } = require('../models');

const enrollmentData = [
  {
    student_id: 1,
    course_id: 1,
    grades_id: 1,
  },
  {
    student_id: 2,
    course_id: 2,
    grades_id: 2,
  },
  // Add more enrollment data HERE
];

const seedEnrollments = () => Enrollment.bulkCreate(enrollmentData);

module.exports = seedEnrollments;
