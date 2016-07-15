/**
 * Created by Dankuer on 2016/7/10.
 */
var fs=require('fs');
/**
 * 函数名： makeDirAsync
 * 作用：  异步递归创建文件夹
 * 输入:   path,字符串形式的目录地址，形如“a\b\c”
 * 输出：  无输出
 */
function makeDirAsync(path){
    //对参数进行初始化
    var dirArr=path.split('/');
    var i=1;
    var curDir=dirArr.slice(0,i).join('/');
    //创建一个递归方法
    (function recur(){
        console.log(curDir);
        //本级文件夹是否存在？
        fs.exists(curDir,function(isExist){
            if(!isExist){
                //不存在则创建目录
                fs.mkdir(curDir,function(err){
                    if(err) {
                        console.log(err);
                        return;
                    }
                });
            }
            //将目录推进至下一级
            curDir=dirArr.slice(0,++i).join('/');
            //设置在下一个事件循环中进行递归
            if(i<=dirArr.length) setImmediate(recur);
        });
    })();
}

//以下是测试代码
var path='a/b/c/d';
makeDirAsync(path);
