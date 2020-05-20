<!-- @format -->

1. =或|| `运算符`会导致 this 丢失
2. set 特点：存储不重复的键值对
3. map 特点：可以把对象作为 key
4. set，map 共同特性

```js
//当key不可引用的时候会保留
var a = { a: 1, b: 2 }
var currentMap = new Map()
currentMap.set(a, 123)
a = null
console.log(currentMap.size) //1
```

## WeakMap 和 WeakSet

- key 只能是对象
- 当 key 不可引用的时候，那么存在于 WeakMap/WeakSet 的数据将会被自动清除。
- 不支持迭代器

## 执行上下文

### 1. 执行上下文

1. 每次在函数执行的时候，都会创建一个执行上下文，执行上下文是一个对象
2. 执行上下文里面会创建一个对象叫变量对象(Value Object)，里面保存着当前函数内的变量
3. 基本数据类型保存在上下文对象里，引用数据类型会单独在内存里开辟空间保存
4. 变量对象里保存的是堆里的内存地址

```js
function task(m, n) {
  var a = 1
  var b = {
    name: 'zf',
  }
  var c = [1, 2, 3]
}

task(10, 20)

// task的执行上下文
let taskExecutionContext = {
  this: window,
  // Variable Object: 变量对象，里面存的是当前函数执行时要使用的变量
  VO: {
    m: 10,
    n: 20,
    a: 1,
    b: `xo1`, // `xo1`,指的是b的内存地址，随意写的
    c: `xa1`,
  },
}
```

### 2. 执行上下文栈

`Call Stack` 为当前的调用栈

`Scope` 为当前正在被执行函数的作用域链

`Local` 为当前活动对象(AO)

1. 栈是一个数据, 里面存放这很多执行上下文
2. 每次函数执行，都会产生一个执行上下文
3. 全局上下文的 VO，也被称为 GO(Global Object)对象，在浏览器端 GO 就是 VO 就是 window
4. 栈底永远是全局上下文，栈顶为当前正在执行的上下文
5. 当开启一个函数执行时会生成一个新的执行上下文并放入调用栈，执行完毕后会自动出栈

```js
var globalExecutionContext = {
  VO: {
    setTimeout,
    Math,
    String,
    ...
  },
}
```

### 3. 执行上下文生命周期

> 生命周期有两个阶段

1. 创建阶段

- 创建变量对象
- 确定作用域链
- 确定 this 指向

2. 执行阶段

- 变量赋值
- 函数赋值
- 代码执行

> 变量对象

1. 变量对象会保存变量声明(var)、函数参数(arguments)、函数定义(function)

- 变量对象会`首先`获得`函数的参数变量和值`
- 获取所有用 `function` 进行的`函数声明`，函数名为变量对象的属性名，值为函数对象,如果属性已经存在，值会用新值`覆盖`
- 再依次所有的 `var` 关键字进行的变量声明，每找到一个变量声明，就会在变量对象上建一个属性，值为 `undefined`,如果变量名已经存在，则会`跳过`，并不会修改原属性值,`let` 声明的变量`并不会在此阶段进行处理`

2. 函数声明优先级更高，同名的函数会覆盖函数和变量，但同名 var 变量并不会覆盖函数.执行阶段重新赋值可以改变原有的值

```js
var a = 1
function fn(m) {
  console.log('fn')
}
function fn(m) {
  console.log('new_fn')
}
function a() {
  console.log('fn_a')
}
console.log(a)
fn(1)
var fn = 'var_fn'
console.log(fn)

/**编译阶段**/
function fn(m) {
  console.log('fn')
}
function fn(m) {
  console.log('new_fn')
}
function a() {
  console.log('fn_a')
}
var a = undefined
var fn = undefined
/**执行阶段**/
a = 1
console.log(a)
fn()
fn = 'var_fn'
console.log(fn)
```

> 激活对象

1. 在函数的调用栈中，如果当前执行上下文处于函数调用栈的顶端，则意味着当前上下文处于激活状态，此时变量对象称为活动对象(AO,Activation Object) VO=>AO
2. 活动变量包含变量对象所有的属性，并有包含 this 指针

## 作用域

