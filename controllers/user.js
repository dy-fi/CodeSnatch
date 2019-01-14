const express = require('express');

// models
const User = require('../models/user');

module.exports = (app) => {

    // get user profile
    app.get('/users/:id', (req, res) => {
        var currentUser = req.user;

        User.findById(req.params.id)
            .populate('snips')
            .then(user => {
                console.log(user);
                res.render('user-profile', {
                    user,
                    currentUser,
                })
            }).catch(e => {
                console.log(e);
            })
    })
}
