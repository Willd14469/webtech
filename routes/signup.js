"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./database.db');
var crypto = require("crypto");

router.get('/', function (req, res) {
    res.render('signup', { title: 'Sign-up' });
});
router.post('/', function (req, res) {
    console.log('Signup POST called...');
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var salt = generate_salt(512);
    var password_hash_with_salt = hash_password(password, salt);
    db.get('SELECT username, user_id FROM users WHERE username = ?', username, function (err, row) {
        if (!row) {
            console.log('Username does not exist in the database.');
            db.serialize(function () {
                var statement = db.prepare("INSERT INTO users (username, password, salt) VALUES (?, ?, ?)");
                statement.run([username, password_hash_with_salt, salt], function () {
                    statement.finalize();
                    db.get('SELECT username, user_id FROM users WHERE username = ?', username, function (err, row) {
                        if (err)
                            throw err;
                        console.log(row);
                        req.session.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            req.session.user_id = row.user_id;
                            req.session.username = username;
                            console.log('Session user_id set to ', req.session.user_id);
                            if (req.session.user_id == -1) {
                                res.send('session user_id == ', -1);
                            }
                            console.log(req.session.user_id);
                            res.redirect('/');
                        });
                    });
                });
            });
        }
        else {
            console.log('Redirecting to the login page because username already in database...');
            res.redirect('/login');
        }
    });
});
function generate_salt(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
}
function hash_password(password, salt) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');
}
module.exports = router;
