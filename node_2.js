const events = require('events')
const { EventEmitter } = events

class Test extends EventEmitter {
    constructor() {
        super();
        setInterval(() => {
            this.emit('newLesson', {price: Math.random() * 100})
        }, 3000)
    }
}
// js里面，如果构造函数不需要传参，可以忽略括号
const t = new Test
t.addListener('newLesson', (price) => {
    console.log('yeah~', price)
})