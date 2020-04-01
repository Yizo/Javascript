## 基本的格式化
### 缩进层级
使用制表符缩进 
使用空格缩进

### 语句结尾
依赖于分析器的自动分号插入(ASI)机制，javascript代码省略分号是可以正常工作的  

是否省略还是看团队规范

### 行的长度
倾向于将行才控制在80个字符内

### 换行
在换行时通常在运算符后换行，下一行会增加两个层级的缩进 
变量赋值时，第二行的位置应当和`赋值运算符`的位置保持对齐

### 空行
不同语义代码之间使用空行隔离
* 在方法之间
* 在方法中的局部变量和第一条语义之间
* 在多行或单行注释之前
* 在方法内的逻辑片段之间插入空行

### 命名
驼峰式命名(大驼峰，小驼峰)  

**变量和函数**  
* 通常命名应该尽量段，并抓住重点，尽量在变量名中体现值的数据类型
* 避免没有意义的命名
* 变量名应当遵循小驼峰命名，并且**前缀**是`名词`
* 对于函数命名和方法命名来说，第一个单词应该是动词
| 动词  | 含义  |
| :------------: | :------------ |
| can  | 函数返回一个布尔值  |
| has  | 函数返回一个布尔值  |
| is | 函数返回一个布尔值  |
| get  | 函数返回一个非布尔值  |
| set  | 函数用来保存一个值  |
| ...  | ...  |


### 常量
使用大写字母和下划线来命名，下划线用以分隔单词

### 构造函数
构造函数遵循大驼峰命名法

### 直接量
javascript中包含一些类型的原始值: 字符串，数字，布尔值，null和nudefined。同样也包含对象直接量和数组直接量。这其中，只有布尔值是自解释(self-explanatory)的，其他类型或多或少都需要思考一下它们如何才能更精确的表示出来。
#### 字符串
```js
// 合法的javascript代码
var name = "Nicholas says, \"Hi.\""
// 也是合法的javascript代码
var name = 'Nicholas says, \"Hi.\"'

```  

* 使用单引号和双引号并无不同
* 使用双引号括起来的字符串里需要对双引号转义
* 使用单引号括起来的字符串里不需要对双引号转义

#### 数字
不要忽略小数点之前后之后的数字

#### null
**一下场景中应当使用null**
* 用来初始化一个变量，这个变量可以是一个对象
* 用来和一个已经初始化的变量比较，这个变量可以是也可以不是一个对象
* 当函数的参数期望是对象时，用作参数传入
* 当函数的返回值期望是对象时，用作返回值传出  

**以下场景不应当使用null**
* 不要使用null来检测是否传入来某个值
* 不要使用null来检测一个未初始化的值  

**理解null是对象的占位符**
```js
// 好的用法
var person = null;

// 好的用法
function getPerson() {
	if (condition) {
		return new Person("nicholas");
	} else {
		return null;
	}
}

// 好的用法
var person = getPerson();
if (person !== null) {
	doSomething();
}

// 不好的写法: 用来和初始化的变量比较
var person;
if (person !== null) {
	doSomething();
}

// 不好的写法： 检测是否传入来参数
function doSomething(arg1, arg2, arg3, arg4) {
	if (arg4 != null) {
		doSomethingElse();
	}
}

```

#### undefined
变量声明中禁止使用undefined

#### 对象直接量
创建对象推荐使用对象直接量, 更高效
```js
// 好的写法
var book = {
	title: 'maintainable javascript',
	author: 'nicholas c. zakas'
}
// 不好的写法
var book = new Object()
book.title = 'maintainable javascript'
book.author = 'nicholas c. zakas'

```

#### 数组直接量
不赞成使用new Array， 使用数组直接量[]

## 注释
### 单行注释
```js
// 好的写法
if (condition) {

	//如果代码执行到这里，则表明通过了所有安全性检查
	allowed0()
}

// 不好的写法：注释之前没有空行
if (condition) {
	//如果代码执行到这里，则表明通过了所有安全性检查
	allowed()
}

// 不好的写法：错误的缩进
if (condition) {

// 如果代码执行到这里，则表明通过了所有安全性检查
	allowed()
}

// 好的写法
var result = something + somethingE1se // somethingEIse不应当取值为null

// 不好的写法：代码和注释之间没有间隔
var result = something + somethingE1se// somethingEIse不应当取值为null

// 好的写法
// if (condition) {
//	doSomething()
//	thenDoSomethingEIse()
// }

// 不好的写法：这里应当用多行注释
// 接下来的这段代码非常难，那么，让我详细解释一下
// 这段代码的作用是首先判断条件是否为真
// 只有为真时才会执行，这里的条件是通过
// 多个函数计算出来的，在整个会话生命周期内
// 这个值是可以被修改的
if (condition) {
	//如果代码执行到这里，则表明通过了所有安全性检查
	allowed0()
}

```

### 多行注释
推荐的注释格式
```js
/**
 * 
 * 一段注释
 * 包含注释的文本
*/

```

### 使用注释
* 当代码不够清晰时添加注释
* 当代码很明了时不应该添加注释

难以理解的代码
可能被他人认为错误的代码
浏览器hack

### 文档注释
从技术角度讲，文档注释不是javascript的组成部分，但它们是一种普遍的实践。  
强烈推荐使用文档生成工具为javascript生成文档

## 语句表达式
所有的语句块都应当使用花括号
- if
- for
- while
- do...while...
- try...catch...finally 


### 花括号的对齐方式
```js
// 推荐
if (condition) {
	doSomething()
} else {
	doSomethingElse()
}
// 不推荐
if (condition)
{
	doSomething()
}
else
{
	doSomethingElse()
}

```

