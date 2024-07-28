//a table for Reaction, that has a column for reactionId that uses mongoose's objectid datatype and default value is set to a new objectid. a colum for reactionBody that is a string, required, and is 280 characters maximum. a column for username that is a string and required. a column for createdAt that is a date and is the default value to the current time stamp, use a getter method to format the timestamp on query.

const { Schema, model, mongoose } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: mongoose.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

module.exports = reactionSchema;
