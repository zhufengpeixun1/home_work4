var fs=require('fs');
function mkdir(path) {
    var arr = path.split('/');
    var i = 0;
    var curDir = null;
    (function callback() {
        if (fs.existsSync(path)) {
            return;
        }
        i++;
        curDir = arr.slice(0, i).join("/");
        fs.mkdir(curDir);
        setTimeout(callback, 100);
    })();
}

mkdir('a/b/c');
