// 打印模式下的所以文件名
const glob = require('glob');

var result = null;
// 阻塞IO
// console.time('glob')
// result = glob.sync(__dirname + '/**/*')
// console.log(result)
// console.timeEnd('glob')

// 非阻塞IO
glob(__dirname + '/**/*', (err, res) => {
    var result = res
    console.log(res)
})
