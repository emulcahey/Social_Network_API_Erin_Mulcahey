const router = require('express').Router();
const { mongo, default: mongoose } = require('mongoose');
const User = require('../../Models/users');

//get all users route
router.get('/api/users', (req, res) => {
    User.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

//get one user by id route and populated thought and friend data
router.get('/api/users/:id', async (req, res) => {
    await User.findById({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

//post a new user route
router.post('/api/users', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

//put to update user by id route
router.put('/api/users/:id', (req, res) => {
    User.findOneAndUpdate({ _id: req
        .params
        .id
    }, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
}
);

//delete user by id route
router.delete('/api/users/:id', (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

//remove a user's associated thoughts when deleted route
router.delete('/api/users/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

//add a new friend to a user's friend list route
router.post('/api/users/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

//delete to remove a friend from a user's friend list route
router.delete('/api/users/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

module.exports = router;