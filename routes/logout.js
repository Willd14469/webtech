"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
router.get('/', checkAuth, function (req, res) {
    delete req.session.user_id;
    // res.send('You have been logged out!');
	res.render('index');
});

function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        res.send('You are not authorized to view this page');
    }
    else {
        next();
    }
}
module.exports = router;
