**node.js学习笔记**

如果按确切的文件名没有找到模块，则Node.js会尝试带上.js、.json或.node扩展名再加载。
- .js文件会被解析为JavaScript文本文件
- .json文件会被解析为JSON文本文件
- .node文件会被解析为通过process.dlopen()加载的编译后的插件模块
- 以'/'为前缀的模块是文件的绝对路径。
> 例如，require（‘/home/marco/foo.js'会加载/home/marco/foo.js文件）
- 以'./'为前缀的模块是相对于调用require()文件的

当没有以'/'、'./'、或'../'开头来表示文件时，这个模块必须是一个核心模块或加载自node_modules目录
如果给定的路径不存在，则require()会抛出一个code属性为'MODULE_NOT_FOUND'的Error

// 文件位置
console.log(__filename)
// 目录位置
console.log(__dirname)
// 进程信息 
console.log(process)
