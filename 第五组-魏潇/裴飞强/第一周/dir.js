/**
 * Created by Administrator on 2016/7/12.
 */
var fs=require('fs');
//
//makeP('a/b/c/d');
//function makeP(path){
//    var ary=path.split('/');
//    for(var i=0;i<ary.length;i++){
//        var surdir=ary.slice(0,i+1).join('/')
//        var flag=fs.existsSync(surdir)
//        if(!flag){
//            fs.mkdirSync(surdir)
//        }
//    }
//}
//


//function makep(path){
//    var ary=path.split('/');
//    var i=0;
//   var sur=null;
//    (  function callback(){
//            if(fs.existsSync(path)){
//                return
//            }
//        i++;
//        sur=ary.slice(0,i).join('/');
//        fs.mkdir(sur)
//        setTimeout(callback,100)
//        })()
//}
makep('a/b/c/d')

function makep(path) {
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
