### 块语句间隔
```js
// 不推荐
if(condition){
	doSomething()
}

// 推荐
if (condition) {
	doSomething()
}

// 不推荐
if ( condition ) {
	doSomething()
}
```

## switch语句
* switch与case之间可缩进，也可不缩进
* case语句是否加break,看个人风格与实际场景决定
* 没有默认行为时，可以不加default

## with语句
with语句可以更改包含的上下文解析变量的方式。通过with可以用局部变量和函数的形式来访问特定对象的属性和方法，这样就可以将对象前缀统统省略掉。
```js
var book = {
	title: 'maintainable javascript',
	author: 'nicholas c.zakas'
}

var message = 'the book is'

while (book) {
	message += title
	message += ' by ' + author
}

```  

基于以下原因，推荐避免使用while语句
- 难以分辨title和author出现在哪个位置
- 难以分辨message到底是局部变量还是book的一个属性
- javascript引擎无法对这段代码进行优化
- 严格模式中，while是被明确禁止

## for循环
推荐for循环中不实用continue，可以用条件语句代替

## for-in循环
* for-in循环是用来遍历对象的，不要用来遍历数组
* 由于for-in会遍历原型上的属性，最好hasOwnProperty()方法来过滤循环结果

## 变量声明
* 将所有变量声明放在函数顶部，而不是散落在各个角落
* 建议将var语句合并为一个语句，每个变量的初始值独占一行，赋值运算符应当对齐。对于那些没有初始值的变量来说，它们应该出现在var语句的尾部
```js
function doSomethingWithItems(items) {
	
	var value = 10,
		result = value + 10,
		i,
		len;
	
	for (i=0, len=items.length; i < len; i++) {
		doSomething(items[i])
	}
}

```

## 函数声明
* 函数声明应该放在函数调用之前
* 函数声明不应当出现在语句块内(例如：if内)

## 函数调用间隔
推荐在函数名和左括号之间没有空格

## 立即调用函数
```js
// 不推荐
// 会让阅读产生歧义
var doSomething = function() {
	return {
		message: 'hi'
	}
}()

// 推荐写法
var doSomething = (function() {
	return {
		message: 'hi'
	}
}())
```

## 严格模式
* 不要在全局模式下以严格模式来执行。一旦一个文件以严格模式执行，那么在合并时全部文件都会以严格模式执行
* 可以在局部以严格模式执行

## 相等
推荐总是使用===和!==

## eval()
在javascript中，eval(), new Function(), setTimeout(), setInterval()都可以将字符串当作代码来执行。 

严禁使用它们。然而没有别的办法时，推荐在严格模式下使用eval()  
注: 严格模式下，传入eval()的字符串无法调用函数所在上下文声明变量或函数，非严格模式下可以。

## 原始包装类型
```js
// 原始包装类型
var name = 'nicholas'
console.log(name.toUpperCase())

// 执行结束后，临时string对象已经被销毁
name.author = true 
// 创建一个新的string对象
console.log(name.author)  // undefined

// 不好的做法，避免使用
var name = new String('nicholas')

```

## 将css从javascript中抽离
当你想要修改css样式时
* 不要去修改style属性
* 而应该操作className

## 将javascript从HTML中抽离
不要将javascrpt内嵌到html中

## 将HTML从javascript中抽离

## 事件处理
* 隔离用户行为和应用逻辑
* 不要分发整个事件对象，只分发应用逻辑需要用到的部分

## 避免空比较
* 检测原始值使用typeof
* 检测引用类型使用instanceof
* 检测自定义类型时instanceof是最好也是唯一的方法
* 检测函数instanceof返回function
* 判断属性最好用in

## 将配置数据从代码中分离出来
* url
* 需要展现给用户的字符串
* 重复的值
* 设置(比如每页的配置项)
* 任何可能发生变更的值

## 抛出自定义错误
* 错误是开发者的朋友，而不是敌人
* 错误需要try/catch捕获
```js
// 不好的写法
throw 'message'

// 推荐的写法
throw new Error('message')

```

## 何时抛出错误
* 不要过度的错误检查
* 只辨识在特定的情况下可能导致失败，并只在那些地方抛出错误

## 不是你的东西不要动
### 什么是你的
请牢记，如果你的代码没有创建这些对象，不要修改它们 

* 原生对象(object, array)
* dom对象
* bom对象
* 类库的对象

### 原则
* 不覆盖方法
* 不新增方法
* 不删除方法

### 基于对象的继承
在基于对象的继承中，也经常叫做原型继承，一个对象继承另一个对象是不需要调用构造函数的

### 基于类型的继承
这里的继承是依赖与原型的，因此，基于类型的继承是通过构造函数实现的，而非对象。这意味着，需要访问被继承对象的构造函数

### 门面模式
* 门面模式是一种流行的设计模式
* 为一个已存在的对象创建一个新的接口
* 门面是一个全新的对象，其背后已经有一个已存在的对象在工作
* 你的用例中如果继承无法满足要求，那么门面模式比较符合需求
```js
function DOMWrapper(element) {
	this.element = element
}

DOMWrapper.prototype.addClass = function(className) {
	element.className = '' + className
}

DOMWrapper.prototype.remove = function(){
	this.element.parentNode.removeChild(this.element)
}

var wrapper = new DOMWrapper(document.getElementById('my-div'))
wrapper.addClass('selected')
wrapper.remove()

```

### 阻止修改
修改是值对属性和方法操作 

* 防止扩展(不可新增，已存在的可修改或删除)
* 密封(禁止删除已存在对象的属性和方法)
* 冻结(禁止修改已存在对象的属性和方法)















































































































































































[toc]