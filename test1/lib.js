console.log('hello world')

exports.hello = 'world'


module.exports = function t(a, b) {
    return a - b
}
setTimeout(() => console.log(exports), 2000)