# Ajax

#### XML简介

XML可扩展标记语言，被设计用来传输和存储数据。XML和HTML类似，不同的是HTML中都是预定义标签，而XML中没有预定义标签，全部都是自定义标签，用来表示一些数据。

```xml
比如有一个学生数据：name='xxx'; age=18; gender='男'
用XML表示：
<student>
	<name>xxx</name>
	<age>18</age>
	<gender>男</gender>
</student>
```

#### HTTP协议

HTTP（hypertext transport protocol）协议【超文本传输协议】，协议详细规定了浏览器和万维网服务器之间相互通信的规则。

#### AJAX基本操作

```js
// 创建对象
const xhr = new XMLHttpRequest();
// 初始化，设置请求方法和url
xhr.open('GET','http://1027.0.0.1:8000/serve');
// 发送
xhr.send();
// 事件绑定 处理服务端返回的结果
xhr.onreadystatechange = function(){
    // readystate 是 xhr 对象中的属性，表示状态 0 1 2 3 4
    if (xhr.readystate === 4) {
        // 判断响应状态码
        if(xhr.status === 200){
            console.log(xhr.response)
        }
    }
}

// Post请求
const xhr = new XMLHttpRequest();
xhr.open('POST','http://1027.0.0.1:8000/serve');
// 设置请求头
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded]')
xhr.send() 
xhr.onreadystatechange = function() {
	...
}
```

