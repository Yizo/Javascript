## 1. 父子组件的解释
父子组件是一种`相对`而言, 如果**A组件中包含B组件**,那么A就是父组件，B就是子组件
```html
<div>
	<A>
		<B></B>
	</A>
</div>
```
**如果是自定义组件**

```js
// 定义A组件
Vue.component('A', {
  template: `
    <div>
      <p>this is parent component!</p>
    </div>
  `,
})

// 在其他组件中使用
<div>
	<A></A>
</div>
```
此时: A为`父组件`，定义时的原始html为`子组件`
## 2. 组件通信
### 2.1 props
单向数据流: 父组件流向子组件，子组件使用props接受数据
### 2.2 $on/$emit
子组件触发父组件方法,通过回调的方式将修改的内容传递给父组件
- 父组件: $on绑定一个自定义方法
- 子组件：$emit通知父组件上的自定义方法，并传递参数
### 2.3 自定义的v-model
* 自定义v-model：能通过子组件改变父组件属性
* 当父组件绑定`v-model`，子组件会默认在**props**中有一个`value`属性，产生一个`input`事件
```js
// 父组件
<Son1 v-model="mny"></Son1>
// 子组件
<template>
 <div>
  子组件1: {{value}} // 触发的事件只能是input
  <button @click="$emit('input',200)">更改</button>
 </div>
</template>
<script>
export default {
 props: {
  value: { 
   // 接收到的属性名只能叫value
   type: Number
  }
 }
};
</script>
```  

但是在**表单**等输入框中会产生冲突，[model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model) 选项可以用来避免这样的冲突 

### 2.4 .sync
* 作用与自定义v-model相同
* 不同的是.sync能接受任意属性,v-model只能接受value
* .sync接受一个update事件

```js
<Son1 :mny.sync="mny"></Son1>
<!-- 触发的事件名 update:(绑定.sync属性的名字) -->
<button @click="$emit('update:mny',200)">更改</button>
```


### 2.5 多层级传递数据
```js
// 触发父级的input事件
<button @click="this.$parent.$emit('input', 100)"/>
// 向上通知所有父级
Vue.prototype.$dispatch = function(eventName, value){
	let parent = this.$parent
	while(parent){
		parent.$emit(eventName, value)
		parent = parent.$parent
	}
}
<button @click="this.$dispatch('input', 100)"/>
// 向下广播所有子级
Vue.prototype.$broadcast = function(eventName, value){
	const broadcast = (children) =>{
		children.forEach(child=>{
			child.$emid(eventName, value)
			if(child.$children){
				broadcast(child.$children)
			}
		})		
	}
	broadcast(this.$children)
}

```
### 2.6 $attrs/$listeners
`$attrs`: 批量向下传入属性  
`$listeners`: 批量向下传入方法

### 2.7 provide/inject
`provide`：父组件提供公共数据 
`inject`：子组件消费公共数据  

```js
//父组件
export default{
	provide(){
		return{
			parent: this
		}
	}
	....
}
//子组件
<template>
	{{this.parent}}
<template>

export default{
	inject: [ 
		'parent'
	]
	....
}

```

### 2.8 Ref
获取组件实例
```js
<Grandson2 v-bind="$attrs" v-on="$listeners" ref="grand2"></Grandson2>
mounted() { // 获取组件定义的属性
  console.log(this.$refs.grand2.name);
}
```

### 2.9 EventBus

### 2.10 vuex

[toc]