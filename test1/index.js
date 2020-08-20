// 能取到输入node .js的参数
console.log(process.argv)
 var a = require('./lib')

 a.test = 'sb'

 process.stdin.on('data', e => {
     const t = e.toString().trim()
     console.log(t)
 })