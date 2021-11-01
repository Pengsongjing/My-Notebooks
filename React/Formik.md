#### 简介

###### 什么是 Formik

```
Formik是React官方推荐使用的用于增强表单处理能力，简化表单处理流程 的第三方模块；让开发者更简单的开发，更专注于业务
```

> 包含验证、追踪访问字段以及处理表单提交的完整解决方案

###### 基本使用

```
使用formik进行表单数据绑定及表单提交处理
只需要使用 formik 创建一些内容，然后将这些内容与 form 表单进行绑定即可：
```

* formik 提供一个 useFormik 方法用于创建表单内容（只能用于函数组件），它接收一个配置对象，可以配置：
  * initialValues：表单的默认数据
  * onSubmit：表单提交事件处理函数，它接收表单数据作为参数
    * 不需要手动书写阻止表单默认行为的代码，默认 formik 进行了阻止
* formik 创建的内容用于表单绑定，包含：
  * values：表单数据
  * handleSubmit：表单提交事件处理函数
  * handleChange：表单项的 onChange 事件处理函数，用于数据同步
* 每个表单项通过 name、value、onChange 与 formik 创建的内容进行绑定

```react
# 安装
yarn add formik

import { useFormik } from 'formik'
function App() {
    const formik = useFormik({
        initialValues: {
            username:"张三"
        },
        onSubmit: values => {
            console.log(valuse)
        }
    })
    return (
    	<form onSubmit={formik.handleSubmit}>
            <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
            />
            <input type='submit' />
        </form>
    )
}
export default App
```

#### 表单验证

###### 初始验证

* `useFormik` 可以配置表单验证方式 `validate`
* `validate` 是一个函数，接收表单数据作为参数
* `validate` 要求返回一个对象，对象的 `key` 是验证不通过的表单项的 `name`，`value` 是验证失败的提示信息
* `useFormik` 返回的对象包含 `errors`，就是验证方法返回的结果

```react
// 上述demo添加
const formik = useFormik({
    initialValues: {
        username:"张三"
    },
    validate: values => {
        const errors = {}
        const {uesrname} = values
        if(!username){
            errors.username = '请输入用户名'
        }else if(username.length > 15){
            errors.username = '用户名长度不得超过15个字'
        }
        return errors
    }
    ,
    onSubmit: values => {
        console.log(valuse)
    }
})

<input ... name='username' />
{formik.errors.username && <p>{formik.errors.username}</p>}
```

###### 优化体验

```
体验问题：将表单默认数据设置为空，在输入用户名（焦点还未离开、密码还未改动）时，触发了验证，由于密码验证失败，显示了错误的提示信息。

优化：初始数据未变更的表单项不进行校验
```

方法：

* 开启离开焦点时触发验证
  * `useFormik `返回的对象包含 `handleBlur`方法，将其绑定到表单项的 `onBlur` 属性上，在表单失去焦点时触发验证
* 提示信息时检查表单元素的值是否被改动过
  * `useFormik` 返回的对象包含 `touched` 属性，它是一个对象，储存哪些表单数据发生了改变
  * 表单项的值发生变化后，不论是否还原为初始值， `touched` 中的标记不会再改变
  * 默认是 `{}` ，如果 `username `表单项发生了变化，则会记录为 `{username：true}`
  * 只有当表单项绑定了 `handleBlur` 事件处理函数后，`touched` 才会记录

```react
// 上述 demo 添加
<input 
    type="text"
    name="username"
    value={formik.values.username}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
/>
{(formik.touched.username && formik.errors.username) && <p>{formik.errors.username}</p>}
```

###### Yup — 更优雅的表单验证

```
Yup 是一个 Javascript 方案生成器，用于值的解析转化和验证
```

* `useFormik` 的配置选项中通过 `validationSchema` 配置验证规则
* `object()` 创建验证规则，传入一个对象，`key` 是表单项的 `name` ，值是 yup 的验证方法，例如：

```react
import * as Yup from 'yup'

const formik = useFormik({
    initialValues: {
        uesrname: ''
    },
    validationSchema: Yup.object({
        username: Yup.string()
        .max(15,'用户名长度不得超过15个字')
        .required('请输入用户名') 
        // Yup.string() 将值（不为空时）转化为字符串
    })
})
```

###### getFieldProps — 渐少样板代码

```react
useFormik 返回的对象提供了一个方法：getFieldProps，可以获取指定表单项的 name、value、onChange、onBlur属性，可以将他们直接绑定到表单项元素，减少代码重复

<input 
	type='text'
	{...formik.getFieldProps('username')}
/>
```

#### 使用组件的方式构建表单

* Formik：表单外层组件，用来包裹 Form 组件
  * 通过属性传递配置项，例如
    * initialValues
    * onSubmit
    * validationSchema
* Form：表单组件，在内部包裹一个个具体的表单项
* Field：表单项组件
  * name 属性绑定目标表单项的 name
  * 默认 Field 渲染为一个文本框
* ErrorMessage：用于显示表单验证失败的提示信息
  * name 属性绑定目标表单项的 name

```react
import * as Yup from 'yup'

const formik = useFormik({
    initialValues: {
        uesrname: ''
    },
    validationSchema: Yup.object({
        username: Yup.string()
        .max(15,'用户名长度不得超过15个字')
        .required('请输入用户名') 
        // Yup.string() 将值（不为空时）转化为字符串
    })
})

return(
	<Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={onSubmit}
     >
    	<Form>
        	<Field name='username' />
            <ErrorMessage name='username' />
        </Form>
    </Formik>
)
```

* Field 组件默认情况下渲染的是文本框（text），可以通过 as 属性指定表单元素类型

  ```
  <Field name='xxx' as='select'>
  	<option value='1'>xx</option>
  	<option value='2'>xx</option>
  </Field>
  ```


###### withFormik

```react
const forminkForm = withFormik({
    mapPropsToValues: () => ({username: ''}),
    validationSchema: Yup.object().shape({
        username: Yup.string()
                    .max(15,'不得超过15个字符')
                    .required('不得为空')
    }),
    handleSubmit: (valuse, {setSubmitting}) => {
        setSubmitting(false)
    },
    displayName: 'basicForm'
})(MyForm)
```

* `displayName` 参数是为便于调试使用的一个唯一字符串标记
* 对于参数 `mapPropsToValues` ：
  *  如果指定了这个选项，Formik就会把这个函数的执行结果（典型情况下会返回一个对象）转换成可更新的表单状态，并且使这个结果可以在新组件中进行访问（访问形式是 props.values）
  * 如果没有指定这个选项，Formik 会把所有不是函数的属性内容映射到内部组件的 props.values。也就是说，如果忽略这个参数，Formik 将仅传递不是函数的属性内容
  * 即使表单没有从父组件接收任何属性，也可以使用 mapPropsToValues 来把表单初始化为空状态
* validationSchema 定义了一个 Yup 模式
* handleSubmit是表单提交处理器函数
  * values是要提交的表单数据
  * setSubmitting 是 handleSubmit 的参数 FormikBag 中的一种取值，这里把setSubmitting的参数设置为false，意指当前表单并未正处于提交状态（因为这里仅使用简单的模拟方式来演示提交），并且会导致isSubmitting属性的值为false。

```
接下来就可以把 forminkForm 当做一个普通的 react组件来使用
<forminkForm />
```

