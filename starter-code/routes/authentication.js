const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');
const User = require('../models/user');

const multer = require('multer');
const upload = multer({
    dest: './public/uploads/'
});

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', {
        message: req.flash('error')
    });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', {
        message: req.flash('error')
    });
});

router.post('/signup', ensureLoggedOut(), upload.single('photo'), passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    // console.log(req.user_id);
    // res.send(req.user._id);
    User.findById(req.user._id)
        // .then(data => res.send(data))
        .populate('photo')
        .then(data => {
            res.render('authentication/profile', {
                user: data
            });
            // res.send(data);
            // res.send(req.user);
        })
        .catch(err => console.log(err))
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;