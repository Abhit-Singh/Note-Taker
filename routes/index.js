//require path and express
const path = require('path');
const router = require('express').Router();


// Loads notes view
router.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname,'../public/notes.html'))
});

// Loads index view
router.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
});

module.exports = router;