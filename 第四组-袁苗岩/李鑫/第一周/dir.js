//fs.mkdirSync(./ a./b)

makeP('a/b/c/d');
function makeP(path){
    var arr=path.split('/');
    //console.log(arr);
    for(var i=1;i<=arr.length;i++){
        var curDir=arr.slice(0,i).join('/');
        var flag=fs.mkdirSync(curDir);
        if(!flag)
        fs.mkdirSync(curDir);
    }
}











