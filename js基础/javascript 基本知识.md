#### =或|| `运算符`会导致this丢失
#### set特点：存储不重复的键值对
#### map特点：可以把对象作为key
#### set，map共同特性  
```js
//当key不可引用的时候会保留
var a = {a:1,b:2}
var currentMap = new Map()
currentMap.set(a, 123)
a = null
console.log(currentMap.size) //1

```
#### WeakMap 和 WeakSet  
* key只能是对象
* 当key不可引用的时候，那么存在于 WeakMap/WeakSet 的数据将会被自动清除。
* 不支持迭代器
   
#### 词法环境包括两部分  

在 JavaScript 中，每个运行的函数、代码块或整个程序，都有一个称为**词法环境（Lexical Environment）**的关联对象。  

* 环境记录---将局部变量作为其属性(包括一些额外属性，比如this)
* 外部词法环境引用---通常指嵌套当前作用域外的词法环境  

函数在『诞生』时都会根据创建它的词法环境获得隐藏的 `[[Environment]]` 属性
#### new操作
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

#### 基本类型和引用类型的区别
1. **基本类型(栈内存)** 
存储的值大小固定 
空间较小 
可以直接操作其保存的变量，运行效率高 
由系统自动分配存储空间   


2. **引用类型(堆内存)** 
存储的值大小不定，可动态调整 
空间较大，运行效率低 
无法直接操作其内部存储，使用引用地址读取 
通过代码进行分配空间 
```js
// 基本类型具有不变性
// 从始至终str的值没有变
var str = 'ConardLi';
str.slice(1);
str.substr(1);
str.trim(1);
str.toLowerCase(1);
str[0] = 1;
console.log(str);  // ConardLi
// 引用类型不具有可变性，以数组为例
// pop,push,shift,unshift都改变原始值
```


#### new Function()的词法作用域  

如果我们使用 new Function 创建函数，函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境。
```js
function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}

getFunc()(); // error：value 未定义

```

#### 箭头函数
1. 没有this
2. 没有arguments
3. 不能被new
4. 没有super
5. 适用于没有自己的“上下文”的短代码片段

#### 对象属性
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

  value: 2
});

```
#### 深拷贝
```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

```

#### mixin模式
```js
// mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

// 用法：
class User {
  constructor(name) {
    this.name = name;
  }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

// 现在 User 可以说　hi 了
new User("Dude").sayHi(); // Hello Dude!

```

#### Iterables（可迭代对象）
1. 可以应用`for...of...`的对象就是可迭代的
2. Iterables必须具备`Symbol.iterator`方法
3. 一个迭代器必须有 next() 方法，它返回一个 {done: Boolean, value: any}，这里 done:true 表明迭代结束，否则 value 就是下一个值。
4. Symbol.iterator 方法会被 for..of 自动调用，但我们也可以直接调用。
5. 内置的可迭代对象例如字符串和数组，都实现了 Symbol.iterator。
6. 字符串迭代器能够识别 UTF-16 扩展字符。
7. `...`内部就是自动调用了`Symbol.iterator`
8. 有索引属性和 length 属性的对象被称为类数组对象。这种对象也许也有其他属性和方法，但是没有数组的内建方法。可使用`Array.form`转为Iterables

```js
let range = {
  from: 1,
  to: 5
};

// 1. 使用 for..of 将会首先调用它：
range[Symbol.iterator] = function() {

  // 2. ...它返回一个迭代器：
  return {
    current: this.from,
    last: this.to,

    // 3. next() 将在 for..of 的每一轮循环迭代中被调用
    next() {
      // 4. 它将会返回 {done:.., value :...} 格式的对象
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// 现在它可以运行了！
for (let num of range) {
  alert(num); // 1, 然后 2, 3, 4, 5
}

```

#### generators执行过程
```js
function* gen() {
  let ask1 = yield '2 + 2?'
  console.log('ask1', ask1)
  let ask2 = yield '3 * 3?'
  console.log('ask2', ask2)
  return ask2
}

let generator = gen();

console.log(generator.next()) 
console.log(generator.next(2))
console.log(generator.next(4))

```
1. 执行gen，生成生成器
2. 第一次执行next() 
	* 计算右边，将右边的表达式值保存到value='2 + 2?'
	* 遇上yield，暂停等待调用
	* 返回{ value: '2 + 2?', done: false }
3. 第二次执行next()
	*  yield 接收 next() 传进来的参数 '2'
	* 从上一次yield恢复generator
	* 将参数赋值给ask1=2
	* 保存计算值value='3 * 3?',遇上yield等待
	* 返回 { value: '3 * 3?', done: false }
4. 第三次执行next()
	* yield 接收 next() 传进来的参数 '4'
	* 从上一次yield恢复generator
	* 将参数赋值给ask2=4
	* 遇上`ruturn`, 将ask2保存到value
	* 返回{ value: 4, done: true }
	
	
### 闭包
#### 形式
1. 一个函数的返回值是函数
2. 函数的行参作为实参给另一个函数调用

#### 意义
1. 延长了局部变量的声明周期
2. 函数外部可以访问局部变量

#### 生命周期
1. 闭包在外部函数执行完成时产生，而不是调用时
2. 闭包在外部函数成为垃圾对象时销毁`fn = null`

[toc]