高阶函数是指至少满足以下条件之一的函数：

- 函数可以作为参数被传递
- 函数可以作为返回值输出

## 1. 函数作为参数传递
> 把参数当作参数传递, 抽离出一部分容易变化的业务逻辑，将它放在函数参数中，这样可以分离业务代码中变化与不变的部分。其中一个重要的应用场景就是回调函数。  

### 回调函数

```javascript
var appendDiv = function() {
	for (var i = 0; i < 100; i++) {
		var div = document.createElement('div')
			div.innerHTML = i
			document.body.appendChild(div)
			div.style.display = 'none'
	}
}
appendDiv()

```
把`div.style.display = 'none'`这种硬编码放在appendDiv里显然是不合理的，appendDiv未免有点个性化了，成为一个难复用的函数，于是我们将`div.style.display = 'none`这行代码抽离出来，用回调函数的形式调用  

```javascript
var appendDiv = function(callback) {
	for (var i = 0; i < 100; i++) {
		var div = document.createElement('div')
			div.innerHTML = i
			document.body.appendChild(div)
			if (typeof callback === 'function') {
				callback(div)
			}
	}
}
appendDiv(function(node){
	node.style.display = 'none'
})

```

### Array.prototype.sort

Array.prototype.sort接受一个函数当作参数，这个函数里封装里数组元素的排序规则。<br />其中数组是不变，而排序规则是可变的，将可变的部分封装在函数里。  

```javascript
[1,4,5].sort(function(a, b){
    return a - b    
})

// 输出 [1,3,4]

```
## 2. 函数作为返回值输出
> 相比把函数作为参数传递，函数当作返回值输出的应用场景也许更多，也更能体现出函数式编程的巧妙。让函数返回一个可执行的函数，意味着运算过程是可延续。  

### 判断数据的类型

```javascript
var type = function(data) {
	if(arguments.length === 0) return;
	var typeStr = Object.prototype.toString.call(data)
	return typeStr.match(/\[object (.*?)\]/)[1].toLowerCase()
}
console.log(type('Array'))

//输出 string

```

## [](#87dzwt) 3. 高阶函数实现AOP
> AOP(面向切面编程) 的主要作用是把一些核心业务逻辑模块无关的功能抽离出来，这些无关的模块包括日志统计，安全控制，异常处理。把这些功能抽离之后，再通过`动态织入`的方式掺入业务逻辑中。这样做的好处是保持业务逻辑模块的纯净和高内聚性，其次是可以很方便的复用次用模块。在JavaScript中AOP的实现非常简单，这是与生俱来的能力
```javascript
Function.prototype.before = function(beforefn) {
	var _self = this // 保存原函数的引用
	return function() { // 返回包含了原函数和新函数的"代理"函数				
		beforefn.apply(this, arguments) // 执行新函数，修正this
		return _self.apply(this, arguments) // 执行原函数
	}
}

Function.prototype.after = function(afterfn) {
	var _self = this
	return function() {
		var ret = _self.apply(this, arguments) //修正this值，并且执行原函数
		afterfn.apply(this, arguments) //执行新函数
		return ret
	}
}

var fnc = function(){
	console.log(2)
}
fnc = fnc.before(function(){
	console.log(1)
}).after(function(){
	console.log(3)
})

fnc()

// 输出 1  2  3

```
## 4. 高阶函数的其他应用
### 函数柯里化

`函数柯里化(function currying)`又称部分求值。一个currying的函数首先会接受一些参数，接受了这些参数之后，该函数不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数中形成的`闭包`中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。

```javascript
// 通用currying函数，接受一个参数，即将要被currying的函数
var currying = function(fn) {
	var args = []
	return function() {
		if (arguments.length === 0) {
			return fn.apply(this, args)
		} else {
			[].push.apply(args, arguments)
			return arguments.callee
		}
	}
}


// 被currying的函数
var cost = (function(){
	var money = 0
	return function() {
		for (var i = 0, l= arguments.length; i < l; i++) {
			money += arguments[i]
		}
		return money
	}
})()

var cost = currying(cost)

cost(100) //未真正求值
cost(200) //未真正求值
cost(300) //未真正求值

console.log(cost()) // 求值并输出：600

```

### uncurrying
>`uncurrying`的目的是将泛化this的过程提取出来，将`fn.call`或者`fn.apply`抽象成通用的函数。  

在javascript中，当我们调用对象的某个方法时，其实不用关心该对象原本是否拥有这个方法，这也是动态类型语言的特点。可以用`call`和`apply`去借用一个原本不属于它的方法  


```javascript
var obj1 = {
	name: 'sven'
}

var obj2 = {
	getName: function() {
		return this.name
	}
}

console.log(obj2.getName.call(obj1)) // 输出： sven

```  

