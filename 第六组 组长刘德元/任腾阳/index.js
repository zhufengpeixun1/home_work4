Event.prototype.once = function (eventName, callback) {
    if (typeof callback !== 'function')
        throw new TypeError('listener must be a function');
    var fired = false;
    function g() {
        this.removeListener(eventName, g);
        if (!fired) {
            fired = true;
            callback.apply(this, arguments);
        }
    }

    g.callback = callback;
    this.on(eventName, g);
    return this;
};


var fs = require('fs');
var path = require("path");
function mkP(dirname, mode, callback){
    fs.exists(dirname, function (exists){
        if(exists){
            callback();
        }else{
            console.log(path.dirname(dirname));
            mkP(path.dirname(dirname), mode, function (){
                fs.mkdir(dirname, mode, callback);
            });
        }
    });
}
mkP('a/b/c');