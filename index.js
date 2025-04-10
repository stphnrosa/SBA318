const http = require("http");

http
.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("");
    res.end()
});