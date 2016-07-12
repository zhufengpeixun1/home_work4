EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('listener must be a function');
  var fired = false;
  function g() {
    this.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }
 // g.listener = listener;
  this.on(type, g);
  return this;
};

var fs = require('fs');
function makeP(path) {
    var ary = path.split('/');
    var i = 0;
    function mkdirTmp(){
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
    mkdirTmp();
}
//注：老师不是很懂  请讲一讲
