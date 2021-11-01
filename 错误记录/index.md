###### react 运行报错

```js
react-refresh-runtime.development.js:465 Uncaught TypeError: Cannot read properties of undefined (reading 'forEach')
```

![img](https://img-blog.csdnimg.cn/20210110222914139.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZlaW5pZmk=,size_16,color_FFFFFF,t_70)

这个问题是因为浏览器安装了react-devtools扩展程序导致的

找到node_modules/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js这个文件，找到报错的代码，直接注释导致报错的那一行：

![img](https://img-blog.csdnimg.cn/20210110223739662.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2ZlaW5pZmk=,size_16,color_FFFFFF,t_70)

