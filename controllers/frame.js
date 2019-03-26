const express = require('express');
const tesseract = require('tesseract.js');
const request = require('request');

// models
const User = require('../models/user');
const Snip = require('../models/snips');

module.exports = (app) => {

    app.post('/frame', (req, res) => {
        var currentUser = req.user;

        // image and image data buffer
        var image = req.files.file;
        var buffer = image.data;

        var language = req.body.language;
        console.log(language);

        // tesseract is passed image data
        tesseract.recognize(buffer, {lang: 'eng'})
            .progress(message => console.log(message))
            .catch(err => console.log(err))
            .then(result => {
                text = result.text;
                console.log(text);

                // json packaging for API call
                var submission = {
                    script: text,
                    language: language,
                    versionIndex: "0",
                    clientId: process.env.JDOODLE_ID,
                    clientSecret: process.env.JDOODLE_SECRET
                }
                // send image text to execution api
                request({
                    url: 'https://api.jdoodle.com/execute',
                    method: "POST",
                    json: submission
                }, function (error, response, body) {
                    console.log('error:', error);
                    console.log('statusCode:', response && response.statusCode);
                    console.log('body:', body);

                    var evaluation = body.output;
                    var cpuTime = body.cpuTime;
                    var memory = body.memory/10000;

                    res.render('frame', {
                        currentUser,
                        text,
                        evaluation,
                        cpuTime,
                        memory,
                        language,
                    })
                });
            }).catch(e => {
                console.log(e);
            })
    })

    app.post('/frame-refresh', (req, res) => {
        currentUser = req.user;

        language = req.body.language;
        text = req.body.text;

        var submission = {
            script: text,
            language: language,
            versionIndex: "0",
            clientId: process.env.JDOODLE_ID,
            clientSecret: process.env.JDOODLE_SECRET
        }

        request({
            url: 'https://api.jdoodle.com/execute',
            method: "POST",
            json: submission
        }, function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);

            var evaluation = body.output;
            var cpuTime = body.cpuTime;
            var memory = body.memory/10000;

            res.render('frame', {
                currentUser,
                text,
                evaluation,
                cpuTime,
                memory,
                language,
            })
        });
    })
}
