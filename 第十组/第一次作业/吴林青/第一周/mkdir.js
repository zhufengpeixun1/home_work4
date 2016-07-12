var fs = require("fs");

function makeP(path) {
    var arr = path.split("/");
    var n = 1;
    fs.mkdir(arr.slice(0, n).join("/"), function(err) {
        console.log(n, arr.slice(0, n).join("/"));
        if (n < arr.length) {
            n++;
            return fs.mkdir(arr.slice(0, n).join("/"), arguments.callee);
        }
    });
}
makeP("dir/a/b/c/d");
