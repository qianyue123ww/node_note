"use strict";

var http = require('http');

var fs = require('fs');

var path = require('path');

http.createServer(function (req, res) {
  console.log(req.url, 233); // 浏览器默认行为，会发送一次请求请求图标

  if (req.url === '/favicon.ico') {
    res.writeHead(200);
    res.end();
    return;
  }

  res.writeHead(200, {
    'content-type': 'text/html'
  }); // setTimeout(() => console.log(window.location.href), 50)
  // fs.createReadStream(__dirname + '/README.md').pipe(res)

  console.log(path.resolve(__dirname, '../index.html'));
  res.end(fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8'));
}).listen(3000, function () {
  console.log('server start~'); // 制造假死情况

  while (true) {}
});