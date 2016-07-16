var fs=require('fs');
function makeP(path){
    var ary=path.split('/');
    var str='';
    if(!fs.existsSync(path)){
        ary.forEach(function(item){
            str += item + '/';
            fs.mkdir(str, function () {
                makeP(path)
            });
        });

    }
}
makeP('a/b/c/d');