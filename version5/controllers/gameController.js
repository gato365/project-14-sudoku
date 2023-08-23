// Get Thoughts and User Models
const { gameRecord } = require('../models');

// Get GameRecord Model

module.exports = {
    // Post a new game record
    createGameRecord(req, res) {
        gameRecord.create(req.body)
            .then((newGameRecord) => {
                res.status(200).json(newGameRecord);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Get all game records
    getAllGameRecords(req, res) {
        gameRecord.find({})
            .then((gameRecords) => {
                res.status(200).json(gameRecords);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Get a game record by id
    getGameRecordById(req, res) {
        gameRecord.findById(req.params.id)
            .then((gameRecord) => {
                res.status(200).json(gameRecord);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};


