var path=require('path');
function makeP(dirname,mode,callback){
    fs.exists(dirname, function (exists){
        if(exists){
            callback();
        }else{
            makeP(path.dirname(dirname), mode, function (){
                fs.mkdir(dirname, mode, callback);
            });
        }
    });
}
makeP('a/b/c/d');




function Event(){
    this._events={};
};
Event.prototype.once=function(eventName,callback){
    var that=this;
    if(callback){
        function _callback(){
            this.removeListener(eventName,_callback);
            callback.apply(that,arguments);
        }
        _callback.callback=callback;
        this.on(eventName,_callback);
        return this;
    }
};