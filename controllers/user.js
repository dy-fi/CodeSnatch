const express = require('express');

// models
const User = require('../models/users');

module.exports = (app) => {

    // get user profile
    app.get('/users/:id', (req, res) => {
        console.log("asdfsdfsd");
        var currentUser = req.user;

        User.findById(req.params.id)
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
