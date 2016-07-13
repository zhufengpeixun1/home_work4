var fs = require("fs"),
    path = require("path");

function mkdirs(dirname, callback) {
    callback = callback || function () {
        };
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
}
mkdirs("a/b/c/d");
