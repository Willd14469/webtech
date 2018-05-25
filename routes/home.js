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

router.get('/',  function (req, res) {
    res.render('home');
});

module.exports = router;
