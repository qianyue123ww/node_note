// 模块提供了一组断言函数，用于验证不变量
const assert = require('assert');

// 生成AssertionError以便稍后比较错误的信息
const { message } = new assert.AssertionError({
    actual: 1,
    expected: 2,
    operator: 'strictEqual'
});

// 验证错误的输出：
try {
    assert.strictEqual(1, 2);
} catch (err) {
    assert(err instanceof assert.AssertionError);
    assert.strictEqual(err.message, message);
}
const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);

// async_hooks
// 异步资源表示具有关联回调的对象。这个回调可以被调用多次，例如，在. net.createServer()中的“连接”事件，或者像在. open()中一样只调用一次。还可以在调用回调之前关闭资源。异步没有明确区分这些不同的情况，而是将它们表示为一个资源的抽象概念
const async_hooks = require('async_hooks')

// 返回当前执行上下文的一个id
const eid = async_hooks.executionAsyncId()

// 对象用于表示固定长度的字节序列，Buffer类在全局作用域中
const buf1 = Buffer.alloc(10)
const buf2 = Buffer.alloc(10, 1)
const buf3 = Buffer.from([1,2,3])
// console.log(buf3)

// 当在Buffer和字符串之间转换是，可以指定字符编码。如果未指定字符编码，则使用utf-8作为默认值
const buf4 = Buffer.from('hello world', 'utf8');
console.log(buf4.toString('utf-8'))
console.log(buf4.toString('hex'));
console.log(buf4.toString('base64'));
console.log(Buffer.from('fhqwhgads', 'utf8'));
console.log(Buffer.from('fhqwhgads', 'utf16le'));

// Buffer与迭代器
const buf5 = Buffer.from([1,2,3])
for(let b of buf5) {
    console.log(b)
}

const buf6 = Buffer.from('buffer')
for(let [key, value] of buf6.entries()) {
    console.log(key, value)
}

// child——process 提供衍生子进程，此功能主要有child_process.spawn()函数提供
// const { spawn } = require('child_process')
// const ls = spawn('ls', ['-lh', ''])

// const util = require('util');
// const { stdout } = require('process');
// const exec = util.promisify(require('child_process').exec)

// async function lsExample() {
//     const { stdoutm, stderr } = await exec('ls')
//     console.log('studout:', stdout)
//     console.log('stderr:', stderr) 
// }
// lsExample()

// cluster(集群)
// 单个Node.js实例运行在单个线程中。为了充分利用多核系统，有时需要启用一组Node.js进程去处理负载任务
// cluster模块可以创建共享服务器端口的子进程

const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
    console.log(`主进程 ${process.pid}正在运行`)

    // 衍生工作进程
    for(let i = 0; i < numCPUs.length; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程${worker.process.pid}已退出`)
    })
} else {
    // 工作进程可以共享任何TCP连接。
    // 在本例子中，共享的是HTTP服务器。
    http.createServer((req, res) => {
        res.writeHead(200)
        res.end('你好世界\n')
    }).listen(8000)
    
    console.log(`工作进程${process.pid}已启动`)
}

// crypto(加密) 提供了加密功能，包括对OpenSSL的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装
const crypto = require('crypto')

const secret = 'abcdefg'
const hash = crypto.createHmac('sha256', secret)
    .update('xx')
    .digest('hex')

console.log(hash)

global.x = 5
setTimeout(() => {
    debugger
    console.log(1)
}, 1000);
console.log(2)