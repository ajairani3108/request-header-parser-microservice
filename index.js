// index.js
// where your node app starts

require('dotenv').config();

var express = require('express');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// static files
app.use(express.static('public'));

// home page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Request Header Parser Microservice
app.get('/api/whoami', function (req, res) {
  const ipaddress =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket.remoteAddress;

  const language = req.headers['accept-language'];

  const software = req.headers['user-agent'];

  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// listen for requests
var port = process.env.PORT || 3000;

var listener = app.listen(port, '0.0.0.0', function () {
  console.log(
    'Your app is listening on port ' + listener.address().port
  );
});
