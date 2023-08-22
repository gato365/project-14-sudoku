//
const { Schema, model} = require('mongoose');

const gameRecordSchema = new Schema({
    level: String,
    timeTaken: Number, // in seconds or any preferred unit
    errors: Number,
    strategies: String
});

const GameRecord = model('GameRecord', gameRecordSchema);

module.exports = GameRecord;
