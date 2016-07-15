/**
 * Created by Administrator on 2016/7/12.
 */

function Event(){
    this._events={}
}

Event.prototype.on= function (eventName,callback) {
    var cur=this._events[eventName];
    if(cur){
        this._events[eventName].push(callback)
    }else{
        this._events[eventName]=[callback]
    }
}
Event.prototype.emit= function (eventName) {
    var args=  Array.prototype.slice.call(arguments,1);
    var cur=this._events[eventName];
    var that=this;
    if(cur){
        cur.forEach(function (item) {
            item.apply(that,args)
        })
    }
};
Event.prototype.removeListener= function (eventName,callback) {
    var cur=this._events[eventName];
    if(cur){
        this._events[eventName]=cur.filter(function (item) {//????
            return item!=callback
        });
    }
};

//绑定一次 多次emit  只触发一次 绑定好后 把他执行 之后将绑定好的删除
Event.prototype.once= function (eventName,callback) {
    var that=this;
    function _callback(){
        callback.apply(that,arguments)
        this.removeListener(eventName,_callback)
    }
    this.on(eventName,_callback)//将私有的函数 处理过的函数绑定给事件

};

var e=new Event();

function marry(who){
    console.log(who);
}
function marry1(who){
    console.log('marry1');
}
e.on('结婚了',marry);
e.on('结婚了',marry1);
e.removeListener('结婚了',marry)
e.emit('结婚了','you');


