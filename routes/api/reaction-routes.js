//post to create a reaction stored in a single thought's reactions array field
app.post('/api/thoughts/:thoughtId/reactions', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true })
        .then(thought => res.json(thought))
        .catch(err => res.json(err));
});

//delete to pull and remove a reaction by the reaction's reactionId value
app.delete('/api/thoughts/:thoughtId/reactions/:reactionId', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true })
        .then(thought => res.json(thought))
        .catch(err => res.json(err));
});

module.exports = router;