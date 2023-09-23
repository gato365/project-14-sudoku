const router = require('express').Router();

const {
    createGameRecord,
    getAllGameRecords,
    getGameRecordById
} = require('../../controllers/gameController');

// gameRecordRoutes.js
router.route('/').get(getAllGameRecords).post(createGameRecord);
router.route('/:id').get(getGameRecordById);


module.exports = router;



