## 1 编译原理
源代码在执行之前将经历三个步骤:
### 1.1 分词/词法分析
将代码块分解为词法单元。 例如: var a = 2; 被分解为: 

* var
* a
* =
* 2
* ;

### 1.2 解析/语法分析
将词法单元流(数组)转换为一个由元素逐级嵌套所组成的代表了程序语法结构的树(AST)。

### 1.3 代码生成
将AST转换为可执行代码的过程被称为代码生成。 
抛开具体细节，简单来说就是有某种方法可以将var a = 2;的ast转化为一组机器指令，用来创建一个叫做a的变量(包括内存分配等),并将一个值存储在a中。

## 2 编译角色
| 角色  | 功能  |
| :------------: | ------------ |
| 引擎  | 从头到尾负责整个javascript程序的编译及执行过程  |
| 编译器  | 负责语法分析及代码生成  |
| 作用域  |  收集并维护所有的标识符(变量)组成的一系列查询, 按照严格的规则，确定当前执行的代码对这些标识符的访问权限 |

### 2.1 对话
我们来看看 `var a = 2;` 的编译过程 

1. 遇到 var a ，编译器会询问作用域是否已经有一个该名称的变量存在于同一个作用域的 集合中。如果是，编译器会忽略该声明，继续进行编译；否则它会要求作用域在当前作 用域的集合中声明一个新的变量，并命名为 a 。 

2. 接下来编译器会为引擎生成运行时所需的代码，这些代码被用来处理 a = 2 这个赋值 操作。 引擎运行时会首先询问作用域， 在当前的作用域集合中是否存在一个叫作 a 的 变量。 如果是， 引擎就会使用这个变量；如果否， 引擎会继续查找该变量。如果引擎最终找到了 a 变量， 就会将 2 赋值给它。 否则引擎就会举手示意并抛出一个异 常！

## 3 作用域查询
* 作用域查询分为LHS和RHS
* LHS: 赋值操作的目标(赋值)
* RHS：赋值操作的源头(查询变量)

## 4 变量提升
函数优先的变量提升
```js
foo(); // 1

var foo; 

function foo() { console.log( 1 ); }

foo = function () { console.log( 2 ); };

```

编译过程其实是这样的 

```js
function foo() { console.log( 1 ); }

foo(); // 1

foo = function () { console.log( 2 ); };

```
尽管`var foo`出现在`function foo(){...}`之前, 但它是重复声明的,
因为函数声明被提升到了普通变量之前, 所以它会被忽略。

## 5 闭包的应用
闭包的一个应用在模块化
```js
var MyModules = (function Manager() {
  var modules = {}

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]]
    }
    modules[name] = impl.apply(impl, deps)
  }

  function get(name) {
    return modules[name]
  }

  return { define: define, get: get }
})()

```

## 6 this
### 6.1 this指向
```js
function foo(num) {
  console.log('foo: ' + num)

  // 记录 foo 被调用的次数
  this.count++
}

foo.count = 0

var i

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i)
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// foo 被调用了多少次？
console.log(foo.count) // 0 -- WTF?

```
1. 根据打印, foo的确执行了。
2. `foo.count = 0`此时为foo添加了一个属性
2. `foo(i)`执行时，this的指向为window
3. foo函数内部`this.count++`此时相当于创建了一个全局变量`count`值为NaN

### 6.2 this是什么
this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调 用时的各种条件。 
当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包 含函数在哪里被调用（调用栈）、函数的调用 方法 、传入的参数等信息。 this 就是记录的 其中一个属性，会在函数执行的过程中用到。

## 7 绑定规则
### 7.1 默认绑定
只有在非严格模式下，this才会默认绑定到全局对象  
在严格模式模式下，this绑定到undefined
```js
function foo() {
  console.log(this.a)
}
var a = 2
foo() // 2

```

### 7.2 隐式绑定
```
function foo() {
  console.log(this.a)
}

var obj = { a: 2, foo: foo }

obj.foo() // 2

``` 

**隐式丢失**  

一个最常见的 this 绑定问题就是被 隐式绑定 的函数会丢失绑定对象，也就是说它会应用 默认绑定 ，从而把 this绑定到全局对象或者undefined上，取决于是否是严格模式。  

```js
function foo() {
  console.log(this.a)
}

var obj = { a: 2, foo: foo }

var bar = obj.foo // 函数别名！ var a = "oops, global"; // a 是全局对象的属性
// 虽然 bar 是 obj.foo 的一个引用， 但是实际上， 它引用的是 foo 函数本身， 因此此时的 bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。
bar() // "oops, global"

```  

一个更常见的情况是发生在回调函数中  

```js
function foo() {
  console.log(this.a)
}

function doFoo(fn) {
  // fn 其实引用的是 foo

  fn() // <-- 调用位置！
}

var obj = { a: 2, foo: foo }

var a = 'oops, global' // a 是全局对象的属性 doFoo( obj.foo ); // "oops, global"

```

### 7.3 显示绑定
硬绑定的典型应用场景就是创建一个包裹函数，传入所有的参数并返回接收到的所有值
```js
function foo(something) {
  console.log(this.a, something)
  return this.a + something
}

var obj = { a: 2 }

var bar = function() {
  return foo.apply(obj, arguments)
}

var b = bar(3) // 2 3

console.log(b) // 5

```

### 7.3 new绑定
实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”  
使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。 
1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 [[ 原型 ]] 连接。
3. 这个新对象会绑定到函数调用的 this 。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。 

```js
function foo(a) {
  this.a = a
}

var bar = new foo(2)
console.log(bar.a) // 2
// 使用new new来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..)调用中的this上。 是最后一种可以影响函数调用时 this 绑定行为的方法，我们称之为 new 绑定。

```

### 7.4 优先级
new绑定 > 显示绑定 > 隐式绑定 > 默认绑定

## 8. 总结
如果要判断一个运行中函数的 this 绑定，就需要找到这个函数的直接调用位置。找到之后 就可以顺序应用下面这四条规则来判断 this 的绑定对象。  
1. 由 new 调用？绑定到新创建的对象。
2. 由 call 或者 apply （或者 bind ）调用？绑定到指定的对象。
3. 由上下文对象调用？绑定到那个上下文对象。
4. 默认：在严格模式下绑定到 undefined ，否则绑定到全局对象。  
一定要注意，有些调用可能在无意中使用默认绑定规则。如果想“更安全”地忽略 this 绑 定，你可以使用一个 DMZ 对象，比如 ø = Object.create(null) ，以保护全局对象。  
ES6中的箭头函数并不会使用四条标准的绑定规则， 而是根据当前的词法作用域来决定 this ，具体来说，箭头函数会继承外层函数调用的 this 绑定（无论 this 绑定到什么）。这 其实和 ES6 之前代码中的 self = this 机制一样。
[toc]