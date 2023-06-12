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
  // Add more department data HERE
];

const seedDepartments = () => Department.bulkCreate(departmentData);

module.exports = seedDepartments;
