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

