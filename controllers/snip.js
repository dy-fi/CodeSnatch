const express = require('express');

// Will also hander root index
module.exports = (app) => {

    // index
    app.get('/', (req, res) => {
        res.render('index');
    })

    app.get('/frame', (req, res) => {
        res.render('frame');
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
