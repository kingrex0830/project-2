const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const signupRoutes = require('./signupRoutes');
// const aboutRoutes = require('./about');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/signup', signupRoutes);
// router.use('/about', aboutRoutes);

module.exports = router;
