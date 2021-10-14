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

###### Promise 构造函数：Promise( excutor ) { }

> excutor函数：执行器 （resolve，reject） => { }
>
> resolve 函数：内部定义成功时我们调用的函数 value => { }
>
> reject 函数：内部定义失败时我们调用的函数 reason => { }
>
> 说明： executor 会在 Promise 内部立即同步调用，异步操作在执行器中执行

###### Promise.prototype.then 方法： （onResolved，onRejected ） => { }

> onResolved 函数：成功的回调函数 （value）=> { }
>
> onRejected 函数：失败的回调函数 （reason）=> { }
>
> 说明：指定用于得到成功  value 的成功回调和用于得到失败 reason 的失败回调返回一个新的 promise 对象

###### Promise.prototype.catch 方法：（onRejected） => { }

> onRejected 函数：失败的回调函数 （reason）＝> { }

###### Promise.resolve 方法：（value）=> { }

> value：成功的数据或 promise 对象
>
> 说明：返回一个成功 / 失败的 promise 对象

###### Promise.reject 方法：（reason）=> { }

> reason：失败的原因
>
> 说明：返回一个失败的 promise 对象

###### Promise.all 方法：（promises）=> { }

> promises：包含 n 个 promise 的数组
>
> 说明：返回一个新的 promise，只有所有的 promise 都成功才成功，只要有一个失败了就直接失败

###### Promise.race 方法：（promise）=> { }

> promises：包含 n 个 promise 的数组
>
> 说明：返回一个新的 promise，第一个完成的 promise 的结果状态就是最终的结果状态

#### Promise 的几个关键问题

###### 如何改变 promise 的状态？

> (1) resolve(value)：如果当前是 pending 就会变为 resolved
>
> (2) reject(reason)：如果当前是 pending 就会变为 rejected
>
> (3) 抛出异常：如果当前是 pending 就会变为 rejected

###### 一个promise指定多个成功 / 失败回调函数，都会调用吗？

> 当 promise 改变为对应状态时都会调用

###### 改变 promise 状态和指定回调函数谁先谁后？

> (1) 都有可能，正常情况下是先指定回调再改变状态，但也可以先改变状态再指定回调
>
> (2) 如何先改变状态再指定回调？
>
> ​	—  在执行器中直接调用 resolve( ) / reject( )
>
> ​	—  延迟更长时间才调用 then( )
>
> (3) 什么时候才能得到数据？
>
> ​	—  如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
>
> ​	—  如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

#### async 函数

— 函数的返回值为 promise 对象

— promise 对象的结果由 async 函数执行的返回值决定

#### await 表达式

await 右侧的表达式一般为 promise 对象，但是也可以是其它的值

​	— 如果表达式是 promise 对象，await 返回的是 promise 成功的值

​	— 如果表达式是其它值，直接将此值作为 await 的返回值

注意：

> await 必须写在 async 函数中，但 async 函数中可以没有 await
>
> 如果 await 的 promise 失败了，就会抛出异常，需要通过 try...catch 捕获处理

