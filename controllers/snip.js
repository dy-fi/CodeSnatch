const express = require('express');
const tesseract = require('tesseract.js');

// models
const User = require('../models/user');


// Will also handle root index
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

    app.post('/frame', (req, res) => {
        var currentUser = req.user;
        var image = req.files.file.data;

        // tesseract is passed image data
        tesseract.recognize(image)
            .progress(message => console.log(message))
            .then(result => {
                text = result.text;
                console.log(text);

                // only takes javascript for now
                console.log('evaluating');

                try {
                    evaluation = eval(text)
                } catch(err) {
                    evaluation = err;
                    console.log(err);
                }


                res.render('frame', {
                    currentUser,
                    text,
                    evaluation,
                    status: true,
                })
            }).catch(e => {
                console.log(e);
            })
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
