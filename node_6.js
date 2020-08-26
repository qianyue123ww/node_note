// Buffer编解码二进制数据包

const buffer1 = Buffer.from('geekbang')
const buffer2 = Buffer.from([1, 2, 3, 4])

const buffer3 = Buffer.alloc(4)

console.log(buffer1)
console.log(buffer2)
console.log(buffer3.length, buffer3)


const fs = require('fs')
const protoBuf = require('protocol-buffers')
console.log(__dirname)
const messages = protoBuf(fs.readFileSync(__dirname + '/test.proto'))

const buf = messages.Test.encode({
    num: 42,
    payload: 'hello world'
})
console.log(buf);

const obj = messages.Test.decode(buf)
console.log(obj)
