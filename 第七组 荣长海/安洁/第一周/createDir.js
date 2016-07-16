var fs = require('fs');


//createDirAsync('a/b/c/d');
function createDirAsync(path) {
    if (!path) {
        return;
    }
    var ary = path.split('/');
    for (var i = 1; i <= ary.length; i++) {
        var cur = ary[i];
        //a a/b a/b/c a/b/c/d
        var p = ary.slice(0, i).join('/');
        var flag = fs.existsSync(cur);
        if (!flag) {
            fs.mkdirSync(p);
        }
        //console.log(p)

    }
}


createDir('a/b/c/d', function (err) {
    console.log(err)
});
function createDir(path, callback) {
    if (!path) {
        return
    }

    var flag = 0;
    var ary = path.split('/');

    function run(err) {
        flag += 1;
        var p = ary.slice(0, flag).join('/');
        if (flag > ary.length) {
            callback(err);
            return;
        }
        fs.mkdir(p, function (err) {
            run(err);
        })

    }

    run();
}






