/**
 * Created by wx on 2016/7/11.
 */

function Event() {
    this._events = {};
}

Event.prototype.once = function (eventName, callback) {
    var _this = this;
    function oneFn() {
        this.removeListener(eventName, arguments.callee);
        callback.apply(_this, arguments);
    }

    oneFn.callback = callback;

    if (this._events[eventName]) {
        this._events[eventName].push(oneFn);
    } else {
        this._events[eventName] = [oneFn];
    }
};


Event.prototype.on = function (eventName, callback) {

    if (this._events[eventName]) {
        this._events[eventName].push(callback);
    } else {
        this._events[eventName] = [callback];
    }
};

//移出监听
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


        //var num = 0;
        //this._events[eventName] = ary.filter(function (item) {
        //    if(num > 0){ //num大于0表示已经删除一个了，则不删除了
        //        return true;
        //    }else{
        //        var flag = (item != fn) && (item.callback != fn);
        //        if(!flag) //flag为假表示找到要删除的项
        //        {
        //            num++;
        //        }
        //        return flag;
        //    }
        //
        //});

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
    console.log(who + '吃');
}

function drink(who) {
    console.log(who + '喝');
}

e.on('饿了',drink);
//e.on('饿了',eat);
e.once('饿了', eat);
e.on('饿了',eat);

e.removeListener('饿了',eat);
e.emit('饿了', '我');
e.emit('饿了', '我');
e.emit('饿了', '我');