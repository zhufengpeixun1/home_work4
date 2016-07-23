/**
 * Created by Dankuer on 2016/7/19.
 */
var http=require('http');
var fs=require('fs');
var url=require('url');
var mime=require('mime');
var books=[
    {name:'nodeJs',count:3,price:30,id:1},
    {name:'AngularJs',count:1,price:10,id:2},
    {name:'vueJs',count:1,price:45,id:3},
    {name:'es6',count:3,price:0.5,id:4},
    {name:'reactJs',count:1,price:1,id:5},
    {name:'JQuery',count:1,price:9,id:6}
];
http.createServer(function(req,res){
    var urlObj=url.parse(req.url);
    var pathname=urlObj.pathname;
    console.log(pathname);
    if(pathname=='/'){
        res.setHeader('content-type','text/html;charset=utf8')
        fs.createReadStream('./bookStore.html').pipe(res);
    }else if(pathname=='/books'){
        console.log(books);
        res.setHeader('content-type','application/jason;charset=utf8')
        res.end(JSON.stringify(books));
    }else if(pathname=='/update'){
        //console.log(urlObj);
        res.setHeader('content-type','text/plain;charset=utf8')
        var temp='';
        req.on('data',function(data){
            temp+=data;
        });
        req.on('end',function(){
            var book=JSON.parse(temp).book;
            console.log(book);
            books.forEach(function(item,index){
                if(item.id==book.id){
                   //return item;
                    books[index]=book;
                    console.log(books);
                    res.end('ok');
                }
            });
            res.statusCode=500;
            res.end('fail');
        });
    }else if(pathname=='/delete'){
        //console.log(urlObj);
        res.setHeader('content-type','text/plain;charset=utf8')
        var temp='';
        req.on('data',function(data){
            temp+=data;
        });
        req.on('end',function(){
            var id=JSON.parse(temp).book.id;
            console.log(books);
            books.forEach(function(item,index){
                if(item.id==id){
                    //return item;
                    //books[index]=book;
                    //console.log(books);
                    //return item;
                    books.splice(index,1);
                }
            });
            console.log(books);
            res.end('ok');
        });
    }else if(pathname=='/add'){
        //console.log(urlObj);

        var temp='';
        req.on('data',function(data){
            temp+=data;
        });
        req.on('end',function(){
            var book=JSON.parse(temp).book;
            //console.log(book);
            book.id=books[books.length-1].id+1;
            console.log(book);
            books.push(book);
            res.setHeader('content-type','text/plain;charset=utf8');
            res.end('ok');
        });
    }else{
        if(fs.existsSync('.'+pathname)){
            res.setHeader('content-type',mime.lookup(pathname)+';charset=utf8');
             fs.createReadStream('.'+pathname).pipe(res);
        }
    }
    }).listen(3000);