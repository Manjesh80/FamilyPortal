var http = require('http');
var responses = require('./lib/responses');
var staticfiles = require('./lib/staticfiles');

http.createServer(function(req, res) {
    var filePath = false;
    if (req.url == '/') {
        filePath = './public/index.html';
    } else {
        filePath = './public' + req.url;
    }

    staticfiles.serve(res, filePath);

}).listen(3000);
console.log('server listening on http://localhost:3000');

