const router = require('express').Router();

const {
    createGameRecord,
    getAllGameRecords,
    getGameRecordById
} = require('../../controllers/gameController');

// GET and POST at /api/gameRecord

router.route('/').get(getAllGameRecords).post(createGameRecord);

// GET one
router.route('/:id').get(getGameRecordById);


module.exports = router;