const express = require('express');
const tesseract = require('tesseract.js');
const safe_eval = require('safe-eval');

// models
const User = require('../models/user');
const Snip = require('../models/snips');

module.exports = (app) => {

    app.get('/frame', (req, res) => {
        var currentUser = req.user;

        res.render('frame', {
            currentUser,
        });
    })

    app.post('/frame', (req, res) => {

        var currentUser = req.user;

        // image and image data buffer
        var image = req.files.file;
        var buffer = image.data;

        // tesseract is passed image data
        tesseract.recognize(buffer, {
            lang: 'eng',
            
        })
            .progress(message => console.log(message))
            .catch(err =>  console.log(err))
            .then(result => {
                text = result.text;
                console.log(text);

                // only javascript evaluation for now
                console.log('evaluating...');

                try {
                    evaluation = safe_eval(text);
                } catch(err) {
                    evaluation = err;
                    console.log(err);
                }

                res.render('frame', {
                    currentUser,
                    text,
                    evaluation,
                })
            }).catch(e => {
                console.log(e);
            })
    })
}
