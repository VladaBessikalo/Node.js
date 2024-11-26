const http = require('http');
const { readFile } = require('fs');

const paths = {
    root: '/',
    'index.js': '/index.js',
    "style.css": "/style.css"
}

let server = http.createServer(function (req, res) {
    
})