var fs=require('fs');
var path='a/b/c/d';

function makeP(path){
    var ary=path.split('/');
    var str='';
    if(!fs.existsSync(path)){
        ary.forEach(function(item,index){
            str += item + '/';
            fs.mkdir(str,function(e){});
        });
        makeP(path)
    }
}
makeP(path);