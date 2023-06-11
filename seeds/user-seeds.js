const { User } = require('../models');

const userData = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password1',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password2',
  },
  // Add more user data HERE
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
