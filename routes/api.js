//require express and store
const router = require('express').Router();
const db = require('../db/database');

//reads notes from db.json
router.get ('/notes', (req, res)=>{
    db.getNotes()
        .then((notes)=>{
            return res.json(notes);
        }).catch((err)=>res.status(500).json(err))
});

//creates new note
router.post ('/notes', (req,res)=>{
    db.addNote(req.body)
        .then((note)=>res.json(note))
        .catch((err)=>res.status(500).json(err))
});


//removes note from database
router.delete ('/notes/:id', (req, res)=>{
    db
        .removeNote(req.params.id)
        .then(()=>res.json({ ok:true }))
        .catch((err)=>res.status(500).json(err))
});

module.exports =router;