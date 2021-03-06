#### 原型

###### 函数的 prototype

1. 函数的 prototype 属性
   * 每个函数都有一个 prototype 属性，它默认指向一个 Object 空对象（即称为：原型对象）
   * 每个原型对象中有一个属性 constructor，它指向函数对象
2. 给原型对象添加属性（一般都是方法）
   * 作用：函数的所有实例对象自动拥有原型中的属性（方法）

###### 显式原型与隐式原型

1. 每个函数 function 都有一个 `prototype`，即显式原型（属性）

2. 每个实例对象都有一个 `__proto__`，可称为隐式原型（属性）

3. 对象的隐式原型的值为其对应构造函数的显示原型的值

4. 总结：

   > 函数的 `prototype` 属性：在定义函数时自动添加的，默认值是一个空 Object 对象
   >
   > 对象的 `__proto__` 属性：创建对象时自动添加的，默认值为构造函数的 prototype 属性值

###### 原型链

* 访问一个对象的属性时：
  * 现在自身属性中查找，找到返回
  * 如果没有，再沿着`__proto__`这条链向上查找，找到返回
  * 如果最终没有找到，返回 undefined

*  别名：隐式原型链
* 作用：查找对象的属性（方法）

> 补充：
>
> 1. 函数的显示原型指向的对象默认是空Object实例对象（但Object不满足）
>2. 所有函数都是 Function 的实例（包含 Function）
> 3. Object 的原型对象是原型链的尽头

*instanceof 是如何判断的

* 表达式： A instanceof B
* 如果B函数的显式原型对象在A对象的原型链上，返回true，否则返回false

*Function是通过new自己产生的实例

#### 变量提升与函数提升

###### 变量声明提升

* 通过 var 定义（声明）的 变量，在定义语句之前就可以访问到
* 值：undefined

###### 函数声明提升

* 通过 function 声明的函数，在之前就可以直接调用
* 值：函数定义（对象）

#### 执行上下文

* 代码分类（位置）
  * 全局代码
  * 函数（局部）代码

* 全局执行上下文
  *  在执行全局代码前将 Window 确定为全局执行上下文
  * 对全局数据进行预处理
    * var 定义的全局变量 ==> undefined，添加为window 的属性
    * function 声明的全局函数==> 赋值（fun），添加为 window 的方法
    * this ==> 赋值（window）
  * 开始执行全局代码
* 函数执行上下文
  * 在调用函数，准备执行函数体之前，创建对应的函数执行上下文对象（虚拟的，存在于栈中）
  * 对局部数据进行预处理
    * 形参变量 ==> 赋值（实参）==> 添加为执行上下文的属性
    * arguments ==> 赋值（实参列表），添加为执行上下文的属性
    * var 定义的局部变量 ==> undefined，添加为执行上下文的属性
    * function 声明的函数 ==> 赋值（fun），添加为执行上下文的方法
    * this ==> 赋值（调用函数的对象）
  * 开始执行函数体代码

> 栈执行上下文
>
> — 在全局代码执行前，JS 引擎就会创建一个栈来存储管理所有的执行上下文对象
>
> — 在全局执行上下文（window）确定后，将其添加到栈中（压栈）
>
> — 在函数执行上下文创建后，将其添加到栈中（压栈）
>
> — 在当前函数执行完后，将栈顶的对象移除（出栈）
>
> — 当所有的代码执行完后，栈中只剩下window

#### 作用域与作用域链

* 理解
  * 就是一块‘地盘’，一个代码段所在的区域
  * 它是静态的（相对于上下文对象），在编写代码的时候就确定了
* 分类
  * 全局作用域
  * 函数作用域
  * ES6有块作用域
* 作用
  * 隔离变量，不同作用域下同名变量不会有冲突

