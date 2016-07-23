var fs = require('fs');

//异步创建目录
makeDir('a/b/c/d');
function makeDir(path){
    var aPath = path.split('/'),
        i = 1;
        make(aPath,i);
}

function make(aPath,i){
    var curPath = aPath.slice(0,i).join('/');
    //判断文件是否存在
    if(!fs.exists(curPath)){
        fs.mkdir(curPath,function(err){
            if(err){
                console.error(err);
            }else{
                if(i < aPath.length){
                    ++ i;
                }else{
                    return;
                }
                make(aPath,i);
            }
        });
    }
}


// Event.prototype.once
function Event(){
    this._events = {}
}
//模拟on绑定
Event.prototype.on = function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else{
        this._events[eventName] = [callback];
    }
}
Event.prototype.emit = function(eventName){
    //参数只是类数组，转换为数组
    var args = Array.prototype.slice.call(arguments,1);
    var curEventArr = this._events[eventName];
    var that = this;
    if(curEventArr.length > 0){
        curEventArr.forEach(function(item){
            item.apply(that,args);
        });
    }

}
Event.prototype.removeListener = function(eventName,callback){
    this._events[eventName] = this._events[eventName].filter(function(item){
       return item != callback;
    });
}
Event.prototype.once = function(eventName,callback){
    var that = this;
    function _callback(){
        callback.apply(that,arguments);
        that.removeListener(eventName,_callback);
    }
    this.on(eventName,_callback);
}
function eat(who){
    console.log(who+" is eating!");
}

var e = new Event();
e.once('act',eat);
e.emit('act','He');
e.emit('act','He');

