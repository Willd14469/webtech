"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./database.db');

router.get('/', function (req, res) {
    var events = [];
    db.each('SELECT * FROM events', function (err, row) {
        if (err)
            throw err;
        if (row) {
            events.push(row);
        }
    }, function (err, rows) {
        if (err)
            throw err;
        res.render('event', { events: events });
    });
});
router.get('/event', checkAuth, function (req, res) {
    var events = [];
    db.each('SELECT events.* FROM events ' +
        'LEFT JOIN events_participants ON events.event_id = event_participants.event_id ' +
        'WHERE event_participants.user_id = ?', req.session.user_id, function (err, row) {
        if (err)
            throw err;
        if (row) {
            events.push(row);
        }
    }, function (err, rows) {
        if (err)
            throw err;
        res.render('event', { events: events });
    });
});
router.get('/:event_id(\\d+)', function (req, res) {
    var event_id = req.params.group_id;
    db.get('SELECT event_name, description, contact, location FROM events WHERE event_id = ?', event_id, function (err, row) {
        if (err) {
            throw err;
        }
        if (row) {
            var event_name = row.event_name;
            var description = row.description;
            var event_location = row.location;
            res.render('event', {
                eventId: event_id,
                eventName: event_name,
                eventDescription: description,
                eventLocation: event_location
            });
        }
        else {
            res.render('notify', { notification: 'Group not found!' });
        }
    });
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
