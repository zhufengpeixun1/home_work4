//

var fs = require('fs');
function makeP(path) {
    var ary = path.split('/');
    var i = 0;
    function mtyTime(){
        var callee = arguments.callee;
        if (i++ < ary.length) {
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
    mtyTime();
}

makeP('a/b/c/d');







