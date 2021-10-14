> JSON Server
>
> 1. npm install -g json-server
>
> 2. 创建一个 db.json 文件
>
>    ```json
>    {
>    	"post": [ // 端口名
>            {
>                "id":1,"title":"json-server","author":"typicode" // 端口返回内容
>            }
>        ],
>        "comments": [
>            {....}
>        ]
>    }
>    ```
>
> 3. 启动服务： json-server --watch db.json
>
> 4. 通过接口 http://localhost:3000/posts/1可以得到
>
>    ```json
>    {"id":1,"title":"json-server","author":"typicode"}
>    ```

### axios

##### 拦截器（Interceptors）

```js
// 设置请求拦截器
axios.interceptors.request.use(function(config) {
    consple.log('请求拦截器成功')
    return config
}, function(error) => {
	console.log('请求拦截器失败')                           return Promise.reject(error);
})
// 设置响应拦截器
axios.interceptors.response.use(function(response) {
    console.log('响应拦截器成功')
    return response
}, function(err){
    console.log('响应拦截器失败')
    return Promise.reject(error)
})
// 发生请求
axios({
    method:'GET',
    url: 'xxx'
}).then(response => [
    console.log('自定义回调处理成功结果')
]).catch(reason => {
    console.log('自定义回调处理失败 ')
})
```

##### 取消请求

```js
// 取消请求
// 2. 声明全局变量
let cancel = null
// 检测上一次请求是否已经完成
if(cancel !== null ){ // 上次请求未结束
    cancel()
}
axios({
    method:'GET',
    url: 'xxx',
    // 1. 添加配置对象属性
    cancelToken: new axios.CancelToken(function(c) {
        // 3. 将 c 的赋值给 cancel
        cancel = c
    })
}).then( response => {
    console.log(response)
    cancel = null ; // 请求完成，将cancel值初始化
})
```

