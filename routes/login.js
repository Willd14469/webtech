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
/* GET login form */
router.get('/', function (req, res) {
    res.render('login', { title: 'Login' });
});
router.post('/', function (req, res) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    db.get('SELECT user_id, username, password, salt from users WHERE username = ?', username, function (err, row) {
        if (err) {
            throw err;
        }
        if (row) {
            console.log('Selected following row:');
            console.log(row);
            var password_hash_with_salt = hash_password(password, row.salt);
            console.log('Password hash with salt == ', password_hash_with_salt);
            if (password_hash_with_salt === row.password) {
                console.log('Input password hash is the same as password in db, so we can log-in the user.');
                req.session.user_id = row.user_id;
                req.session.username = row.username;
                console.log('session user_id', req.session.user_id);
                res.redirect('/');
            }
            else {
                console.log('Login failed.');
                res.render('login');
            }
        }
        else {
            console.log('Username not registered.');
            res.render('login', { error_message: 'Username not registered! Please insert a valid username.' });
        }
    });
});
function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        res.send('You are not authorized to view this page');
    }
    else {
        next();
    }
}
function hash_password(password, salt) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    hash.update(salt);
    return hash.digest('hex');
}
module.exports = router;
