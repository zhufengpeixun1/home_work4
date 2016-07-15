var fs=require("fs"),
    path=require("path");
var mkdirs=module.exports.mkdirs=function(dirpath,mode,callback){
    fs.exists(dirpath,function(exists){
         if (exists){
             callback(dirpath)
         }else {
             mkdirs(path.dirname(dirpath),mode,function(){
                 fs.mkdir(dirpath,mode,callback)
             })
         }
    });
};
mkdirs('a/b/c/d');