var responses = {
    NotFound: function (res) {
        res.writeHead(404,  {'Content-Type': 'text/plain'});
        res.end('Resource not found');
    },
    Ok: function (res, data, contentType) {
        var cType = contentType || 'text/plain';
        res.writeHead(200,  { 'Content-Type': cType });
        res.end(data);
    },
    Html: function(res, htmlContent) {
        this.Ok(res, htmlContent, 'text/html');
    },
    Json: function(res, obj) {
        this.Ok(res, JSON.stringify(obj), 'application/json');
    },
    Error: function (res, error) {
        res.writeHead(404,  {'Content-Type': 'text/plain'});
        res.end('Error: ' + error || 'Server error');
    }
};



module.exports = responses;