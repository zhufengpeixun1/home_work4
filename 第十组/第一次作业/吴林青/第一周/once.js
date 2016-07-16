function Event() {
    this._events = {};
}
//绑定事件
Event.prototype.on = function(eventName, callback) {
    if (this._events[eventName]) {
        this._events[eventName].push(callback);
    } else {
        this._events[eventName] = [callback];
    }
};
//发布事件
Event.prototype.emit = function(eventName) {
    var args = Array.prototype.slice.call(arguments, 1);
    var cur = this._events[eventName];
    var that = this;
    if (cur) {
        cur.forEach(function(item) {
            item.apply(that, args);
        });
    }
};
//移除事件
Event.prototype.removeListener = function(eventName, callback) {
    this._events[eventName] = this._events[eventName].filter(function(item) {
        return item != callback;
    });
};
//once 在不改变原有emit方法上，让用once绑定的事件在执行完后自己删除
Event.prototype.once = function(eventName, callBack) {
    var that = this;
    // 预处理，让用once绑定的事件在执行完后自己删除
    function fn(args) {
        callBack(args);
        that.removeListener(eventName, arguments.callee);
    }
    if (this._events[eventName]) {
        this._events[eventName].push(fn);
    } else {
        this._events[eventName] = [fn];
    }
};

var e = new Event();

function eat(who) {
    console.log(1 + who);
}

function drink(who) {
    console.log(2);
}
e.once('饿了', eat);
e.once('饿了', drink);
e.emit('饿了', '我');
e.emit('饿了', '我');
