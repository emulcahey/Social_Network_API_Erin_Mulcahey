const { Schema, model, mongoose} = require('mongoose');
// const bcrypt = require('bcrypt');
// const Thought = require('./Thought');

const userSchema = new Schema(
    {
        // _id: {
        //     type: String
        // },
        username: {
        type: String,
        required: true,
        unique: true,
        trim: true
        },
        email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
        ],
        friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
        ]
    },
    {
        toJSON: {
        virtuals: true
        },
        id: false
    }
    );

module.exports = mongoose.model('User', userSchema);