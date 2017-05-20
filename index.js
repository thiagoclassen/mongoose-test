var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

var Contact = require('./schemas/contact');

/*var teste = new Contact({ name: 'Jacinto', number: '(41)1287-9647' });

teste.save(function (err, teste) {
    if (err) return console.log('Error save');
});

Contact.find(function (err, contacts) {
    if (err) return console.log('Error find');
    console.log(contacts.toString());
})*/

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function () {
    console.log('ON!');
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

var contacts = require('./routes/contacts');
app.use('/contacts', contacts);

app.listen(3000, function () {
    console.log('Listening on 3000');
});