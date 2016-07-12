var fs = require('fs');
var p = require('path');
function mkdir(path) {
    var ary = path.split('/');
    console.log(ary);
    var str = '';
    ary.forEach(function (item) {
        if (ary[ary.length - 1] === item) {
            str += item;
        } else {
            str += item + '/';
        }
        console.log(str);
        fs.mkdir(str, function (e) {
        })
    });
    if (fs.existsSync(path)) {
        return;
    } else {
        mkdir(path)
    }
}
mkdir('a/b/c/d');