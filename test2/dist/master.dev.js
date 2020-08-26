"use strict";

// child_process 是node的一个子进程模块
var cp = require('child_process'); // 传入的参数就是子进程的入口js
// 相当于在node.js里又跑了一个node.js，而且是通过child.js为入口的


var child_process = cp.fork(__dirname + '/child.js'); // 父进程可以给子进程发送消息 

child_process.send('haha'); // 父进程监听子进程发送来的消息

child_process.on('message', function (str) {
  console.log(666, str);
});