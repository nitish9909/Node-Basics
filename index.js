const http = require('http');
const fs = require('fs');
const path= require('path');

const hostname= "localhost";
const port = 3000;

const server = http.createServer((req,res)=>{
    //console.log(req.headers);

    console.log('request is comming from ' +req.url + 'and byt method ' + req.method);
    if(req.method== 'GET'){
        var fileURL;
        if(req.url == '/'){
            fileURL = "/index.html";
        }else { fileURL = req.url}


        var filePath=path.resolve('./public' + fileURL); //path.resolve will creat an absolute path 
        const fileExt= path.extname(filePath);
// callback funtion will run after all other activities are complete
        if(fileExt == '.html'){
            fs.exists(filePath, (exists)=>{
                if(!exists){
                    res.statusCode=404;
                    res.setHeader('Content-Type','text/html');
                    res.end(`<html><body><h1>'error 400: '+ fileURL +' does not exist'</h1></body></html>`);
                }

                res.statusCode=200;
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(filePath).pipe(res);

            })
        }else{
            res.statusCode=404;
            res.setHeader('Content-Type','text/html');
            res.end(`<html><body><h1>'error 400: '+ fileURL +' is not a html file'</h1></body></html>`);
        }
    }else{
        res.statusCode=404;
        res.setHeader('Content-Type','text/html');
        res.end(`<html><body><h1>'error 400: '+ fileURL +' is not supported'</h1></body></html>`);
    }

    //res.statusCode=200;
    //res.setHeader('Content-Type','text/html');
    //res.end('<html><body><h1>Server Connection successful</h1></body></html>');
}) 


server.listen(port,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
})