
var fs = require('fs');
makePSync('a/b/c/d');
function makePSync(path){
    var ary=path.split('/');
    console.log(ary);
    var arr=[];
    for(var i=0;i<ary.length;i++){
        var curDir =  ary.slice(0,i+1).join('/');
        console.log(curDir);
        arr.push(curDir);
        console.log(arr);
        if(arr.length==i+1){
            fs.mkdir(curDir);
        }
    }
}