// Initialize express router
const router = require('express').Router();
const gameRecordRoutes = require('./gameRecordRoutes');


// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', gameRecordRoutes);


module.exports = router;