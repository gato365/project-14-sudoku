const router = require('express').Router();
const apiRoutes = require('./api');

// API routes (e.g. /api/saveGame, /api/gameRecord/:id)
router.use('/api', apiRoutes);


// Fallback for any other route, sends an error message
router.use((req, res) => res.status(404).send('Wrong route!'));

module.exports = router;