> 在 JS 中，作用域是用来规定变量访问范围的规则

1. 作用域是在定义时确定的，跟在哪执行没关系
2. 执行上下文执行有两个阶段，第一个是`编译阶段`，第二个是`执行阶段`
3. `编译阶段`会对 var 变量声明和函数声明进行变量提升

- var 声明会`声明但不赋值`
- 函数声明会`声明并赋值`
- 将所有变量声明为一个`VO对象`

4. 在作用域中包含`VO对象`, `ScopeChain`保留着当前函数的作用域链

```js
function one() {
  var a = 1
  function two() {
    var b = 2
    function three() {
      var c = 3
      console.log(a, b, c)
    }
    // 在函数定义时，内部给该函数赋予了当前的作用域链，当该函数运行时，再加上改函数的作用域
    // three['[[Scopes]]'] = ['two的作用域'， ’one的作用域‘, 'global作用域']
    three()
  }
  two()
}
one()

// 1.创建全局上下文
var globalExecuteContextVO = { one: `()=>{var a = 1;}` }
var globalExecuteContext = {
  VO: globalExecuteContextVO,
  scopeChain: [globalExecuteContextVO],
}
var executeContextStack = [globalExecuteContext]
//2.执行one，创建one执行上下文
var oneExecuteContextVO = {
  a: 1,
  two: `()=>{var b = 2 ;}`,
}
var oneExecuteContext = {
  VO: oneExecuteContextVO,
  scopeChain: [oneExecuteContextVO, globalExecuteContext.VO],
}
//2.执行two，创建two执行上下文
var twoExecuteContextVO = {
  b: 2,
  three: `()=>{var c = 3 ;}`,
}
var twoExecuteContext = {
  VO: twoExecuteContextVO,
  scopeChain: [twoExecuteContextVO, oneExecuteContext.VO, globalExecuteContext.VO],
}
//3.执行three，创建three执行上下文
var threeExecuteContextVO = {
  c: 3,
}

var threeExecuteContext = {
  VO: threeExecuteContextVO,
  scopeChain: [threeExecuteContextVO, ...three['[[Scopes]]']],
  // scopeChain: [
  //   threeExecuteContextVO,
  //   twoExecuteContext.VO,
  //   oneExecuteContext.VO,
  //   globalExecuteContext.VO,
  // ],
}
function getValue(varName) {
  for (let i = 0; i < threeExecuteContext.scopeChain.length; i++) {
    if (varName in threeExecuteContext.scopeChain[i]) {
      return threeExecuteContext.scopeChain[i][varName]
    }
  }
}
//console.log(a, b, c);
console.log(getValue('a'), getValue('b'), getValue('c'))
```

## 闭包

> 形式

1. 闭包由两部分组成: 当前的执行上下文 A， 在当前执行上下文中创建的函数 B
2. 当 B 执行的时候引用了当前执行上下文 A 中的变量就形成了闭包

> 意义

1. 延长了局部变量的声明周期
2. 函数外部可以访问局部变量

> 生命周期

1. 闭包在外部函数`执行完成时`产生，而不是调用时
2. 闭包在外部函数成为垃圾对象时销毁`fn = null`

## var&let&const

1. ES6 新增块级作用域`{}`, 允许块级作用域嵌套
2. var 可以跨块访问(`if`/`for`),不能跨函数访问,有变量提升,可重复声明
3. let 只能在块作用域里访问，不能跨块访问，也不能跨函数访问，无变量提升，不可以重复声明(编译阶段会报错)
4. let 声明的变量`绑定`在暂时性死区, 在声明之前不能使用该变量，这特性叫暂时性死区(temporal dead zone)

## 词法环境包括两部分

在 JavaScript 中，每个运行的函数、代码块或整个程序，都有一个称为**词法环境（Lexical Environment）**的关联对象。

- 环境记录---将局部变量作为其属性(包括一些额外属性，比如 this)
- 外部词法环境引用---通常指嵌套当前作用域外的词法环境

函数在『诞生』时都会根据创建它的词法环境获得隐藏的 `[[Environment]]` 属性

## new 操作

