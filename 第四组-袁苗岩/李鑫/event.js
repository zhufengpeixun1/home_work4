function Event(){
    this._events={};
}
    //on绑定事件
    Event.prototype.on=function(eventName,callback){
        if(this._events[eventName]){
            this._events[eventName].push(callback);
        }else{
            this._events[eventName]=[callback];
        }
    };
    //发布事件
    Event.prototype.emit=function(eventName){
        var args=Array.prototype.slice.call(arguments,1);
        var cur=this._events[eventName];
        var that=this;
        if(cur){
            cur.forEach(function(item){
                item.apply(that,args);
            });
        }
    };
    //移除监听
    Event.prototype.removeListener=function(eventName,callback){
        this._events[eventName]=this._events[eventName].filter(function(itme){
            return itme !=callback;
        });
    };



    Event.prototype.once = function (eventName, callback) {
        if (typeof callback !== 'function')
            throw new TypeError('listener must be a function');

        var flag = 1;
        function g() {
            this.removeListener(eventName, g);
            if (flag == 1) {
                callback.apply(this, arguments);
                flag = 0;
            }
        }
        g.callback = callback;
        this.on(eventName, g);
        return this;
    };



var e=new Event();
function eat(who){
    console.log(10+who);
}
function drink (who){
    console.log(20+who);
}
e.once('lala',eat);
e.emit('lala','hehe');
e.emit('lala','hehe');



