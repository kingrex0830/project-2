const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Catch-all route handler for wildcard routes
router.use('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

module.exports = router;
