const router = require('express').Router();

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
router.post('/api/thoughts', (req, res) => {
    Thought.create(req.body)
        .then(({ _id }) => User.findOneAndUpdate({}, { $push: { thoughts: _id } }, { new: true }))
        .then(thought => res.json(thought))
        .catch(err => res.json(err));
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