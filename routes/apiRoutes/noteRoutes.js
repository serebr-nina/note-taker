const crypto = require('crypto');
const router = require('express').Router();
const { createNewNote, deleteById } = require('../../lib/notes');
let { notes } = require('../../db/db');

router.get('/notes', (req, res) => {
    let results = notes;
    console.log(results);
    res.json(results);
});

router.delete('/notes/:id', (req, res) => {
    console.log('delete ' + req.params.id);
    const result = deleteById(req.params.id, notes);
    notes = result;
    console.log('delete ' + result);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    // generate UUID
    req.body.id = crypto.randomUUID();

    // if any data in req.body is incorrect, send 400 error back
    //if (!validateAnimal(req.body)) {
    //    res.status(400).send('The animal is not properly formatted.');
   // } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    //}
});

module.exports = router;
