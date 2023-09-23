// Initialize express router
const router = require('express').Router();
const gameRecordRoutes = require('./gameRecordRoutes');

// add prefix of `/gameRecord` to routes created in `gameRecord.js`
router.use('/gameRecord', gameRecordRoutes);

module.exports = router;