通过uncurrying的方式，我们可以把Array.prototype上的方法"复制"到array对象上，同样这些方法可操作的对象也不仅仅只是array对象  

```javascript
// uncurrying实现
Function.prototype.uncurrying = function() {
    var self = this;
    return function() {
        return Function.prototype.call.apply(self, arguments);
    }
};

// 将Array.prototype.push进行uncurrying，此时push函数的作用就跟Array.prototype.push一样了，且不仅仅局限于只能操作array对象。
var push = Array.prototype.push.uncurrying();

var obj = {
    "length": 1,
    "0": 1
};

push(obj, 2);
console.log(obj);   // 输出：{0: 1, 1: 2, length: 2}

```

### 函数节流
> 当一个函数被频繁调用时，如果会造成很大的性能问题的时候，这个时候可以考虑函数节流，降低函数被调用的频率。  

throttle函数的原理是，将即将被执行的函数用setTimeout延迟一段时间执行。如果该次延迟执行还没有完成，则忽略接下来调用该函数的请求。throttle函数接受2个参数，第一个参数为需要被延迟执行的函数，第二个参数为延迟执行的时间。  

```javascript
var throttle = function(fn, interval) {
	var _self = fn, // 保存需要被延时执行的函数引用
		timer,		// 定时器
		firstTime = true // 是否是第一次调用
	
	return function() {
		var args = arguments,
			_me = this
		
		if (firstTime) { // 如果是第一次调用，不延时执行
			_self.apply(_me, args)
			return firstTime = false
		}
		
		if (timer) {  // 如果定时器还在，说明前一次延时执行还没有完成
			return false
		}
		
		timer = setTimeout(function(){ //延时执行
			clearTimeout(timer)
			timer = null
			_self.apply(_me, args)
		}, interval || 500)
		
	}
}

window.onresize = throttle(function(){
	console.log(1)
}, 500)

```

###  分时函数

当一次的用户操作会严重地影响页面性能，如在短时间内往页面中大量添加DOM节点显然也会让浏览器吃不消，我们看到的结果往往就是浏览器的卡顿甚至假死。  

这个问题的解决方案之一是下面的timeChunk函数，timeChunk函数让创建节点的工作分批进行，比如把1秒钟创建1000个节点，改为每隔200毫秒创建8个节点。  

```javascript
var timeChunk = function(ary, fn, count) {
    var t;
    
    var start = function() {
        for ( var i = 0; i < Math.min( count || 1, ary.length ); i++ ){
            var obj = ary.shift();
            fn( obj );
        }
     };
    
     return function() {
        t = setInterval(function() {
          if (ary.length === 0) {  // 如果全部节点都已经被创建好
              return clearInterval(t);
          }
          start();
        }, 200);    // 分批执行的时间间隔，也可以用参数的形式传入
    };
};

```

### 惰性加载
在Web开发中，因为浏览器之间的实现差异，一些嗅探工作总是不可避免。比如我们需要一个在各个浏览器中能够通用的事件绑定函数addEvent，常见的写法如下：  


**方案一：**

```javascript
var addEvent = function(elem, type, handler) {
    if (window.addEventListener) {
       return elem.addEventListener(type, handler, false)
    }
    
    if (window.attachEvent) {
          return elem.attachEvent('on' + type, handler)
    }
}

```  

缺点：当它每次被调用的时候都会执行里面的if条件分支，虽然执行这些if分支的开销不算大，但也许有一些方法可以让程序避免这些重复的执行过程。  

**方案二：**  

```javascript
var addEvent = (function() {
    if (window.addEventListener) {
        return function(elem, type, handler) {
            elem.addEventListener(type, handler, false)
        }
    }
    if (window.attachEvent) {
        return function(elem, type, handler) {
            elem.attachEvent('on' + type, handler)
        }
    }
})()

```  

缺点：也许我们从头到尾都没有使用过addEvent函数，这样看来，一开始的浏览器嗅探就是完全多余的操作，而且这也会稍稍延长页面ready的时间。  

**方案三：**  

```javascript
var addEvent = function(elem, type, handler) {
    if (window.addEventListener) {
       addEvent = function(elem, type, handler) {
           elem.addEventListener(type, handler, false)
       }
    } else if (window.attachEvent) {
        addEvent = function(elem, type, handler) {
            elem.attachEvent('on' + type, handler)
        }
    }
    addEvent(elem, type, handler)
}

```  

此时addEvent依然被声明为一个普通函数，在函数里依然有一些分支判断。但是在第一次进入条件分支之后，在函数内部会重写这个函数，重写之后的函数就是我们期望的addEvent函数，在下一次进入addEvent函数的时候，addEvent函数里不再存在条件分支语句。  


[toc]