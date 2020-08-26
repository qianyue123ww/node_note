"use strict";

var cluster = require('cluster'); // 获取当前计算机有多少个核cpu 


var os = require('os');

var _require = require('console'),
    clear = _require.clear; // 当前在主进程的情况下


if (cluster.isMaster) {
  var _loop = function _loop(i) {
    var worker = cluster.fork();
    var missedPing = 0;
    var inter = setInterval(function () {
      console.log('ping');
      worker.send('ping');
      missedPing++;

      if (missedPing >= 3) {
        clearInterval(inter); // 拿到子进程的进程id，然后调用process.kill把这个进程杀掉

        process.kill(worker.process.pid);
      }
    }, 300);
    worker.on('message', function (mes) {
      if (mes === 'pong') {
        missedPing--;
      }
    });
  };

  for (var i = 0; i < 1; i++) {
    _loop(i);
  }

  cluster.on('exit', function () {
    setTimeout(function () {
      cluster.fork();
    }, 5000);
  });
} else {
  require('./app');

  process.on('message', function (mes) {
    if (mes == 'ping') {
      console.log('pong');
      process.send('pong');
    }
  });
  process.on('uncaughtException', function (err) {
    console.error(err);
    process.exit(1);
  });
  setInterval(function () {
    // 内存泄漏退出子进程
    if (process.memoryUsage().rss > 734003200) {
      process.exit(1);
    }
  }, 5000);
}