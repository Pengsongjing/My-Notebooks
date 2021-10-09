### Promise 的理解和使用

#### Promise是什么？

抽象表达

> Promise 是一门新技术（ES6 规范）
>
> Promise 是 JS中进行异步编程的新解决方案（旧方案是单纯使用回调函数）

具体表达

> 从语法上来说：Promise 是一个构造函数
>
> 从功能上来说：Promise 对象用来封装一个异步操作并可以获取其成功/失败的结果值

#### 为什么要使用 Promise？

- 指定回调函数的方式更加灵活
- 支持链式调用，可以解决回调地狱问题

##### Promise的状态改变

Promise的状态，实例对象中的一个属性 【promiseState】

> pending 	未决定的
>
> resolved / fullfilled	成功
>
> rejected	失败

1. pending 变为 resolved
2. pending 变为 rejected

说明： 只有这两种，且一个 Promise 对象只能改变一次，无论变为成功还是失败，都会有一个结果数据（成功的结果数据一般称为 value，失败的结果数据一般称为 reason）

##### Promise 对象的值

实例对象中的另一个属性 【PromiseResult】

保存着异步任务【成功/失败】的结果 （ * resolve 	* reject)

#### 如何使用 Promise?

##### API

Promise 构造函数：Promise( excutor ) { }

> excutor函数：执行器 （resolve，reject） => { }
>
> resolve 函数：内部定义成功时我们调用的函数 value => { }
>
> reject 函数：内部定义失败时我们调用的函数 reason => { }
>
> 说明： executor 会在 Promise 内部立即同步调用，异步操作在执行器中执行

Promise.prototype.then 方法： （onResolved，onRejected ） => { }

> onResolved 函数：成功的回调函数 （value）=> { }
>
> onRejected 函数：失败的回调函数 （reason）=> { }
>
> 说明：指定用于得到成功  value 的成功回调和用于得到失败 reason 的失败回调返回一个新的 promise 对象

Promise.prototype.catch 方法：（onRejected） => { }

> onRejected 函数：失败的回调函数 （reason）＝> { }

