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
  {
    first_name: 'Sam',
    last_name: 'Alan',
  },
  {
    first_name: 'Jamie',
    last_name: 'Brown',
  },
  {
    first_name: 'Leon',
    last_name: 'Henderik',
  },
  {
    first_name: 'Michael',
    last_name: 'Johnson',
  },
  {
    first_name: 'Emily',
    last_name: 'Davis',
  },
  {
    first_name: 'Daniel',
    last_name: 'Wilson',
  },
  {
    first_name: 'Olivia',
    last_name: 'Anderson',
  },
  {
    first_name: 'Philib',
    last_name: 'Finn',
  },
  // Add more student data HERE
];

const seedStudents = () => Student.bulkCreate(studentData);

module.exports = seedStudents;
