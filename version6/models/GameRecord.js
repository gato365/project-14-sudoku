const { Schema, model } = require('mongoose');

const gameRecordSchema = new Schema({
    level: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard', 'expert']  // Ensure only these values are accepted
    },
    timeTaken: {
        type: String,  // Time taken is a string because it will be formatted as MM:SS
        required: true
    },
    errors: {
        type: Number,
        required: true
    },
    strategies: {
        type: String,
        default: null  // If you don't always provide strategies, default to null
    },
    dateTime: {
        type: Date,
        required: true,
        default: Date.now  // Default to current date and time
    },
    numberOfClues: {
        type: Number,
        required: true
    }
});

const gameRecord = model('gameRecord', gameRecordSchema);

module.exports = gameRecord;
