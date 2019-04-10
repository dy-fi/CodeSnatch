/* Mongoose Connection */
const mongoose = require('mongoose');
assert = require('assert');

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/CodeSnatch-db';
mongoose.Promise = global.Promise;
// Retry connection

mongoose.connect(
    url,
    {
        useNewUrlParser: true,
    },
    function(err, db) {
        assert.equal(null, err);
        console.log('Connected successfully to database');

        // db.close(); turn on for testing
    },

);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
// mongoose.set('debug', true); turn on for testing
mongoose.set('useCreateIndex', true);

module.exports = mongoose.connection;
