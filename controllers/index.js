const express = require('express');

const User = require('../models/user');

module.exports = (app) => {

    // index
    app.get('/', (req, res) => {
        var currentUser = req.user;

        res.render('index', {
            currentUser,
        });
    })
}
