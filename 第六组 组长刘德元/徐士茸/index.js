EventEmitter.prototype.once = function(type, listener) {
    if (!util.isFunction(listener))
        throw TypeError('listener must be a function');
    function g() {
        this.removeListener(type, g);
        listener.apply(this, arguments);
    }
    g.listener = listener;
    this.on(type, g);
    return this;
};


//创建目录,异步的方式
var fs = require('fs');
var path = require("path");
function mkdirs(dirname, mode, callback){
    fs.exists(dirname, function (exists){
        if(exists){
            callback();
        }else{
            console.log(path.dirname(dirname));
            mkdirs(path.dirname(dirname), mode, function (){
                fs.mkdir(dirname, mode, callback);
            });
        }
    });
}

mkdirs('a/b/cc');










