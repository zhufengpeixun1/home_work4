function Event (){
    this._events = {};
}
Event.prototype.on = function (eventName,callback) {
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName] = [callback];
    }
};
//发布事件
Event.prototype.emit = function (eventName) {
    var args = Array.prototype.slice.call(arguments,1);
    var cur = this._events[eventName];
    var that = this;
    if(cur){
        cur.forEach(function (item) {
            item.apply(that,args);
        });
    }
};
//移出监听
Event.prototype.removeListener = function (eventName,callback) {
    this._events[eventName] = this._events[eventName].filter(function (item) {
        return item != callback;
    });
};
Event.prototype.once= function (eventName, callback) {
    function oneTime() {
        callback.apply(this,arguments);
        this.removeListener(eventName,oneTime)
    }
    this.on(eventName,oneTime)
};


var e = new Event();
function eat (who){
    console.log(1+who);
}
function drink (who){
    console.log(2+who);
}


e.on('饿了',eat);
e.once('渴了',drink);


e.emit('渴了','我1');
e.emit('渴了','我2');
e.emit('渴了','我3');
e.emit('饿了','我1');
e.emit('饿了','我2');
e.emit('饿了','我3');

//绑定后 执行后再删除掉
