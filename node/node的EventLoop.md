## []() 1. Event Loop
启动时，创建了一个类似while(true)的循环体，每次执行一次循环体称为一次tick，每个tick的过程就是查看是否有事件等待处理，如果有，则取出事件极其相关的回调函数并执行，然后执行下一次tick。  

主线程从任务队列中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop(事件循环)

## []() 2. node的Event Loop
Node 中的 Event Loop 和浏览器中的是完全不相同的东西。Node.js 采用 V8 作为 js 的解析引擎，而 I/O 处理方面使用了自己设计的 `libuv`，libuv 是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的 API，事件循环机制也是它里面的实现  

**Node.js 的运行机制如下:**  

* V8引擎解析JavaScript脚本。
* 解析后的代码，调用Node API。
* libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
* V8引擎再将结果返回给用户。

## 3. 六个阶段
其中 libuv 引擎中的事件循环分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。
[![](https://i.loli.net/2019/07/24/5d37e56303e4f78239.png)](https://i.loli.net/2019/07/24/5d37e56303e4f78239.png)  

**事件顺序大致为：**  

外部输入数据–>轮询阶段(poll)–>检查阶段(check)–>关闭事件回调阶段(close callback)–>定时器检测阶段(timer)–>I/O 事件回调阶段(I/O callbacks)–>闲置阶段(idle, prepare)–>轮询阶段（按照该顺序反复运行）…  


* timers 阶段：这个阶段执行 timer（setTimeout、setInterval）的回调
* I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
* idle, prepare 阶段：仅 node 内部使用
* poll 阶段：获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里
* check 阶段：执行 setImmediate() 的回调
* close callbacks 阶段：执行 socket 的 close 事件回调  

我们重点关注`timers、poll、check`这 3 个阶段，因为日常开发中的绝大部分异步任务都是在这 3 个阶段处理的。  

[![](https://i.loli.net/2019/07/24/5d381ef3ed49226058.jpg)](https://i.loli.net/2019/07/24/5d381ef3ed49226058.jpg)

## 4. 注意点
### timers

```js
console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')
//start=>end=>promise3=>timer1=>timer2=>promise1=>promise2

```  

timers 阶段的setTimeout/setInterval 不像浏览器(先执行一个宏任务,再执行微任务)，而是**依次执行全部宏任务，再执行微任务**  

**新版本的node和浏览器保持一致**

### setTimeout 和 setImmediate  

二者非常相似，区别主要在于调用时机不同。  

* setImmediate 在 poll 阶段完成时执行，即 check 阶段；
* setTimeout 在 poll 阶段为空闲时，且设定时间到达后执行，但它在 timer 阶段执行  

```js
setTimeout(function timeout () {
  console.log('timeout');
},0);
setImmediate(function immediate () {
  console.log('immediate');
});

```  

* 对于以上代码来说，setTimeout 可能执行在前，也可能执行在后。
* 假如node启动时耗时较长大于4ms,那么在 timer 阶段就会直接执行 setTimeout 回调
* 如果准备时间花费小于 4ms，那么就是 setImmediate 回调先执行了  

但当二者在异步 i/o callback 内部调用时，总是先执行 setImmediate，再执行 setTimeout

```js
const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
// immediate
// timeout

```
在上述代码中，setImmediate 永远先执行。因为两个代码写在 IO 回调中，IO 回调是在 poll 阶段执行，当回调执行完毕后队列为空，发现存在 setImmediate 回调，所以就直接跳转到 check 阶段去执行回调了。  

### process.nextTick

这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。  

```js
setTimeout(() => {
 console.log('timer1')
 Promise.resolve().then(function() {
   console.log('promise1')
 })
}, 0)
process.nextTick(() => {
 console.log('nextTick')
 process.nextTick(() => {
   console.log('nextTick')
   process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
     })
   })
 })
})
// nextTick=>nextTick=>nextTick=>nextTick=>timer1=>promise1

```

## 5. node与浏览器的差异

* 浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行
* Node中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务  

[![](https://i.loli.net/2019/07/24/5d381d80cd84726945.png)](https://i.loli.net/2019/07/24/5d381d80cd84726945.png)  

接下我们通过一个例子来说明两者区别：

```js
setTimeout(()=>{
    console.log('timer1')
    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)
setTimeout(()=>{
    console.log('timer2')
    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)

```

`浏览器`  

1. 进入主栈发现setTimeout1,setTimeou2 放入macrotask队列
2. 按顺序执行macrotask队列setTimeout1，执行回调打印出timer1，发现Promise放入microtask队列
3. 此时microtask队列存在回调，执行回调打印出promise1
4. microtask队列执行完毕，再找macrotask队列，发现有setTimeou2的回调，执行打印出timer2,遇到Promise放入microtask队列
5. 此时microtask队列存在回调，执行回调打印出promise2
6. 结果：timer1=>timer2=>promise1=>promise2  

[![](https://i.loli.net/2019/07/24/5d382398ba3f510070.gif)](https://i.loli.net/2019/07/24/5d382398ba3f510070.gif)

`node`  

1. 全局脚本进入，发现有2个setTimeout，放入timer队列
2. 进入timer队列时，依次执行setTimeout1,打印出timer1,遇到Promise放入microtask队列，然后执行setTimeout2，打印timer2，遇到Promise放入microtask队列
3. 至此，timer 阶段执行结束，event loop 进入下一个阶段之前，执行 microtask 队列的所有任务，依次打印 promise1、promise2  

[![](https://i.loli.net/2019/07/24/5d3823c78524393680.gif)](https://i.loli.net/2019/07/24/5d3823c78524393680.gif)

[toc]
