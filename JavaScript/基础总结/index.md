#### 数据类型

1. 分类
   * 基本（值）类型
     * String：任意字符串
     * Number：任意的数字
     * Boolean：true / false
     * undefined: undefined
     * null:  null
   * 对象（引用）类型
     * Object：任意对象
     * Function：一种特别的对象（可执行）
     * Array：一种特别的对象（数值下标，内部数据是有序的）
2. 判断
   * typeof
     * 返回数据类型的字符串表达式
     * typeof null === 'object'
     * var a ；  typeof a === 'undefined'
   * instanceof
     * 判断对象的具体类型
     * a instanceof b    判断 a是否为b的实例
   * ===
     * 可以判断：undefined、null

3. undefined 和 null 的区别
   * undefined 代表定义为赋值
   * null 定义并赋值了，只是值为 null
4. 什么时候给变量赋值为 null
   * 初始赋值，表明将要赋值为对象
   * 结束前，让对象成为垃圾对象（被垃圾回收器回收）
5. 严格区别变量类型和数据类型
   * 数据类型
     * 基本类型
     * 对象类型
   * 变量的类型（变量内存值的类型）
     * 基本类型：保存就是基本类型的数据
     * 引用类型：保存的是地址值



