const { Student } = require('../models');

const studentData = [
  {
    first_name: 'John',
    last_name: 'Doe',
  },
  {
    first_name: 'Jane',
    last_name: 'Smith',
  },
  // Add more student data HERE
];

const seedStudents = () => Student.bulkCreate(studentData);

module.exports = seedStudents;
