#### Node.js

Node.js是一个能够在服务器端运行Javascript的开放源代码、跨平台Javascript运行环境。

Node采用Google开发的V8引擎运行js代码，使用事件驱动、非阻塞和异步I/O模型等技术来提高性能，可优化应用程序的传输量和规模。

##### 模块化

> 在 Node中，一个 js文件就是一个模块
>
> 在 Node中，每一个 js文件中的 js代码都是独立运行在一个函数中，而不是全局作用域，所以一个模块中的变量和其他函数在其他模块中无法访问
>

在Node中过require（）函数来引入外部的模块，require（）可以传递一个文件的路径作为参数，node将会根据该路径来引入外部模块，这里的路径，如果使用相对路径，必须以 . 或 .. 开头。

使用require（）引入模块后，该函数会返回一个对象，这个对象代表的是引入的模块。

我们可以通过 exports 来向外部暴露变量和方法，只需要将需要暴露给外部的变量或方法设置为 exports 的属性即可。

> 在 Node中有一个全局对象 global，它的作用和网页中的 window 类似
>
> - 在全局中创建变量都会作为 global 的属性保存
> - 在全局中创建的函数都会作为 global 的方法保存

```js
//当 node 在执行模块中的代码时，它会首先在代码的最顶部，添加如下代码

function （ exports，require，module， ______filename， __dirname) {

//在最底部添加

}
//实际上模块中的代码都是包装在一个函数中执行的，并且在函数执行时，同时传递进了5个实参
exports	
	— 该对象用来将变量或函数暴露到外部
require	
	— 函数，用来引入外部的模块
module	
	— module 代表的是当前模块本身，export 就是 module 的属性
    —（既可以使用 exports 导出，也可以使用 module.exports 导出）
__filename	
	— 当前模块的完整路径
__dirname	
	— 当前模块所在文件夹的完整路径
```

exports 和 module.exports

​	—  通过 exports 只能使用 . 的方式来向外暴露内部变量  exports.xxx 

​	—  而 module.exports 既可以通过 . 的形式，也可以直接赋值

​			module.exports = {}   module.exports.xxx

##### 包package

CommonJs的包规范由`包结构`和`包描述文件`两个部分组成

包实际上就是一个压缩文件，解压后还原为目录，符合规范的目录应该包含如下文件：

```
package.json	描述文件 （必须）
bin		可执行二进制文件 （非必须）
lib		js代码（非必须）
doc		文档（非必须）
test	单元测试（非必须）
```

##### npm的命令

- `npm -v `	查看npm的版本
- `npm version  `     查看所有模块的版本
- `npm search  包名 `       搜索包
- `npm install / i  包名 `       安装包
- `npm remove 包名  `      删除包
- `npm install 包名 --save`     安装包并添加到依赖中 
- `npm install 包名 -g`    全局安装包（全局安装的包一般都是一些工具）

##### Buffer(缓冲区)

—  从结构上看，Buffer 的结构和数组非常像，操作的方法也和数组类似

—  数组不能存储二进制文件，而 Buffer 就是专门用来存储二进制数据的，使用 buffer 不需要引入模块，直接使用即可

—  在 buffer 中存储的都是二进制数据，但是在显示时都是以十六进制的形式显示的
