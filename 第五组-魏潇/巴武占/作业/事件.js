
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

Event.prototype.emit = function (eventName) {
    var args = Array.prototype.slice.call(arguments,1);
    var cur = this._events[eventName];
    var that = this;
    if(cur){
        cur.forEach(function (item) {
            if(item.index==2){
                return
            }else{
                item.index++
            }

            item.apply(that,args);

        });
    }
};

Event.prototype.removeListener = function (eventName,callback) {
    this._events[eventName] = this._events[eventName].filter(function (item) {
        return item != callback;
    });
};
Event.prototype.once=function(eventName,fn){
    if(!this._events[eventName]){
        this._events[eventName]=[];
    }
    var a=this._events[eventName]
    for(var i=0;i< a.length;i++){
        if(fn==a[i]){
            return
        }
    }
    fn.index=1;
    a.push(fn);
};

var a=new Event();
a.on('la',b)
a.on('la',c)
a.on('la',d)
a.once('la',e)
a.once('la',e)
a.once('la',e)

function b(){
    console.log('b')
}
function c(){
    console.log('c')
}
function d(){
    console.log('d')
}
function e(){
    console.log('e')
}

a.emit('la');
a.emit('la');

