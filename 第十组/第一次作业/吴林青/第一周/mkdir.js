var fs = require("fs");

function makeP(path) {
    var arr = path.split("/");
    var n = 1;
    fs.mkdir(arr.slice(0, n).join("/"), function(err) {
        if (n > arr.length) { // 当创建完最后一个后立即停止，防止无限执行else语句中的创建文件
            return;
        }
        console.log(n, arr.slice(0, n).join("/"));
        // err是一个错误对象，创建文件成功时err为null，出错时err对象包含错误信息
        if (!err) {
            n++;
            return fs.mkdir(arr.slice(0, n).join("/"), arguments.callee);

        } else {
            n++;
            return fs.mkdir(arr.slice(0, n).join("/"), arguments.callee);
        }
    });
}

// 由于异步创建目录 mkdir方法的回调函数中的参数如果不对它进行处理，它是不会影响后面代码执行的
// 利用这点，以下代码也能实现相同的功能
function makeP(path) {
    var arr = path.split("/");
    var n = 1;
    fs.mkdir(arr.slice(0, n).join("/"), function(err) {
        console.log(n, arr.slice(0, n).join("/"));
        if (n < arr.length) {
            n++;
            return fs.mkdir(arr.slice(0, n).join("/"), arguments.callee);
        }
    });
}

makeP("dir/a/b/c/d");
