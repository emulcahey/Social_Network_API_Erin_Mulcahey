//a table for Reaction, that has a column for reactionId that uses mongoose's objectid datatype and default value is set to a new objectid. a colum for reactionBody that is a string, required, and is 280 characters maximum. a column for username that is a string and required. a column for createdAt that is a date and is the default value to the current time stamp, use a getter method to format the timestamp on query.

const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
}
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
//export the Thought model with the thoughtSchema

