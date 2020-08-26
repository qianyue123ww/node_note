process.on('message', (str) => {
    console.log(str, 233)
    
    // 子进程给父进程发送消息
    process.send('hehe')
})