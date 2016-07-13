var fs = require("fs");
var path = require("path");
function makeP(dirname, callback){
    var flag=fs.existsSync(dirname);
    if(flag){
        callback(dirname);
    }else{
        makeP(path.dirname(dirname),function (){
            fs.mkdir(dirname,callback);
        });
    }
}
makeP('a/b/c/d');
