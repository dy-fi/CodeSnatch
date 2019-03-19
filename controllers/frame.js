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

        // tesseract is passed image data
        tesseract.recognize(buffer, {lang: 'eng'})
            .progress(message => console.log(message))
            .catch(err => console.log(err))
            .then(result => {
                text = "print(\"Hello World\")";
                console.log(text);

                // json packaging for API call
                var submission = {
                    script: text,
                    language: "python3",
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
                    var memory = body.memory;

                    res.render('frame', {
                        currentUser,
                        text,
                        evaluation,
                        cpuTime,
                        memory
                    })
                });
            }).catch(e => {
                console.log(e);
            })
    })
}
