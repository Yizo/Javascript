## 1. 插槽的作用
`作用`: 父组件传递内容给子组件

## 2. 后备插槽
`作用`: 当父组件里没有标签时，slot插槽中的标签内容将显示  

**父组件**
```js
<template>
  <div>
    <h1>这是父组件</h1>
    <child></child>
  </div>
</template>
```  

**子组件**
```js
<template>
  <div>
    <h2>这是子组件</h2>
    <slot>默认插槽内容</slot>
  </div>
</template>
```  

**渲染效果**
```html
<div>
    <h1>这里是父组件</h1>
    <div>
        <h2>这里是子组件</h2>
        默认插槽内容
    </div>
</div>
```
## 3. 插槽内容
**注意**: 当子组件里不存在`slot`标签时, **父组件里的内容都将被抛弃**  

**父组件**
```js
<template>
    <div>
        <h1>这里是父组件</h1>
        <child>
            <h3>这里是传递的内容</h3>
        </child>
    </div>
</template>
```  

**子组件**
```js
<template>
    <div>
        <h2>这里是子组件</h2>
        <slot></slot>
    </div>
</template>
```  

**渲染效果**
```html
<div>
    <h1>这里是父组件</h1>
    <div>
        <h2>这里是子组件</h2>
        <h3>这里是传递的内容</h3>
    </div>
</div>
```
## 4. 具名插槽
`作用`: 具名插槽能提供多个模版内容  

**父组件**
```js
// 缩写：#head 等价于 v-slot:head
<template>
    <div>
        <h1>这里是父组件</h1>
        <child>
            <template v-slot:head>
                <h3>这里是头部插槽</h3>
            </template>
            <template v-slot:footer>
                <h3>这里是底部插槽</h3>
            </template>
        </child>
    </div>
</template>
```  

**子组件**
```js
<template>
    <div>
        <h2>这里是子组件</h2>
        <p>这里是头部，下面是插槽</p>
        <slot name="head"></slot>
        <p>这里是底部，下面是插槽</p>
        <slot name="footer"></slot>
    </div>
</template>
```  

**渲染效果**
```html
<div>
    <h1>这里是父组件</h1>
    <div>
        <h2>这里是子组件</h2>
        <p>这里是头部，下面是插槽</p>
        <h3>这里是头部插槽</h3>
        <p>这里是底部，下面是插槽</p>
        <h3>这里是底部插槽</h3>
    </div>
</div>
```

## 5. 作用域插槽
`作用`：**让父组件访问子组件中的数据**  

> 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。  

**父组件**
```js
// slotProps 可以随意命名
// slotProps 接取的是子组件标签slot上属性数据的集合
// slotProps支持结构赋值的写法: v-slot:header="{ user }"

  <div>
    <list :arr="arr">
      <template v-slot:default="{v}">
        <div>{{v}}</div>
      </template>
    </list>
  </div>

  Vue.componetn('list', {
    props: ['arr'],
    template: `
      <ul>
        <slot v-for="i in arr" :v="i" :q=1></slot>
      </ul>
    `
  })

	new Vue({
		el: '#app',
		data: {
			arr: [1,2,3,4]
		}
	})
	
```

[toc]