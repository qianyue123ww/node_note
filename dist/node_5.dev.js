"use strict";

var http = require('http');

var fs = require('fs');

http.createServer(function (req, res) {
  console.log(req.url, 233); // 浏览器默认行为，会发送一次请求请求图标

  if (req.url === '/favicon.ico') {
    res.writeHead(200);
    res.end();
    return;
  }

  res.writeHead(200);
  fs.createReadStream(__dirname + '/README.md').pipe(res);
}).listen(3000);