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

Event.prototype.once = function (eventName, callback) {
    if(this._events[eventName]){
        this._events[eventName].forEach(re,this._events[eventName].push(callback));
        function re(){
            console.log('can not realize')
        }
    }else{
        this._events[eventName] = [callback];
    }
    console.log(this._events);
};




Event.prototype.emit = function (eventName) {
    var args = Array.prototype.slice.call(arguments,1);
    var cur = this._events[eventName];
    var that = this;
    if(cur){
        cur.forEach(function (item) {
            item.apply(that,args)
        })
    }
};




Event.prototype.removeListener = function (eventName,callback) {
   this._events[eventName]=this._events[eventName].filter(function(item){
       return item != callback;
   })
};






var e = new Event();

function eat (){
    console.log('绑了一个吃');
}
function drink (){
    console.log('绑了一个喝');
}
e.once('fire',eat);
e.once('fire',eat);



e.emit('fire');
