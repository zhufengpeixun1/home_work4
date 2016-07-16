

function Event(){
    this._event={};
}
Event.prototype.on=function (eventName,callBack){
    if(!this._event[eventName]){
        this._event[eventName]=[callBack];
    }else{
        this._event[eventName].push(callBack);
    }
};
Event.prototype.emit=function(eventName){
    var arg=Array.prototype.slice.call(arguments,1);
    var ary=this._event[eventName];
    if(ary){
        ary.forEach(function(item){
            if(item.index==1){
                item.index++;
            }else if(item.index==2){
                return;
            }
            item.apply(this,ary);
        })
    }
};
Event.prototype.once=function(eventName,callBack){
    if(!this._event[eventName]){
        this._event[eventName]=[callBack];
    }else{
        this._event[eventName].push(callBack);
    }
    callBack.index=1;
};
Event.prototype.removeListener = function (eventName,callback) {
    this._events[eventName] = this._events[eventName].filter(function (item) {
        return item != callback;
    });
};

function a(){
    console.log('1')
}
var e=new Event();

e.on('11',a);

e.emit('11');
e.emit('11');
