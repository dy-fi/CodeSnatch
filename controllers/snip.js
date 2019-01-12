const express = require('express');
const tesseract = require('tesseract.js');

// models
const User = require('../models/user');
const Snip = require('../models/snips');

// Will also handle root index
module.exports = (app) => {

    // index
    app.get('/', (req, res) => {
        var currentUser = req.user;

        res.render('index', {
            currentUser,
        });
    })

    // get a single snip and display it
    app.get('/snip/:id', (req, res) => {
        currentUser = req.user;

        Snip.findById(req.params.id).then(snip => {
            res.render('snip-show', {
                currentUser,
                snip,
            })
        })
    })

    // save a snip
    app.post('/snip', (req, res) => {
        if (req.user) {
            var snip = new Snip(req.body);
            snip.author = req.user;

                snip
                    .save()
                    // finds the right user to attribute with the snip
                    .then(user => {
                        return User.findById(req.user._id)
                    })
                    // add snip to given user
                    .then(user => {
                        user.snips.unshift(snip);
                        user.save()
                        res.redirect('/snip/' + snip._id);
                    }).catch(console.err);
        } else {
            res.status(401).send('This functionality is restricted to users only')
        }
    })

    // // update the current/saved snip (allows for using the linter to fix code within the app)
    // app.put('/snip/:id', (req, res) => {
    //
    // })

    // delete a saved snip
    app.delete('/snip/:id', (req, res) => {
        // get the snip
        Snip.findById(req.params.id)
            .then(snip => {
                // if current user is author
                if (req.user == snip.author) {
                    Snip.findbyIdAndRemove(snip._id)
                    res.redirect('/users/' + snip.author.id)
                } else {
                    res.status(403).send('This functionality is restricted to the author of this snip')
                }
            }).catch(console.err);
    })
}
