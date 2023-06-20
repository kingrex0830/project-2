const { Department } = require('../models');

const departmentData = [
  {
    department_name: 'Computer Science',
  },
  {
    department_name: 'Mathematics',
  },
  {
    department_name: 'Physics',
  },
  {
    department_name: 'Biology',
  },
  {
    department_name: 'Chemistry',
  },
  // Add more department data HERE
];

const seedDepartments = () => Department.bulkCreate(departmentData);

module.exports = seedDepartments;
