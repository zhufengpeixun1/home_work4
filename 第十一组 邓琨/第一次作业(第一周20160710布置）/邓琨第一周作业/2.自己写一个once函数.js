/**
 * Created by Dankuer on 2016/7/11.
 * 作业二
 * 在老师自定义事件的代码基础上，增加一个自己写的once方法
 */
function Event(){
    this._events={};
}
Event.prototype.on=function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName]=[callback];
    }
};
Event.prototype.emit=function(eventName){
    var newArgs=Array.prototype.slice.call(arguments,1);
    var that=this;
    //console.log(this);
    if(this._events[eventName]){
        this._events[eventName].forEach(function(item){
            //console.log(global==this);
            item.apply(that,newArgs);
        });
    }
};
Event.prototype.removeListener=function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName]=this._events[eventName].filter(function(item){
            return item!=callback;
        });
    }
};
Event.prototype.once=function(eventName,callback){
    //自己设计一个once方法
    //设计思路是，用一个经过修改的callback来取代用户的callback，
    // 修改的callback中先取消订阅，再执行回调，这样就保证了下次不再被执行

    function modifiedCallback(){
        this.removeListener(eventName,modifiedCallback);
        callback.apply(this,arguments);
    }
    this.on(eventName,modifiedCallback);
};

//以下是测试代码

function Cry(name){
    console.log(name+' is crying');
}
function Jump(name){
    console.log(name+' is jumping');
}

var name='小明';
var e=new Event();
e.once('cry',Cry);
e.once('cry',Cry);
//下面调用两次，只输出一次，证明Once功能正常
e.emit('cry',name);
e.emit('cry',name);
e.emit('cry',name);



//var EventEmitter=require('events');
//var e1= new EventEmitter();
////e1.on('cry',Cry);
//e1.once('cry',Cry);
//e1.once('cry',Cry);
//
//e1.emit('cry','小红');
//e1.emit('cry','小红');
//e1.emit('cry','小红');

