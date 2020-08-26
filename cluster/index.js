const cluster = require('cluster')
// 获取当前计算机有多少个核cpu 
const os =require('os')
const { clear } = require('console')

// 当前在主进程的情况下
if (cluster.isMaster) {
    for(let i = 0; i < 1; i++) {
        const worker = cluster.fork()
        let missedPing = 0
        let inter = setInterval(() => {
            console.log('ping')
            worker.send('ping')
            missedPing++;
    
            if (missedPing >= 3) {
                clearInterval(inter)
                // 拿到子进程的进程id，然后调用process.kill把这个进程杀掉
                process.kill(worker.process.pid)
            }
        },300)
        worker.on('message', (mes) => {
            if (mes === 'pong') {
                missedPing--; 
            }
        })
    }

    cluster.on('exit', () => {
        setTimeout(() => {
            cluster.fork()
        }, 5000)
    })
} else {
    require('./app')

    process.on('message', (mes) => {
        if (mes == 'ping') {
            console.log('pong')
            process.send('pong')
        }
    })
    process.on('uncaughtException', (err) => {
        console.error(err)

        process.exit(1)
    })

    setInterval(() => {
        // 内存泄漏退出子进程
        if (process.memoryUsage().rss > 734003200) {
            process.exit(1)
        }
    }, 5000);
}
