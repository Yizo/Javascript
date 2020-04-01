## 观察数据变化
重写数组的方法
```js
// 重写数组的方法
let oldProtoMehtods = Array.prototype
let proto = Object.create(oldProtoMehtods)
['push', 'pop', 'shift', 'unshift'].forEach(method => {
  proto[method] = function() {
    notify()
    oldProtoMehtods[method].call(this, ...arguments)
  }
})


```
准备一个发布者
```js
function observer(obj) {
  if (Array.isArray(obj)) {
    obj.__proto__ = proto
    return
  }
  if (typeof obj === 'object') {
    for (let key in obj) {
      defineReactive(obj, key, obj[key])
    }
  }
}

```
准备一个观察者
```js
function defineReactive(obj, key, value) {
  observer(value) // 再一次循环value
  Object.defineProperty(obj, key, {
    // 不支持数组
    get() {
      return value
    },
    set(val) {
      notify()
      observer(val)
      value = val
    }
  })
}


```

准备一个订阅者
```js
function notify(){
    console.log('视图更新')
}

```

使用
```js
let data = {
    name:'jw',
    age:18,
    arr:[]
}
observer(data)
data.arr.push(1)

```

## 使用proxy实现响应式变化
```js
let obj = {
  name: { name: 'jw' },
  arr: ['吃', '喝', '玩']
}
let handler = {
  get(target, key, receiver) {
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    if (key === 'length') return true
    console.log('update')
    return Reflect.set(target, key, value, receiver)
  }
}
let proxy = new Proxy(obj, handler)
proxy.name.name = 'zf'

```

[toc]