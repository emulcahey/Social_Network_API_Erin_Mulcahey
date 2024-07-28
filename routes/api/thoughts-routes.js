const router = require('express').Router();
const Thought = require('../../Models/thoughts');
const User = require('../../Models/users');
const dateFormat = require('../../utils/dateFormat');

//get all thoughts route
router.get('/api/thoughts', (req, res) => {
    Thought.find({})
        .then(thoughts => res.json(thoughts))
        .catch(err => res.json(err));
});

//get one thought by id route
router.get('/api/thoughts/:id', (req, res) => {
    Thought.findOne({ _id: req.params.id })
        .then(thought => res.json(thought))
        .catch(err => res.json(err));
});

//post a new thought route and push the created thought's _id to the associated user's thoughts array field
//use the username to find the user id and update the user's thoughts array field. and use the thoughtText to create the thought
router.post('/api/thoughts', async (req, res) => {
    try {
        // Find the user by username to get the user's _id
        const user = await User.findOne({ username: req.body.username });

        // Create a new thought using the thoughtText
        const newThought = new Thought({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
            userId: user._id
        });

        // Save the new thought to the database
        const savedThought = await newThought.save();

        // Push the created thought's _id to the user's thoughts array
        user.thoughts.push(savedThought._id);

        // Save the changes to the user document
        await user.save();

        res.status(200).json(savedThought);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the thought: the entered username may not be in use.' });
    }
});

//put to update a thought by id route
router.put('/api/thoughts/:id', (req, res) => {
    Thought.findOneAndUpdate({ _id: req
        .params
        .id
    }, req.body, { new: true })
        .then(thought => res.json(thought))
        .catch(err => res.json(err));
}
);

//delete to remove a thought by id route
router.delete('/api/thoughts/:id', (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.id })
        .then(thought => res.json(thought))
        .catch(err => res.json(err));
});

module.exports = router;