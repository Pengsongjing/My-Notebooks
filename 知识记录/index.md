#### React

###### router 的 basename

```react
basename: string
作用：为所有位置添加一个基准URL
使用场景：假如你需要把页面部署到服务器的二级目录，你可以使用 basename 设置到此目录。
<BrowserRouter basename="/minooo" />
<Link to="/react" /> // 最终渲染为 <a href="/minooo/react">
```

###### 导出组件时使用 withRouter(xxx)

```react
如果某个东西不是一个 Router，但是我们需要依靠它去跳转一个页面，这个时候就使用withRouter
class Nav extends React.Component{
    handleClick = () => {
        // Route 的 三个对象将会被放进来, 对象里面的方法可以被调用
        console.log(this.props);
    }
    render() {
        return (
            <div className={'nav'}>
                <span 
                	className={'logo'} 
                	onClick={this.handleClick}
                >
                	掘土社区
                </span>
            </div>
        );
    }
}
// 导出的是 withRouter(Nav) 函数执行
export default withRouter(Nav)
// Nav组件的props含有route的history、location、match对象
```

###### withFormik

```react
fromik是用来构建表单
Formik旨在轻松管理具有复杂验证的表单，支持同步和异步表单级和字段级验证

withFormik采用高阶组件方式来处理表单验证：
用法：withFormik({对象里面定义具体的验证})(Form)
```

###### Portals 插槽

```
ReactDOM.createPortal(React元素, 真实的DON容器)
—— 该函数返回一个React元素，将子节点渲染到存在于父组件以外的DOM节点
—— 第一个参数：是任何可渲染的React子元素，例如一个元素，字符串或fragment
—— 第二个参数：是一个DOM元素
```

