var fs=require('fs');
var path='a/b/c/d';

function makeP(path){
    var ary=path.split('/');
    var str='';
    if(!fs.existsSync(path)){
        ary.forEach(function(item,index){
            str += item + '/';
            fs.mkdir(str,function(e){});
        });
        makeP(path)
    }
}
makeP(path);

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

