var util = require("util"),
    EventEmitter = require('events');
EventEmitter.prototype.once = function (type, listener) {
    if (!util.isFunction(listener)) {
        throw TypeError('listener must be a function');
    }
    function g() {
        this.removeListener(type, g);
        listener.apply(this, arguments);
    }
    g.listener = listener;
    this.on(type, g);
    return this
};
var e = new EventEmitter();
function loveMoney(who){
    console.log('loveMoney'+who);
}
function loveCry(who){
    console.log('loveCry'+who);
}
e.once('girl',loveCry);
e.on('girl',loveMoney);
e.emit('girl','xxx');
e.emit('girl','xxx');
console.log(e.listeners('girl'));