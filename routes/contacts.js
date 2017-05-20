var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Contact = require('../schemas/contact');
var parseJson = bodyParser.json();

router.route('/')
    .get(function (request, response) {
        response.sendFile(__dirname + '/public/contacts.JSON');
    })
    .post(parseJson, function (request, response) {
        var contact = new Contact({ name: request.body.name, number: request.body.number });
        console.log(contact);
        console.log(request.body.name);
        contact.save(function (err, contact) {
            if (err) return console.log('Error save');
        });
        response.status(201).json('OK');
    });

module.exports = router;