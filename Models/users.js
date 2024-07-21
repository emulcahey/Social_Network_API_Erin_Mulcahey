const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Thought = require('./Thought');

const userSchema = new Schema(
    {
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

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function() {
return this.friends.length;
});


// hash user password
userSchema.pre('save', async function(next) {
if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
}})
