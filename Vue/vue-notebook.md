> ##### 动态引入script
>
> 通常在html中写在body中的script标签选择动态引入，在需要引入的vue组件中的mounted生命周期中动态引入
>
> ```javascript
> mounted(){
> 	const script = document.createElement('script')
>     script.type = 'text/javascript'
>     script.src = 'js文件地址'
>     document.body.appendChild(script)
> }
> ```
>

