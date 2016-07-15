Events.prototype.once = function (eventName,callback) {
    var that=this;
    function _callback() {
        callback.apply(that,arguments);
        this.removeListener(eventName,_callback);
    }
    this.on(eventName,_callback);
    //item.apply(this,args)
};
