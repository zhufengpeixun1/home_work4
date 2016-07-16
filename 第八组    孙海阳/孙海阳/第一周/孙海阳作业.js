var fs = require("fs");
function makeP(path) {
    var ary = path.split('/');
    for (var i = 1, len = ary.length; i <= len; i++) {
        (function (i) {
            var curDir = ary.slice(0, i).join('/');
            console.log(i);
            var flag = fs.existsSync(curDir);
            if (!flag)
                fs.mkdir(curDir, function (err) {
                    if (err)return;
                });
        })(i)
    }
}
makeP('a/b/c/d');
function Event() {
    this._events = {};
    this.name = null;
}
Event.prototype.on = function (eventName, callback) {
    if (!this._events[eventName]) {
        this._events[eventName] = [];
    }
    this._events[eventName].push(callback);
    //console.log("hhhhh");
};
/*Event.prototype.on = function (eventName, callback) {
 if (this._events[eventName]) {
 this._events[eventName].push(callback);
 console.log("bb")
 } else {
 this._events[eventName] = [callback];

 }

 };*/
Event.prototype.once = function (eventName, callback) {
    var that = this,
        flag = true,
        n = 1;
    that.on(eventName, g);
    function g() {
        if (flag) {
            that.on(eventName, callback);
            flag = false;
        } else {
            if (n == 1) {
                f();
                n++;
                return;
            } else {
                return;
            }
        }
        that.emit(eventName);
    }

    function f() {
        that.removeListener(eventName, callback);
    }

    /*if (typeof callback !== 'function')
     throw new TypeError('listener must be a function');

     var fired = false;

     function g() {
     this.removeListener(eventName, g);

     if (!fired) {
     fired = true;
     callback.apply(this, arguments);
     }
     }
     g.callback = callback;
     this.on(eventName, g);
     return this;*/
};
Event.prototype.emit = function (eventName) {
    var cur = this._events[eventName],
        args = Array.prototype.slice.call(arguments, 1),
        that = this;
    if (cur) {
        cur.forEach(function (item) {
            item.apply(that, args)

        })
    }
};
Event.prototype.removeListener = function (eventName, callback) {
    this._events[eventName] = this._events[eventName].filter(function (item) {
        return item != callback;
    })
};

var e = new Event();

e.once("aaa", eat);
e.on("aaa", eat);
e.once("aaa", drink);
//e.removeListener("aaa", eat);
e.emit("aaa");
e.emit("aaa");
/*e.emit("aaa");
 e.emit("aaa");*/
function eat() {
    console.log(1)
}
function drink() {
    console.log(2)
}


