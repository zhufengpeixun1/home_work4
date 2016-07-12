/**
 * Created by wx on 2016/7/11.
 */
var fs = require('fs');

function makeP(path) {
    var ary = path.split('/');

    var i = 0;
    function mkdirTmp(){
        //保存当前函数
        var callee = arguments.callee;
        if (i++ < ary.length) {
            //当前文件夹
            var curDir = ary.slice(0, i).join('/');
            if(fs.existsSync(curDir)){
                callee();
            }else{
                console.log(curDir);
                fs.mkdir(curDir, function () {
                    callee();
                });
            }
        }
    }
    mkdirTmp();
}

makeP('a/b/c/d');