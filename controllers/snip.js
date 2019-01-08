const express = require('express');

const User = require('../models/user');


// Will also hander root index
module.exports = (app) => {

    // index
    app.get('/', (req, res) => {
        var currentUser = req.user;

        res.render('index', {
            currentUser,
        });
    })

    app.get('/frame', (req, res) => {
        var currentUser = req.user;

        res.render('frame', {
            currentUser,
        });
    })

    // uploaded code parsed, interpreted, and then displayed on this page
    app.get('/code/:id', (req, res) => {

    })

    // save a snip
    app.post('/code/:id', (req, res) => {

    })

    // update the current/saved snip (allows for using the linter to fix code within the app)
    app.put('/code/:id', (req, res) => {

    })

    // delete a saved snip
    app.delete('/code/:id', (req, res) => {

    })
}
