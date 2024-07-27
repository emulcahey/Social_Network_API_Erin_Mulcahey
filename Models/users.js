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

    //{ getAllUsers, getUserById, createUser functions
    // get all users
    // userSchema.statics.getAllUsers = function() {
    //     return this.find({})
    //     .populate('users').exec();
    // }
    // // get user by id
    // userSchema.statics.getUserById = function(userId) {
    //     return this.findOne({ _id: userId })
    //     .populate('users').exec();
    // }
    // // create a user
    // userSchema.statics.createUser = function(userData) {
    //     return this.create(userData);
    // }


//export the User model with the userSchema
// const User = model('User', userSchema);
// module.exports = User;

module.exports = mongoose.model('User', userSchema);