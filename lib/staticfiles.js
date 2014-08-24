var fs = require('fs');
var path = require('path');
var mime = require('mime');
var responses = require('./responses');

var cache = {};

module.exports = {
    serve: function(res, absFilePath) {
        var cachedFile = cache[absFilePath];
        if (typeof  cachedFile !== 'undefined') {
            responses.Ok(res, cachedFile.fileContents, cachedFile.contentType);
        } else {
            fs.exists(absFilePath, function (exists) {
                if (exists) {
                    fs.readFile(absFilePath, {encoding: 'utf8'}, function (err, data) {
                        if (err) {
                            responses.NotFound(res);
                        } else {
                            cache[absFilePath] = {fileContents: data, contentType: mime.lookup(path.basename(absFilePath))};
                            responses.Ok(res, cache[absFilePath].fileContents, cache[absFilePath].contentType);
                        }
                    });
                } else {
                    responses.NotFound(res);
                }
            })
        }
    }
};

