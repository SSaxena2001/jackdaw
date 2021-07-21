const express = require('express');
const router = express.Router();

router.get('/home', (req, res) =>{
    let username = req.cookies['username'];
    res.render('landing', {username: username});
})

module.exports = router;