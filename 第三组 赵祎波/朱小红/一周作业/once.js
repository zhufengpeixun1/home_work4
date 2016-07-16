function Event() {
    this._events = {};
}
Event.prototype.on = function(eventName, callback) {
    if (this._events[eventName]) {
        this._events[eventName].push(callback);
    } else {
        this._events[eventName] = [callback];
    }
};
Event.prototype.emit = function(eventName) {
    var args = Array.prototype.slice.call(arguments, 1);
    var cur = this._events[eventName];
    var that = this;
    if (cur) {
        cur.forEach(function(item) {
            item.apply(that, args);
        })
        if (cur.flag) {
            delete cur.flag
            cur.forEach(function(item) {
                that.remove(eventName, item)
            })
        }
    }
};
Event.prototype.remove = function(eventName, callback) {
    this._events[eventName] = this._events[eventName].filter(function(item) {
        return item != callback;
    })
};
Event.prototype.once = function(eventName, callback) {
    if (this._events[eventName]) {
        if (this._events[eventName].indexOf(callback) > -1) {
            return
        }
        if (this._events[eventName][callback]) {
            return
        }
        this._events[eventName].push(callback);
    } else {
        this._events[eventName] = [callback]
        this._events[eventName].flag = true;
    }
}
var e = new Event();
function eat(who) {
    console.log('eat' + who);
}
function drink(who) {
    console.log('drink' + who);
}
e.once('饿了', eat);
e.once('饿了', drink);
e.once('饿了', drink);
e.once('饿了', eat);
e.emit('饿了', '我');
e.emit('饿了', '我');