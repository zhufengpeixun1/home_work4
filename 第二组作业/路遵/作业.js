//同步
var fs=require('fs');
mkdir('a/b/c/d');
/*function makeP(path){
    var arr=path.split('/');
    for(var i=1;i<arr.length;i++){
        var curDir=arr.slice(0,i).join('/')
        var flag=fs.existsSync(curDir)
        if(!flag){
            fs.mkdirSync(curDir)
        }
    }
}*/

//异步
function mkdir(path,index){
    index=index||1;
    var ary = path.split('/');
    if (index > ary.length) {
        return
    }
    var str = ary.slice(0, index).join('/');
    if (!fs.existsSync(str)) {
        fs.mkdir(str, function () {
            index++;
            mkdir(path, index)
        })
    }
}




























