const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { validateLoginInput, validateRegisterInput } = require('../util/validators');
const User = require('../models/User');

router.get('/',(req, res) => {
    console.log(req.cookies['errors']);
    res.render('signup', { errors: req.cookies['errors'] });
})

router.post('/signup',(req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    const { errors, valid } = validateRegisterInput(username, email, password);
    if(valid){
        User.create({username: username, password: bcrypt.hash(password, 12), email: email},(err) => {
            if(!err){
                res.cookie('username', username);
                res.cookie('errors',{});
                res.redirect('/');
            } else {
                res.cookie('errors', err);
                console.log(err);
            }
        });
    } else {
        res.cookie('errors', errors);
        res.redirect('/');
    }
});

router.post('/', async (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    const { errors, valid } = validateLoginInput(username, password);
    if(valid){
        const user =  await User.findOne({username: username});
        if(!user){
            res.cookie('errors',{username: "User not found"});
            res.redirect('/');
        } else {
            if(bcrypt.compare(password, user.password)){
                res.cookie('username', username);
                res.cookie('errors', {});
                res.redirect('/home');
            } else {
                res.cookie('errors',{password: "Password incorrect!"});
                res.redirect('/');
            }
        }
    } else {
        res.cookie('errors', errors);
        res.redirect('/');
    }
})

module.exports = router;