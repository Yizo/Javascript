`inheritAttrs: false` 
自定义组件: 不在dom上显示传递的属性  

`this.$attrs` 
所有父组件**没有用到**的属性  

`@click.native="show"` 
**.native**相当与给组件模版最外层添加事件，而不是作为属性传递  

`validator(value){return value.length === 6}` 
props中的自定义校验器  

`functional: true` 
表示是一个函数式组件  
```js
export default{
  functional: true,
  render(h, context){
    let t = 'h' + context.props.type
    return <t>{context.slots().default}</t>
  }
}

```  

`v-model语法糖`
```js
<template>
<input value="value" @input="(val)=>value=val"/>
// v-model是上面的语法糖形式
<input v-model="value" />
</template>

```



