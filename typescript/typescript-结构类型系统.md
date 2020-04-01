- 如果传入的变量和声明的类型不匹配，ts 就会进行兼容性检查
- 原理是`Duck-Check`: 
- 如果B具有与A一样的属性, 那么类型B兼容类型A  


**B(目标类型) = A(源类型)**


## 1. 基本类型的兼容性

```js
//基本数据类型也有兼容性判断
let num: string | number
let str: string = 'zhufeng'
num = str

//只要有toString()方法就可以赋给字符串变量
let num2: {
  toString(): string
}

let str2: string = 'jiagour'
num2 = str2

```

## 2. 接口的兼容性

**成员少的兼容成员多的**  

```js
interface X {
  a: any
  b: any
}
interface Y {
  a: any
  b: any
  c: any
}

let x: X = { a: 1, b: 2 }
let y: Y = { a: 1, b: 2, c: 3 }
x = y  // 源类型具备目标类型的全部属性，兼容
y = x //  源类型不具备目标类型的全部属性，不兼容


```

## 3. 类的兼容性

**在 ts 中是结构类型系统，只会对比结构而不在意类型**  


1. 具有相同成员的两个类是兼容的
2. 类兼容只比较实例成员，静态成员和构造函数不参与  


```js
class Foo {
  constructor(a: number) {}
  id: number = 1
}

class Bar {
  static s1: string = ''
  constructor(a: number, b: number) {}
  id: number = 2
}

let foo = new Foo(1)
let bar = new Bar(1, 2)

foo = bar // 兼容
bar = foo // 兼容

```  


1. 如果两个类中具有相同的私有属性, 那么两个类`互不兼容`
2. 如果`目标类`没有私有属性, `源类`有私有属性, 那么是兼容的, 反之则不兼容;
3. 有私有属性的父类, 子类与其`相互兼容`  


```js
class Foo {
  constructor(a: number) {}
  id: number = 1
  private name:string = ''
}

class Bar {
  static s1: string = ''
  constructor(a: number, b: number) {}
  id: number = 2
}

let foo = new Foo(1)
let bar = new Bar(1, 2)

bar = foo  // 兼容
foo = bar  // 不兼容

```

## 4. 函数的兼容性

**先比较参数,在比较返回值**  


### 参数个数
**目标函数的参数个数 `>` 源函数的参数个数**

```js
type Handler = (a: number, b: number) => void

function test(handler: Handler) {
  return handler
}

let handler1 = (a: number) => { }
test(handler1) // 目标函数参数比源函数参数多1个, 是兼容的
let handler2 = (a: number, b: number, c: number) => { }
test(handler2) // 目标函数参数比源函数参数少1个, 是不兼容的

```
### 可选参数和剩余参数
不兼容时可以通过设置`"strictFunctionTypes": true`实现兼容  

```js
let a1 = (p1: number, p2: number) => { }
let b1 = (p1?: number, p2?: number) => { }
let c1 = (...args: number[]) => { }

```  

固定参数是可以兼容可选参数和剩余参数的  
```js
a1 = b1 // 兼容
a1 = c1 // 兼容

```

可选参数是不兼容固定参数和剩余参数的  
```js
b1 = a1 //不兼容
b1 = c1 // 不兼容

```  

剩余参数可以兼容固定参数和可选参数
```js
c1 = a1 // 兼容
c1 = b1 // 兼容

```

### 参数的类型
不兼容时可以通过设置`"strictFunctionTypes": true`实现兼容  

* **基础类型**: 类型相同
* **接口类型**: 成员多的兼容成员少的

### 返回值的类型
目标函数的返回值类型必须与源函数的返回值类型相同，或者是其子类型


## 5. 枚举类型兼容性
* 枚举与数字类型之间相互兼容
* 不同枚举类型之间不兼容
```js
enum Fruit { Apple, Banana }
enum Color { Red, Yello }

let fruit: Fruit.Apple = 4   // 兼容
let no: number = Fruit.Apple // 兼容

let color: Color.Red = Fruit.Apple // 不兼容

```

## 6. 泛型兼容
### 泛型接口

泛型接口为空时，泛型指定不同的类型，也是兼容的  

```js
let obj1: Empty<number> = {}
let obj2: Empty<string> = {}
// 兼容
obj1 = obj2
obj2 = obj1

```  


如果泛型接口中有一个接口成员时，类型不同就不兼容  

```js
interface Empty<T> {
  value: T
}

let obj1:Empty<number> = {}
let obj2:Empty<string> = {}
// 报错，都不兼容
obj1 = obj2
obj2 = obj1

```

### 范型函数
定义相同的两个泛型函数,如果未指定具体类型,则可相互兼容
```js
let log1 = <T>(x: T): T => {
  return x
}
let log2 = <U>(y: U): U => {
  return y
}
log1 = log2
log2 = log1

```

## 7. 兼容性总结
* 结构之间兼容：成员少的兼容成员多的
* 函数之间兼容：参数多的兼容参数少的


[toc]
