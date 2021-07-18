const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('signup');
})

router.post('/', function (req, res) {
    let firstname = req.body.fname;
    let lastname = req.body.lname;
    let email = req.body.email;
    console.log(firstname, lastname, email);
});

module.exports = router;