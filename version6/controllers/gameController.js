const { gameRecord } = require('../models');

module.exports = {
    // Post a new game record
    async createGameRecord(req, res) {
        try {
            const newGameRecord = await gameRecord.create(req.body);
            res.status(200).json({ message: 'Game record successfully created!', data: newGameRecord });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error creating game record.', error: err });
        }
    },

    // Get all game records
    async getAllGameRecords(req, res) {
        try {
            const gameRecords = await gameRecord.find({});
            res.status(200).json({ message: 'Fetched all game records successfully.', data: gameRecords });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error fetching game records.', error: err });
        }
    },

    // Get a game record by id
    async getGameRecordById(req, res) {
        try {
            const gameRecordData = await gameRecord.findById(req.params.id);
            if (!gameRecordData) {
                res.status(404).json({ message: 'No game record found with this id!' });
                return;
            }
            res.status(200).json({ message: 'Fetched game record successfully.', data: gameRecordData });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error fetching game record by id.', error: err });
        }
    }
};
