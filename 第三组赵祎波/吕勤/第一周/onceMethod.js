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
