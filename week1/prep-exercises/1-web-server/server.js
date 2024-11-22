/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/html'); 
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/style.css', function(req, res) {
	res.setHeader('Content-Type', 'text/css'); 
	res.sendFile(path.join(__dirname, 'style.css'));
})

app.get('/index.js', function (req, res) {
	res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
	res.sendFile(path.join(__dirname, 'index.js'));
  });


let server = http.createServer(app)

server.listen(3030);
