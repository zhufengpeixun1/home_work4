//异步mkdir
var fs = require('fs');
function mkdirA(path) {
    var arr = path.split('/');
    if (arr[0] != '') {
        if (!fs.exists(path)) {
            var cur = arr.slice(0, arr.length - 1);
            fs.mkdir(path,  mkdirA(cur.join('/'))
           )
        }
    }
}

mkdirA('a12/b/c')

//once方法
Event.prototype.once = function (eventName, callback) {
    if (typeof callback !== 'function')
        throw new TypeError('listener must be a function');

    var flag = 1;
    function g() {
        this.removeListener(eventName, g);
        if (flag == 1) {
            callback.apply(this, arguments);
            flag = 0;
        }
    }
    g.callback = callback;
    this.on(eventName, g);
    return this;
};

