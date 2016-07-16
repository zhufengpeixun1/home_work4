/**
 * Created by on 2016/7/11.
 */
var fs = require("fs");
makeFile("zd/bc");
function makeFile(path){
    var ary = path.split("/");
    var num=0;
    create(num);
    function create(num){
        var route =null;
        if(num==0){
            route = ary.slice(0,++num).join();
        }else if(num<=ary.length){
            route = ary.slice(0,++num).join("/");
        }else{
            return;
        }
        var flag =  fs.existsSync(route);
        if(!flag) {
            fs.mkdir(route,function(){ console.log(route,num);
                create(num);
            });
        }
    }
}


/*var fs = require("fs");
var path = require("path");
function makeP(dirname, callback){
    fs.exists(dirname, function (exists){
        if(exists){
            callback();
        }else{
            makeP(path.dirname(dirname),function (){
                fs.mkdir(dirname,callback);
            });
        }
    });
}
makeP('a/b/c/d');*/
