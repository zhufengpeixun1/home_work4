/**
 * Created by Administrator on 2016/7/12 0012.
 */
var fs = require('fs');
function mkdirA(path) {
    var arr = path.split('/');
    console.log(arr.length)
    if (arr[0] != '') {
        if (!fs.exists(path)) {
            var curP = arr.slice(0, arr.length - 1);
            console.log(curP.join('/'))
            fs.mkdir(path,  mkdirA(curP.join('/'))
           )
        }
    }
}

mkdirA('a/b/c')

/*
 arr=[12,2,1,2,3,3]
 arr.pop()
 console.log(arr)*/
