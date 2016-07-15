

function MyEvent(){
    this._events={};
}

MyEvent.prototype.on=function(eventName,callBack){
    if(this._events[eventName]){
        this._events[eventName].push(callBack)
    }else{
        this._events[eventName]=[callBack]
    }
};

MyEvent.prototype.emit=function(eventName){
    var args=Array.prototype.slice.call(arguments,1);
    var cur=this._events[eventName] ;
    var that=this;
    if(cur){
        cur.forEach(function(item){
           item.apply(that,args);
        })
    }
};

MyEvent.prototype.removeListener=function(eventName,callback){

    this._events[eventName]=this._events[eventName].filter(function(item){
        return item !=callback;
    })

};

MyEvent.prototype.once=function(eventName,callback){

    this.on(eventName,_onceWrap(this, eventName, callback));
};



function _onceWrap(target, eventName, callback) {
    var fired = false;
    function g() {
        target.removeListener(eventName, g);
        if (!fired) {
            fired = true;
            callback.apply(target, arguments);
        }
    }

    return g;
}


var e = new MyEvent();
function eat (who){
    console.log(1+who);
}
function drink (who){
    console.log(2+who);
}
e.once('饿了',eat);
e.on('饿了',drink);
e.emit('饿了','我');
e.emit('饿了','我');



