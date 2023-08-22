// Get Thoughts and User Models
const { GameRecord } = require('../models');

// Get GameRecord Model

module.exports = {
    // Post a new game record
    createGameRecord(req, res) {
        GameRecord.create(req.body)
            .then((newGameRecord) => {
                res.json(newGameRecord);
            })
            .catch((err) => {
                res.json(err);
            });
    },
    // Get all game records
    getAllGameRecords(req, res) {
        GameRecord.find({})
            .then((gameRecords) => {
                res.json(gameRecords);
            })
            .catch((err) => {
                res.json(err);
            });
    },
    // Get a game record by id
    getGameRecordById(req, res) {
        GameRecord.findById(req.params.id)
            .then((gameRecord) => {
                res.json(gameRecord);
            })
            .catch((err) => {
                res.json(err);
            });
    }
};


