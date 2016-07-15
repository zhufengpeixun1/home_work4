/**
 * Created by wx on 2016/7/11.
 */

function Event() {
    this._events = {};
}

Event.prototype.once = function (eventName, callback) {
   var that=this;
   function _callback(){
        callback.apply(that,arguments)
       this.removeListener(eventName,_callback)
    }
    this.on(eventName,_callback)
};


Event.prototype.on = function (eventName, callback) {

    if (this._events[eventName]) {
        this._events[eventName].push(callback);
    } else {
        this._events[eventName] = [callback];
    }
};

//�Ƴ�����
Event.prototype.removeListener = function (eventName, fn) {
    var ary = this._events[eventName];
    if (ary) {

        for(var i=ary.length-1; i>= 0; i--){
            var curFn = ary[i];
            if(curFn && (curFn === fn || curFn.callback === fn)){
                ary[i] = null;
                return ;
            }
        }

    }
};


Event.prototype.emit = function (eventName) {

    var args = Array.prototype.slice.call(arguments, 1);
    var cur = this._events[eventName];

    var that = this;
    if (cur) {
        for(var i= 0; i<cur.length; i++){
            var curFn = cur[i];
            if(typeof curFn == 'function'){
                curFn.apply(that,args);
            }else{
                cur.splice(i,1);
                i--;
            }
        }
    }
};


var e = new Event();
function eat(who) {
    console.log(who + '��');
}

function drink(who) {
    console.log(who + '��');
}

e.on('����',drink);
//e.on('����',eat);
e.once('����', eat);
e.on('����',eat);

e.removeListener('����',eat);
e.emit('����', '��');
e.emit('����', '��');
e.emit('����', '��');