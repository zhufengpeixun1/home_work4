//创建目录
var fs = require('fs');

var i=1;
function makeP(path) {
    var arr = path.split('/');
    var curPath=arr.slice(0,i).join('/');
    fs.exists(curPath, function (flag) {

        if (!flag)
        {
            if(i<=arr.length){
                fs.mkdir(curPath,function(){
                    i++;
                    makeP(path);
                });//创建目录
            }
        }else {
            if(i<=arr.length){
                i++;
                makeP(path)
            }
        }
    });

}
makeP('a/b/c/d');
