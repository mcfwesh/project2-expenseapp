// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const flash = require('connect-flash');

// User model
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// Passport

const passport = require('passport')

const ensureLogin = require('connect-ensure-login');



router.get("/", (req, res, next) => {
    res.render("auth/index");
});


//Signup Stuff 

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    if (password.length < 8) {
        res.render('auth/signup', {
            message: 'Your password must be 8 characters minimum'
        });
        return;
    }
    if (username === '') {
        res.render('auth/signup', {
            message: 'Your username cannot be empty'
        });
        return;
    }

    User.findOne({
        username: username
    }).then(found => {
        if (found !== null) {
            res.render('signup', {
                message: 'Username already exists!'
            });
        } else {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);

            User.create({
                    username: username,
                    password: hash
                })
                .then(userDB => {
                    res.redirect('/login');
                })
                .catch(err => {
                    next(err);
                });
        }
    })
});

//Login Stuff
router.get('/login', (req, res, next) => {
    res.render('auth/login', {
        message: req.flash('error')
    });
});

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
        passReqToCallback: true,
    }),
    function (req, res) {
        res.redirect('/private-page');
    });

//VIP AREA

router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render('auth/private', {
        user: req.user
    });
});

module.exports = router;