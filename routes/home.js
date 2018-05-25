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

router.get('/', checkAuth, function (req, res) {
    res.render('home', { username: req.session.username });
});
function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        console.log('User tried to access restricted page.');
        res.send('You are not authorized to view this page');
    }
    else {
        console.log('User logged in.');
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();
    }
}
module.exports = router;
