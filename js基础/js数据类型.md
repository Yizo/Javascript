<!-- @format -->

## 1. 概述

最新的 ECMAScript 标准定义了 7 种数据类型:

- number
- string
- boolean
- null
- undefined
- object
- Symbol

## 2. 数据类型

其中`number,string,boolean,null,undefined,Symbol`，被称为基本数据类型

> **基本类型(栈内存)**

1. 存储的值大小固定
2. 空间较小
3. 可以直接操作其保存的变量，运行效率高
4. 由系统自动分配存储空间

> **引用类型(堆内存)**

1. 存储的值大小不定，可动态调整
2. 空间较大，运行效率低
3. 无法直接操作其内部存储，使用引用地址读取
4. 通过代码进行分配空间

## 3. null 和 undefined

- JavaScript 中的 null 不是一个“对不存在对象的引用”或者“null 指针”。  
   仅仅是一个含义为“无”、“空”或“值未知”的特殊值。转为数值时为 0;
- undefined 的含义是 未被赋值.  
   如果变量被声明，而未被赋值，那么它的值就是 undefined：转为数值时为 NaN

## 4. 类型检测

类型检测有 typeof,instanceof,Object.prototype.toString()这几种，但是推荐用第三种方式

### typeof 原理

javascript 在底层中存储数据，会在变量的机器码的低位 1-3 位存储其类型信息  
   `000`:对象
   `010`：浮点数
   `100`：字符串
   `110`：布尔
   `1`：整数

但对于`undefined`和`null`来说，这两个有点特殊

`0`:null
   `-2^30`: undefined

所以 typeof 在判断 null 的时候就会出问题，由于 null 的机器码为 0，所以直接被当做对象来看待
typeof 最好只做判断基本数据类型(包括 symbol)

### instanceof 原理

我们经常提到 instanceof 判断对象的具体类型，其实就是判断一个对象是否属于某个对象的实例

```js
//假设instanceof运算符左边是L，右边是R
L instanceof R //instanceof运算时，通过判断L的原型链上是否存在R.prototype
L.__proto__.__proto__ ..... === R.prototype ？ //如果存在返回true 否则返回false

```

instanceof 运算时会递归查找 L 的原型链,  
即 L.**proto**.**proto**.**proto**.**proto**... 直到找到了或者找到顶层为止。
所以一句话理解 instanceof 的运算规则为：  
instanceof 检测左侧的 **proto** 原型链上，是否存在右侧的 prototype 原型。

```js
function new_instance_of(leftVaule, rightVaule) {
  let rightProto = rightVaule.prototype // 取右表达式的 prototype 值
  leftVaule = leftVaule.__proto__ // 取左表达式的__proto__值
  while (true) {
    if (leftVaule === null) {
      return false
    }
    if (leftVaule === rightProto) {
      return true
    }
    leftVaule = leftVaule.__proto__
  }
}
```

更多关于原型于原型链的问题，请看我的这篇[文章](https://yihzo.com/archives/77)

### toString 原理

Object.prototype.toString 的原理是当调用的时候, 就取值内部的 [[Class]] 属性值, 然后拼接成 '[object ' + [[Class]] + ']'   这样的字符串并返回. 然后我们使用 call 方法来获取任何值的数据类型.

#### [[Class]]

`[[Class]]`是一个内部属性，值为一个类型字符串，可以用来判断值的类型。  
有这么一段详细的解释:

> 本规范的每种内置对象都定义了 [[Class]] 内部属性的值。宿主对象的 [[Class]] 内部属性的值可以是除了 "Arguments", "Array", "Boolean", "Date", "Error", "Function", "JSON", "Math", "Number", "Object", "RegExp", "String" 的任何字符串。[[Class]] 内部属性的值用于内部区分对象的种类。注，本规范中除了通过 Object.prototype.toString ( 见 15.2.4.2) 没有提供任何手段使程序访问此值。

```javascript
function foo(){};

Object.prototype.toString.call(1);  '[object Number]'
Object.prototype.toString.call('1'); '[object String]'
Object.prototype.toString.call(NaN); '[object Number]'
Object.prototype.toString.call(foo);  '[object Function]'
Object.prototype.toString.call([1,2,3]); '[object Array]'
Object.prototype.toString.call(undefined); '[object Undefined]'
Object.prototype.toString.call(null); '[object Null]'
Object.prototype.toString.call(true); '[object Boolean]'
....
```

## 5. 传递参数

在 EMCscript 所有的参数都是按值传参,并且为局部变量如果存在按引用传递的话，那么函数里的那个变量将会是全局变量,在 EMCscript 不存在

## 6. 基本包装类型

为了便于操作基本类型值，ECMAScript 提供了 3 个特殊的引用类型：Boolean、Number 和 String。  
这些类型与其他引用类型相似，但同时也具有与各自的基本类型相应的特殊行为。实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而能够调用一些方法来操作这些数据。

## 7. number 常用方法

**isFinite()**
要想确定一个数值到底是否超过了规定范围，可以使用 isFinite()函数。如果没有超过，返回 true，超过了返 false。NaN 即非数值(Nota Number)是一个特殊的值，这个数值用于表示一个本来要返回数值的操作数未返回数值的情况 isNaN()函数，用来判断这个值到底是不是 NaN,也适用于对象 Number()可以将任何数据类型转换为数值,不是这三种类型返回 NaNparseInt()将字符串转换为数字类型 parseFloat()将字符串转换为浮点型

## 8. string 常用方法

**toString** 转换为字符串  
**String** 能将任何类型的值转换为字符串  
**charAt**   根据索引得到对应位置上的字符            
**charCodeAt** 返回指定字符的 Unicode 编码            
**formCharCode** 从 Unicode 字符串中返回字符串            
**slice** 返回从起始位置到结束位置的子字符串            
**concat**   链接字符串，相当于+           
**indexof**  得到指定的字符第一次出现的位置            
**lastIndexof** 返回字符串最后出现的位置            
**match** 字符串的检索，或正则表达式的匹配            
**replace** 字符串替换            
**seach** 返回与正则表达式匹配的第一个字符串出现的位置            
**split** 分隔字符按照指定的方式分隔为字符串数组            
**substr**  从指定位置开始，返回指定长度的字符串            
**substring** 从指定位置开始，到指定位置结束。不包含结束.       
**toUppercase** 字符串转换为大写            
**toLowercase** 字符串转换为小写
