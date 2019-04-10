const express = require('express');
const passport = require('passport');

const User = require('../models/user');

module.exports = (app) => {

    app.get('/sign-up', (req, res) => {
        res.render('user-new')
    })

    app.get('/login', (req, res) => {
        res.render('user-login');
    })

    app.post('/sign-up', (req, res) => {
        var user = new User(req.body)

        user
            .save()
            .then(user => {
                res.render('index', {
                    currentUser: user,
                })
            }).catch(e => {
                console.log(e);
            })
    })

    app.post('/login', passport.authenticate('local-login', { failureRedirect: 'login' }), (req, res) => {
        console.log(req.user);
        res.redirect('/');
    })

    app.get('/login-github', passport.authenticate('github', { failureRedirect: 'login' }), (req, res) => {
        console.log(req.user);
        res.redirect('/');
    })

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })

}
