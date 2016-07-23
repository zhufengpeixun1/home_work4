/**
 * Created by on 2016/7/11.
 */
function Event(){
    this._events = {};
}
Event.prototype.on = function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName]=[callback];
    }
};
Event.prototype.emit = function(eventName){
    var args = Array.prototype.slice.call(arguments,1);
    var cur = this._events[eventName];
    var _this = this;
    if(cur){
        cur.forEach(function(item){
            item.apply(_this,args);
        });
    }
};
Event.prototype.removeListener = function(eventName,callback){
    this._events[eventName] = this._events[eventName].filter(function(item){
        return item != callback;
    })
};
Event.prototype.off = function(eventName,callback){
    this._events[eventName] =this._events[eventName].filter(function (item) {
        return callback!=item;
    });
};
Event.prototype.once = function (eventName,callback) {
    function one(){
        callback.apply(this,arguments);
        this.off(eventName,one);
    }
    this.on(eventName,one);
};

function eat(who) {
    console.log("eat" + who);
}
function drink(who) {
    console.log("drink" + who);
}
var e = new Event();
e.once('饿了', eat);
//e.on('饿了', eat);
e.emit('饿了', '我');
e.emit('饿了', '我');
