const express = require('express');

// models
const User = require('../models/users');

module.exports = (app) => {

    // get user profile
    app.get('/users/:username', (req, res) => {
        var currentUser = req.user;

        User.find({ username: req.params.username })
            .populate('snips')
            .then(user => {
                res.render('user-profile', {
                    user,
                    currentUser,
            })
        }).catch(e => {
            console.log(e);
        })
    })
}