```js
当一个new操作时，通常执行如下动作
1. 一个新的空对象被创建并分配给 this。
2. 函数体执行。通常它会修改 this，为其添加新的属性。
3. 返回 this 的值。

function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}

```

```js
// 基本类型具有不变性
// 从始至终str的值没有变
var str = 'ConardLi'
str.slice(1)
str.substr(1)
str.trim(1)
str.toLowerCase(1)
str[0] = 1
console.log(str) // ConardLi
// 引用类型不具有可变性，以数组为例
// pop,push,shift,unshift都改变原始值
```

## new Function()的词法作用域

如果我们使用 new Function 创建函数，函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境。

```js
function getFunc() {
  let value = 'test'

  let func = new Function('alert(value)')

  return func
}

getFunc()() // error：value 未定义
```

## 箭头函数

1. 没有 this
2. 没有 arguments
3. 不能被 new
4. 没有 super
5. 适用于没有自己的“上下文”的短代码片段

## 对象属性

```js
/**
数据属性
1. value
2. writable
3. enumerable
4. configurable
*/

/**
访问器属性
1. get
2. set
3. enumerable
4. configurable
*/

// 两者不可同时存在
// Error: Invalid property descriptor.
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2,
})
```

## 简单深拷贝

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))
```

## mixin 模式

```js
// mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`)
  },
  sayBye() {
    alert(`Bye ${this.name}`)
  },
}

// 用法：
class User {
  constructor(name) {
    this.name = name
  }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin)

// 现在 User 可以说　hi 了
new User('Dude').sayHi() // Hello Dude!
```

## Iterables（可迭代对象）

1. 可以应用`for...of...`的对象就是可迭代的
2. Iterables 必须具备`Symbol.iterator`方法
3. 一个迭代器必须有 next() 方法，它返回一个 {done: Boolean, value: any}，这里 done:true 表明迭代结束，否则 value 就是下一个值。
4. Symbol.iterator 方法会被 for..of 自动调用，但我们也可以直接调用。
5. 内置的可迭代对象例如字符串和数组，都实现了 Symbol.iterator。
6. 字符串迭代器能够识别 UTF-16 扩展字符。
7. `...`内部就是自动调用了`Symbol.iterator`
8. 有索引属性和 length 属性的对象被称为类数组对象。这种对象也许也有其他属性和方法，但是没有数组的内建方法。可使用`Array.form`转为 Iterables

```js
let range = {
  from: 1,
  to: 5,
}

// 1. 使用 for..of 将会首先调用它：
range[Symbol.iterator] = function () {
  // 2. ...它返回一个迭代器：
  return {
    current: this.from,
    last: this.to,

    // 3. next() 将在 for..of 的每一轮循环迭代中被调用
    next() {
      // 4. 它将会返回 {done:.., value :...} 格式的对象
      if (this.current <= this.last) {
        return { done: false, value: this.current++ }
      } else {
        return { done: true }
      }
    },
  }
}

// 现在它可以运行了！
for (let num of range) {
  alert(num) // 1, 然后 2, 3, 4, 5
}
```

## generators 执行过程

```js
function* gen() {
  let ask1 = yield '2 + 2?'
  console.log('ask1', ask1)
  let ask2 = yield '3 * 3?'
  console.log('ask2', ask2)
  return ask2
}

let generator = gen()

console.log(generator.next())
console.log(generator.next(2))
console.log(generator.next(4))
```

1. 执行 gen，生成生成器
2. 第一次执行 next()

- 计算右边，将右边的表达式值保存到 value='2 + 2?'
- 遇上 yield，暂停等待调用
- 返回{ value: '2 + 2?', done: false }

3. 第二次执行 next()

- yield 接收 next() 传进来的参数 '2'
- 从上一次 yield 恢复 generator
- 将参数赋值给 ask1=2
- 保存计算值 value='3 \* 3?',遇上 yield 等待
- 返回 { value: '3 \* 3?', done: false }

4. 第三次执行 next()

- yield 接收 next() 传进来的参数 '4'
- 从上一次 yield 恢复 generator
- 将参数赋值给 ask2=4
- 遇上`ruturn`, 将 ask2 保存到 value
- 返回{ value: 4, done: true }
