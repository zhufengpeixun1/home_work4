function Event() {
    this._events={};
}
Event.prototype.on= function (evName,callback) {
    if(this._events[evName]){
        this._events[evName].push(callback);
    }else{
        this._events[evName]=[callback];
    }
};
Event.prototype.emit= function (evName) {
    var args=Array.prototype.slice.call(arguments,1);
    var cur=this._events[evName];
    var _this=this;
    if(cur){
        cur.forEach(function (item) {
            item.apply(_this,args)
        });
        if(cur.flag){
            delete cur.flag;
            cur.forEach(function (item) {
                _this.removeListener(evName,item)
            })
        }
    }
};
Event.prototype.removeListener= function (evName,callback) {
    this._events[evName]=this._events[evName].filter(function (item) {
        return item!=callback;
    })
};
Event.prototype.once= function (evName,callback) {
    if(this._events[evName]){
        if(this._events[evName].indexOf(callback)!=-1){
            return;
        }
        this._events[evName].push(callback);
    }else{
        this._events[evName]=[callback];
        this._events[evName].flag=true;
    }
};
var e=new Event();
function eat(who) {
    console.log('eat'+who);
}
function  drink(who) {
    console.log('drink'+who);
}
e.once('饿了',eat);
e.once('饿了',eat);
e.once('饿了',drink);
e.once('饿了',drink);
e.on('饿了',drink);
e.on('饿了',eat);
e.emit('饿了','我');


//EventEmitter