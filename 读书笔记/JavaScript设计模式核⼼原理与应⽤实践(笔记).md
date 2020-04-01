## 前端工程师的成长论
### 核心竞争力在哪
决定一个前端工程师本质的东西，就是那些**不变的东西**
### 什么是不变的东西?
所谓“不变的东西”，说的就是这种**驾驭技术的能力**。  

具体来说,分为三个层次:
* 能用健壮的代码去解决具体的问题
* 能用抽象的思维去应对复杂的系统
* 能用工程化的思想去规划更大规模的业务

## 设计模式之道
设计模式的核心思想，就是“封装变化”, 不同的设计模式都是在用自己的方式去封装不同类型的变化

## 构造器模式
当新建对象的内存被分配后，用来初始化对象的特殊函数，就叫做**构造器**。在javascript中，我们使用构造函数去初始化对象，就是应用了构造器模式。  

```js
function User(name , age, career) {
    this.name = name
    this.age = age
    this.career = career 
}

```  

### new User中，谁变了，谁不变？
变化的是每个user拥有不同的值，不变的是每个user都有这些属性

### 那么构造器做了什么？
构造器在将name,age,career赋值给对象过程中
* 确保了每个对象都具备这些属性(不变)
* 确保了个性的灵活, 将取值的操作开放(变)

### 构造器模式的本质
抽象了每个对象实例的变与不变

## 简单工厂模式
针对上面那个User，产生一个需要，我需要`添加不同工种职责说明`  

### 反例
此时，你想不就是加构造器能解决
```js

// 每次都需要先判断工种，然后分配构造器
function Coder(name , age) {
    this.name = name
    this.age = age
    this.career = 'coder' 
    this.work = ['写代码','写系分', '修Bug']
}
function ProductManager(name, age) {
    this.name = name
    this.age = age
    this.career = 'product manager'
    this.work = ['订会议室', '写PRD', '催更']
}

// 没有将共性与个性分离
function Factory(name, age, career) {
    switch(career) {
        case 'coder':
            return new Coder(name, age) 
            break
        case 'product manager':
            return new ProductManager(name, age)
            break
        ...
}

```  

### 正例
* 将共性分离到user中
* 将承载了共性的user类和个性化的逻辑判断写入一个函数
```js
function User(name , age, career, work) {
    this.name = name
    this.age = age
    this.career = career
    this.work = work
}

function Factory(name, age, career) {
    let work
    switch(career) {
        case 'coder':
            work =  ['写代码','写系分', '修Bug'] 
            break
        case 'product manager':
            work = ['订会议室', '写PRD', '催更']
            break
        case 'boss':
            work = ['喝茶', '看报', '见客户']
        case 'xxx':
            // 其它工种的职责分配
            ...

    return new User(name, age, career, work)
}

```

### 总结
* 将创建对象的过程单独封装
* 抽象不同构造函数(类)的变与不变
* 不用关心工厂函数里的运转逻辑，只需要传参
* 有大量的构造函数、调用了大量的new的地方，我们就应该想到工厂模式  

构造器解决的是多个对象实例的问题  
简单工程解决的是多个类的问题  

那么当复杂度从多个类上升到多个工厂共存时又该怎么处理呢？来到下一节

## 抽象工厂模式
### 问题
在上一回的工厂模式中，我们深究可以发现有很多问题  
不同工种之间有权限，因此我们需要对Boss这种群体做单独的逻辑处理  

怎么办,修改Factory的函数体，增加相关逻辑处理吗？这样的问题是:
* 再考虑到一个新群体，再修改一次Factory
* 对于系统测试，造成混乱
* 违反了开放封闭原则  

上面的问题在与只有修改，没有拓展。看接下来的问题

### 实例
下面我们来组成一个山寨工厂:
1. 准备好操作系统
2. 准备好硬件

```js
// 抽象工厂
// 约定手机流水线的通用能力,只指定标准，不干活
class MobilePhoneFactory {
    // 提供操作系统的接口
    createOS(){
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！")
    }
    // 提供硬件的接口
    createHardWare(){
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！")
    }
}

// 具体工厂（ConcreteFactory）来干活
class FakeStarFactory extends MobilePhoneFactory {
    createOS() {
        // 提供安卓系统实例
        return new AndroidOS()
    }
    createHardWare() {
        // 提供高通硬件实例
        return new QualcommHardWare()
    }
}

// 抽象产品
// 定义操作系统这类产品的抽象产品类
class OS {
    controlHardWare() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 具体产品
// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
    controlHardWare() {
        console.log('我会用安卓的方式去操作硬件')
    }
}

class AppleOS extends OS {
    controlHardWare() {
        console.log('我会用🍎的方式去操作硬件')
    }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    operateByOrder() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转')
    }
}

class MiWare extends HardWare {
    operateByOrder() {
        console.log('我会用小米的方式去运转')
    }
}

```  

如此一来，当我需要生产一台FackStar手机时
```js
// 这是我的手机
const myPhone = new FakeStarFactory()
// 让它拥有操作系统
const myOS = myPhone.createOS()
// 让它拥有硬件
const myHardWare = myPhone.createHardWare()
// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
myOS.controlHardWare()
// 唤醒硬件(输出‘我会用高通的方式去运转’)
myHardWare.operateByOrder()

```  

假如FackStar过气了，我们换新产品，不需要对抽象工厂做修改，只需要做扩展
```js
class newStarFactory extends MobilePhoneFactory {
    createOS() {
        // 操作系统实现代码
    }
    createHardWare() {
        // 硬件实现代码
    }
}

```

### 简单工厂和抽象工厂
#### 相同
* 都尝试去分离一个系统中变与不变的部分
* 处理的对象都是类
#### 不同点
场景的复杂度  
简单工厂：简单的类，易抽离，逻辑简单，不苛求代码的可拓展性
抽象工厂：复杂的类，拓展性千变万化

### 总结
* **抽象工厂（抽象类，它不能被用于生成具体实例）**： 用于声明最终目标产品的共性。在一个系统里，抽象工厂可以有多个（大家可以想象我们的手机厂后来被一个更大的厂收购了，这个厂里除了手机抽象类，还有平板、游戏机抽象类等等），每一个抽象工厂对应的这一类的产品，被称为“产品族”。
* **具体工厂（用于生成产品族里的一个具体的产品）**： 继承自抽象工厂、实现了抽象工厂里声明的那些方法，用于创建具体的产品的类。
* **抽象产品（抽象类，它不能被用于生成具体实例）**： 上面我们看到，具体工厂里实现的接口，会依赖一些类，这些类对应到各种各样的具体的细粒度产品（比如操作系统、硬件等），这些具体产品类的共性各自抽离，便对应到了各自的抽象产品类。
* **具体产品（用于生成产品族里的一个具体的产品所依赖的更细粒度的产品）**： 比如我们上文中具体的一种操作系统、或具体的一种硬件等。  

抽象工厂模式的定义，是**围绕一个超级工厂创建其他工厂**。

## 单例模式
* 保证一个类仅有一个实例，并提供一个访问它的全局访问点
* 不管我们尝试去创建多少次，它都只给你返回第一次所创建的那唯一的一个实例。  

### 基本实现
```js
class SingleDog {
    show() {
        console.log('我是一个单例对象')
    }
    static getInstance() {
        // 判断是否已经new过1个实例
        if (!SingleDog.instance) {
            // 若这个唯一的实例不存在，那么先创建它
            SingleDog.instance = new SingleDog()
        }
        // 如果这个唯一的实例已经存在，则直接返回
        return SingleDog.instance
    }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()

// true
s1 === s2


// 闭包实现
SingleDog.getInstance = (function() {
    // 定义自由变量instance，模拟私有变量
    let instance = null
    return function() {
        // 判断自由变量是否为null
        if(!instance) {
            // 如果为null则new出唯一实例
            instance = new SingleDog()
        }
        return instance
    }
})()

```

### 实现一个全局的模态框
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>单例模式弹框</title>
</head>
<style>
#modal {
  height: 200px;
  width: 200px;
  line-height: 200px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  text-align: center;
}
</style>
<body>
	<button id='open'>打开弹框</button>
	<button id='close'>关闭弹框</button>
</body>
<script>
// 核心逻辑，这里采用了闭包思路来实现单例模式
const Modal = (function() {
  let modal = null
  return function() {
    if (!modal) {
      modal = document.createElement('div')
      modal.innerHTML = '我是一个全局唯一的Modal'
      modal.id = 'modal'
      modal.style.display = 'none'
      document.body.appendChild(modal)
    }
    return modal
  }
})()

// 点击打开按钮展示模态框
document.getElementById('open').addEventListener('click', function() {
  // 未点击则不创建modal实例，避免不必要的内存占用
  const modal = new Modal()
  modal.style.display = 'block'
})

// 点击关闭按钮隐藏模态框
document.getElementById('close').addEventListener('click', function() {
  const modal = new Modal()
  if (modal) {
    modal.style.display = 'none'
  }
})
</script>
</html>

```

## 装饰器模式
定义是“在不改变原对象的基础上，通过对其进行包装拓展，使原有对象可以满足用户的更复杂需求”

## 实例
针对上面那个模态框，我们有个新需求，在每个业务按钮点击后弹出「您还未登录哦」的弹框  

这时候我们需要修改创建模态框的代码
```js
const Modal = (function() {
	let modal = null
	return function() {
		if(!modal) {
			modal = document.createElement('div')
			modal.innerHTML = '您还未登录哦~'
			modal.id = 'modal'
			modal.style.display = 'none'
			document.body.appendChild(modal)
		}
		return modal
	}
})()

```

这个时候，我们如果需求再变：弹框被关闭后把按钮的文案改为“快去登录”，同时把按钮置灰  

这个时候问题出来了 
* 业务里都用到了这类按钮，所以你需要深入到各个按钮里添加这部分逻辑
* 有的业务在迭代中，不需要这部分逻辑
* 有的业务不再你这里，你需要通知别人去修改  

面临这些问题的时候，应该不去关心现有的业务是怎样，只需要对已有的功能做扩展，之关系拓展出来的那部分代码  

## 装饰器实现
```js
// 定义打开按钮
class OpenButton {
    // 点击后展示弹框（旧逻辑）
    onClick() {
        const modal = new Modal()
    	modal.style.display = 'block'
    }
}

// 定义按钮对应的装饰器
class Decorator {
    // 将按钮实例传入
    constructor(open_button) {
        this.open_button = open_button
    }
    
    onClick() {
        this.open_button.onClick()
        // “包装”了一层新逻辑
        this.changeButtonStatus()
    }
    
    changeButtonStatus() {
        this.changeButtonText()
        this.disableButton()
    }
    
    disableButton() {
        const btn =  document.getElementById('open')
        btn.setAttribute("disabled", true)
    }
    
    changeButtonText() {
        const btn = document.getElementById('open')
        btn.innerText = '快去登录'
    }
}

const openButton = new OpenButton()
const decorator = new Decorator(openButton)

document.getElementById('open').addEventListener('click', function() {
    // openButton.onClick()
    // 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
    decorator.onClick()
})

```

### 生产实践
**React中的装饰器: HOC**
```js
// 定义
import React, { Component } from 'react'

const BorderHoc = WrappedComponent => class extends Component {
  render() {
    return <div style={{ border: 'solid 1px red' }}>
      <WrappedComponent />
    </div>
  }
}
export default borderHoc

// 使用
import React, { Component } from 'react'
import BorderHoc from './BorderHoc'

// 用BorderHoc装饰目标组件
@BorderHoc 
class TargetComponent extends React.Component {
  render() {
    // 目标组件具体的业务逻辑
  }
}

// export出去的其实是一个被包裹后的组件
export default TargetComponent

```  

**Redux connect**
```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import action from './action.js'

class App extends Component {
  render() {
    // App的业务逻辑
  }
}

function mapStateToProps(state) {
  // 假设App的状态对应状态树上的app节点
  return state.app
}

function mapDispatchToProps(dispatch) {
  // 这段看不懂也没关系，下面会有解释。重点理解connect的调用即可
  return bindActionCreators(action, dispatch)
}

// 把App组件与Redux绑在一起
export default connect(mapStateToProps, mapDispatchToProps)(App)

```  

在组件文件里引入connect：
```js
import React, { Component } from 'react'
import connect from './connect.js'   

@connect
export default class App extends Component {
  render() {
    // App的业务逻辑
  }
}

``` 

## 适配器模式
适配器模式通过把**一个类的接口变换成客户端所期待的另一种接口**，可以帮我们解决**不兼容**的问题。  

### 生活中的适配器
我的iPhoneX手机的耳机孔是`方形`孔，此时我们的耳机却是`圆形`插头。那么有个解决办法是，使用`转接头`，
它能让我们的耳机适配手机。

### 适配器的业务场景
在业务场景中，我们使用fetch封装了http请求库
```js
export default class HttpUtils {
  // get方法
  static get(url) {
    return new Promise((resolve, reject) => {
      // 调用fetch
      fetch(url)
        .then(response => response.json())
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  
  // post方法，data以object形式传入
  static post(url, data) {
    return new Promise((resolve, reject) => {
      // 调用fetch
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 将object类型的数据格式化为合法的body参数
        body: this.changeData(data)
      })
        .then(response => response.json())
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  
  // body请求体的格式化方法
  static changeData(obj) {
    var prop,
      str = ''
    var i = 0
    for (prop in obj) {
      if (!prop) {
        return
      }
      if (i == 0) {
        str += prop + '=' + obj[prop]
      } else {
        str += '&' + prop + '=' + obj[prop]
      }
      i++
    }
    return str
  }
}

```  

此时,我们公司业务的网络请求用的是XMLHttpRequest  

```js
function Ajax(type, url, data, success, failed){
    // 创建ajax对象
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
 
   ...(此处省略一系列的业务逻辑细节)
   
   var type = type.toUpperCase();
    
    // 识别请求类型
    if(type == 'GET'){
        if(data){
          xhr.open('GET', url + '?' + data, true); //如果有数据就拼接
        } 
        // 发送get请求
        xhr.send();
 
    } else if(type == 'POST'){
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样 POST 数据，使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // 发送post请求
        xhr.send(data);
    }
 
    // 处理返回数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            } else {
                if(failed){
                    failed(xhr.status);
                }
            }
        }
    }
}

```

如果我们此时想要把公司所有的业务的网络请求都迁移到这个 HttpUtils 上来，是不是我们需要去改动老的代码？修改老接口的调用？此时我们完全可以用适配器模式来抹平差异  

```js
// Ajax适配器函数，入参与旧接口保持一致
function AjaxAdapter(type, url, data, success, failed) {
    const type = type.toUpperCase()
    let result
    try {
         // 实际的请求全部由新街口发起
         if(type === 'GET') {
            result = await HttpUtils.get(url) || {}
        } else if(type === 'POST') {
            result = await HttpUtils.post(url, data) || {}
        }
        // 假设请求成功对应的状态码是1
        result.statusCode === 1 && success ? success(result) : failed(result.statusCode)
    } catch(error) {
        // 捕捉网络错误
        if(failed){
            failed(error.statusCode);
        }
    }
}

// 用适配器适配旧的Ajax方法
function Ajax(type, url, data, success, failed) {
    AjaxAdapter(type, url, data, success, failed)
}

```

### axios中的适配器模式
axios为什么不仅在浏览器，还能再服务端使用。其中的奥秘在于-axios对适配器的灵活运用  

在axios的核心逻辑中，我们可以注意到实际上派发请求的是disaptchRequest方法。该方法在内部其实做了2件事：
1. 数据转换，转换请求体/响应体，可以理解为数据层面的适配
2. 调用适配器  

调用逻辑如下:
```js
// 若用户未手动配置适配器，则使用默认的适配器
var adapter = config.adapter || defaults.adapter;
  
  // dispatchRequest方法的末尾调用的是适配器方法
  return adapter(config).then(function onAdapterResolution(response) {
    // 请求成功的回调
    throwIfCancellationRequested(config);

    // 转换响应体
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    // 请求失败的回调
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // 转换响应体
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });

```  

实际开发中，我们使用默认适配器的频率更高。默认适配器在axios/lib/default.js里是通过getDefaultAdapter方法来获取的：  
```js
function getDefaultAdapter() {
  var adapter;
  // 判断当前是否是node环境
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // 如果是node环境，调用node专属的http适配器
    adapter = require('./adapters/http');
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // 如果是浏览器环境，调用基于xhr的适配器
    adapter = require('./adapters/xhr');
  }
  return adapter;
}

```  

我们再来看看 Node 的 http 适配器和 xhr 适配器大概长啥样：  
```js
// http
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    // 具体逻辑
  }
}

// xhr
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    // 具体逻辑
  }
}
```

## 代理模式
代理模式，式如其名——在某些情况下，出于种种考虑/限制，一个对象不能直接访问另一个对象，需要一个第三者（代理）牵线搭桥从而间接达到访问目的，这样的模式就是代理模式。

### es6中的proxy
在es6中提供了专为代理角色出现的代理器-proxy
```js
// obj：目标对象
// handler: 第三方代理对象
const proxy = new Proxy(obj, handler)

```

### 婚介所
```js
// 未知妹子
const girl = {
  // 姓名
  name: '小美',
  // 自我介绍
  aboutMe: '...'（大家自行脑补吧）
  // 年龄
  age: 24,
  // 职业
  career: 'teacher',
  // 假头像
  fakeAvatar: 'xxxx'(新垣结衣的图片地址）
  // 真实头像
  avatar: 'xxxx'(自己的照片地址),
  // 手机号
  phone: 123456,
}
```  

此时只有VIP才能访问私密信息  

```js
// 普通私密信息
const baseInfo = ['age', 'career']
// 最私密信息
const privateInfo = ['avatar', 'phone']

// 用户（同事A）对象实例
const user = {
    ...(一些必要的个人信息)
    isValidated: true,
    isVIP: false,
}

// 掘金婚介所登场了
const JuejinLovers = new Proxy(girl, {
  get: function(girl, key) {
      if(baseInfo.indexOf(key)!==-1 && !user.isValidated) {
          alert('您还没有完成验证哦')
          return
      }
      
      //...(此处省略其它有的没的各种校验逻辑)
    
      // 此处我们认为只有验证过的用户才可以购买VIP
      if(user.isValidated && privateInfo.indexOf(key) && !user.isVIP) {
          alert('只有VIP才可以查看该信息哦')
          return
      }
  }
})

```  

以上主要是 getter 层面的拦截。假设我们还允许会员间互送礼物，每个会员可以告知婚介所自己愿意接受的礼物的价格下限，我们还可以作 setter 层面的拦截。  

```js
// 规定礼物的数据结构由type和value组成
const present = {
    type: '巧克力',
    value: 60,
}

// 为用户增开presents字段存储礼物
const girl = {
  // 姓名
  name: '小美',
  // 自我介绍
  aboutMe: '...'（大家自行脑补吧）
  // 年龄
  age: 24,
  // 职业
  career: 'teacher',
  // 假头像
  fakeAvatar: 'xxxx'(新垣结衣的图片地址）
  // 真实头像
  avatar: 'xxxx'(自己的照片地址),
  // 手机号
  phone: 123456,
  // 礼物数组
  presents: [],
  // 拒收50块以下的礼物
  bottomValue: 50,
  // 记录最近一次收到的礼物
  lastPresent: present,
}

// 掘金婚介所推出了小礼物功能
const JuejinLovers = new Proxy(girl, {
  get: function(girl, key) {
    if(baseInfo.indexOf(key)!==-1 && !user.isValidated) {
        alert('您还没有完成验证哦')
        return
    }
    
    //...(此处省略其它有的没的各种校验逻辑)
  
    // 此处我们认为只有验证过的用户才可以购买VIP
    if(user.isValidated && privateInfo.indexOf(key) && !user.isVIP) {
        alert('只有VIP才可以查看该信息哦')
        return
    }
  }
  
  set: function(girl, key, val) {
 
    // 最近一次送来的礼物会尝试赋值给lastPresent字段
    if(key === 'lastPresent') {
      if(val.value < girl.bottomValue) {
          alert('sorry，您的礼物被拒收了')
          return
      }
    
      // 如果没有拒收，则赋值成功，同时并入presents数组
      girl[lastPresent] = val
      girl[presents] = [...presents, val]
    }
  }
 
})

```

### 事件代理
在开发中非常常见的一种应用方式，
```js
// 获取父元素
const father = document.getElementById('father')

// 给父元素安装一次监听函数
father.addEventListener('click', function(e) {
    // 识别是否是目标子元素
    if(e.target.tagName === 'A') {
        // 以下是监听函数的函数体
        e.preventDefault()
        alert(`我是${e.target.innerText}`)
    }
} )

```

### 虚拟代理
图片懒加载
* PreLoadImage 专注于修改DOM
* ProxyImage 帮我们调度了预加载相关的工作
```js
class PreLoadImage {
    constructor(imgNode) {
        // 获取真实的DOM节点
        this.imgNode = imgNode
    }
     
    // 操作img节点的src属性
    setSrc(imgUrl) {
        this.imgNode.src = imgUrl
    }
}

class ProxyImage {
    // 占位图的url地址
    static LOADING_URL = 'xxxxxx'

    constructor(targetImage) {
        // 目标Image，即PreLoadImage实例
        this.targetImage = targetImage
    }
    
    // 该方法主要操作虚拟Image，完成加载
    setSrc(targetUrl) {
       // 真实img节点初始化时展示的是一个占位图
        this.targetImage.setSrc(ProxyImage.LOADING_URL)
        // 创建一个帮我们加载图片的虚拟Image实例
        const virtualImage = new Image()
        // 设置src属性，虚拟Image实例开始加载图片
        virtualImage.src = targetUrl		
        // 监听目标图片加载的情况，完成时再将DOM上的真实img节点的src属性设置为目标图片的url
        virtualImage.onload = () => {
            this.targetImage.setSrc(targetUrl)
        }
    }
}

```  

在这个实例中，`virtualImage` 这个对象是一个“幕后英雄”，它始终存在于 JavaScript 世界中、代替真实 DOM 发起了图片加载请求、完成了图片加载工作，却从未在渲染层面抛头露面。因此这种模式被称为“虚拟代理”模式。

### 缓存代理
在一些计算量比较大的情况下，我们需要空间换时间。已经计算过的值，存在内存中，不要再二次计算，下次直接取。
```js
// addAll方法会对你传入的所有参数做求和操作
const addAll = function() {
    console.log('进行了一次新计算')
    let result = 0
    const len = arguments.length
    for(let i = 0; i < len; i++) {
        result += arguments[i]
    }
    return result
}

// 为求和方法创建代理
const proxyAddAll = (function(){
    // 求和结果的缓存池
    const resultCache = {}
    return function() {
        // 将入参转化为一个唯一的入参字符串
        const args = Array.prototype.join.call(arguments, ',')
        
        // 检查本次入参是否有对应的计算结果
        if(args in resultCache) {
            // 如果有，则返回缓存池里现成的结果
            return resultCache[args]
        }
        return resultCache[args] = addAll(...arguments)
    }
})()

```

### 保护代理
保护代理，在婚介所例子已经看到了  

当男生访问女生信息的时候：
* 需要验证男生是否通过了实名认证
* 男生想获取女生私密信息时，需要校验是否为VIP  

所谓的保护代理，就是在访问层做文章，在getter和setter函数里进行校验和拦截

## 观察者模式
观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新

### 生活中的观察者模式
在群里，我们常常看到 `@all`, 然后每个人都能收到消息，这就是一个典型的观察者模式。消息的发布者只有一人，而消息的接受者却有多人。

### 套路
角色划分 --> 状态变化 --> 发布者通知到订阅者

### 实践中定义
#### 发布者
```js
// 定义发布者类
class Publisher {
  constructor() {
    this.observers = []
    console.log('Publisher created')
  }
  // 增加订阅者
  add(observer) {
    console.log('Publisher.add invoked')
    this.observers.push(observer)
  }
  // 移除订阅者
  remove(observer) {
    console.log('Publisher.remove invoked')
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1)
      }
    })
  }
  // 通知所有订阅者
  notify() {
    console.log('Publisher.notify invoked')
    this.observers.forEach((observer) => {
      observer.update(this)
    })
  }
}

```

#### 订阅者
订阅者的能力非常简单
1. 被通知
2. 去执行
```js
class Observer {
    constructor() {
        console.log('Observer created')
    }

    update() {
        console.log('Observer.update invoked')
    }
}

```

#### 实现功能
以上我们完成基类的设计，我们可以根据基类来定制
```js
// 定义一个具体的需求文档（prd）发布类
class PrdPublisher extends Publisher {
    constructor() {
        super()
        // 初始化需求文档
        this.prdState = null
        // 韩梅梅还没有拉群，开发群目前为空
        this.observers = []
        console.log('PrdPublisher created')
    }
    
    // 该方法用于获取当前的prdState
    getState() {
        console.log('PrdPublisher.getState invoked')
        return this.prdState
    }
    
    // 该方法用于改变prdState的值
    setState(state) {
        console.log('PrdPublisher.setState invoked')
        // prd的值发生改变
        this.prdState = state
        // 需求文档变更，立刻通知所有开发者
        this.notify()
    }
}

```  

作为订阅方，开发者的任务也变得具体：接受需求文档，并开始干活  

```js
class DeveloperObserver extends Observer {
    constructor() {
        super()
        // 需求文档一开始还不存在，prd初始为空对象
        this.prdState = {}
        console.log('DeveloperObserver created')
    }
    
    // 重写一个具体的update方法
    update(publisher) {
        console.log('DeveloperObserver.update invoked')
        // 更新需求文档
        this.prdState = publisher.getState()
        // 调用工作函数
        this.work()
    }
    
    // work方法，一个专门搬砖的方法
    work() {
        // 获取需求文档
        const prd = this.prdState
        // 开始基于需求文档提供的信息搬砖。。。
        ...
        console.log('996 begins...')
    }
}

```

接下来，我们new一个prdpublisher对象(产品经理）更新需求文档  

```js
// 创建订阅者：前端开发李雷
const liLei = new DeveloperObserver()
// 创建订阅者：服务端开发小A（sorry。。。起名字真的太难了）
const A = new DeveloperObserver()
// 创建订阅者：测试同学小B
const B = new DeveloperObserver()
// 韩梅梅出现了
const hanMeiMei = new PrdPublisher()
// 需求文档出现了
const prd = {
    // 具体的需求内容
    ...
}
// 韩梅梅开始拉群
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.add(B)
// 韩梅梅发送了需求文档，并@了所有人
hanMeiMei.setState(prd)

```

### Vue数据双向绑定（响应式系统）的实现原理
在 Vue 中，每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新——这是一个典型的观察者模式。  

在vue数据双向绑定的实现逻辑里，有这样三个关键角色:
* observer（监听器）：注意，此 observer 非彼 observer。在我们上节的解析中，observer 作为设计模式中的一个角色，代表“订阅者”。但在Vue数据双向绑定的角色结构里，所谓的 observer 不仅是一个数据监听器，它还需要对监听到的数据进行**转发**——也就是说它**同时还是一个发布者**。
* watcher（订阅者）：observer 把数据转发给了**真正的订阅者**——watcher对象。watcher 接收到新的数据后，会去更新视图。
* compile（编译器）：MVVM 框架特有的角色，负责对每个节点元素指令进行扫描和解析，指令的数据初始化、订阅者的创建这些“杂活”也归它管~  

[![](https://i.loli.net/2019/10/19/WpkFM7utvgj8CS5.png)](https://i.loli.net/2019/10/19/WpkFM7utvgj8CS5.png)  

#### 核心代码
**实现observer**  

首先我们需要实现一个方法，这个方法会对需要监听的数据对象进行遍历、给它的属性加上定制的 getter 和 setter 函数。这样但凡这个对象的某个属性发生了改变，就会触发 setter 函数，进而通知到订阅者。这个 setter 函数，就是我们的监听器：

```js
// observe方法遍历并包装对象属性
function observe(target) {
    // 若target是一个对象，则遍历它
    if(target && typeof target === 'object') {
        Object.keys(target).forEach((key)=> {
            // defineReactive方法会给目标属性装上“监听器”
            defineReactive(target, key, target[key])
        })
    }
}

// 定义defineReactive方法
function defineReactive(target, key, val) {
    // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
    observe(val)
    // 为当前属性安装监听器
    Object.defineProperty(target, key, {
         // 可枚举
        enumerable: true,
        // 不可配置
        configurable: false, 
        get: function () {
            return val;
        },
        // 监听器函数
        set: function (value) {
            console.log(`${target}属性的${key}属性从${val}值变成了了${value}`)
            val = value
        }
    });
}

```  

**实现订阅者 Dep**  

```js
// 定义订阅者类Dep
class Dep {
    constructor() {
        // 初始化订阅队列
        this.subs = []
    }
    
    // 增加订阅者
    addSub(sub) {
        this.subs.push(sub)
    }
    
    // 通知订阅者（是不是所有的代码都似曾相识？）
    notify() {
        this.subs.forEach((sub)=>{
            sub.update()
        })
    }
}

```  

现在我们可以改写 defineReactive 中的 setter 方法，在监听器里去通知订阅者了：  

```js
function defineReactive(target, key, val) {
    const dep = new Dep()
    // 监听当前属性
    observe(val)
    Object.defineProperty(target, key, {
        set: (value) => {
            // 通知所有订阅者
            dep.notify()
        }
    })
}

```

### Event Bus
Event Bus/Event Emitter 作为全局事件总线，它起到的是一个沟通桥梁的作用。我们可以把它理解为一个事件中心，我们所有事件的订阅/发布都不能由订阅方和发布方“私下沟通”，必须要委托这个事件中心帮我们实现。
```js
class EventEmitter {
  constructor() {
    // handlers是一个map，用于存储事件与回调之间的对应关系
    this.handlers = {}
  }

  // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
  on(eventName, cb) {
    // 先检查一下目标事件名有没有对应的监听函数队列
    if (!this.handlers[eventName]) {
      // 如果没有，那么首先初始化一个监听函数队列
      this.handlers[eventName] = []
    }

    // 把回调函数推入目标事件的监听函数队列里去
    this.handlers[eventName].push(cb)
  }

  // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.handlers[eventName]) {
      // 如果有，则逐个调用队列里的回调函数
      this.handlers[eventName].forEach((callback) => {
        callback(...args)
      })
    }
  }

  // 移除某个事件回调队列里的指定回调函数
  off(eventName, cb) {
    const callbacks = this.handlers[eventName]
    const index = callbacks.indexOf(cb)
    if (index !== -1) {
      callbacks.splice(index, 1)
    }
  }

  // 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb.apply(...args)
      this.off(eventName, cb)
    }
    this.on(eventName, wrapper)
  }
}

```

### 观察者模式与订阅-发布的区别
观察者模式和发布-订阅模式之间的区别，在于是否存在第三方、发布者能否直接感知订阅者  

* 在实际开发中，我们的模块解耦诉求并非总是需要它们完全解耦
* 如果两个模块之间本身存在关联，且这种关联是稳定的、必要的，那么我们使用观察者模式就足够了
* 而在模块与模块之间独立性较强、且没有必要单纯为了数据通信而强行为两者制造依赖的情况下，我们往往会倾向于使用发布-订阅模式。


## 迭代器模式
迭代器模式提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示  

### 远古的迭代器
当我们遍历节点类型时，会报错
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>事件代理</title>
</head>
<body>
    <a href="#">链接1号</a>
    <a href="#">链接2号</a>
    <a href="#">链接3号</a>
    <a href="#">链接4号</a>
    <a href="#">链接5号</a>
    <a href="#">链接6号</a>
</body>
<script>
const aNodes = document.getElementsByTagName('a')
console.log('aNodes are', aNodes)
aNodes.forEach((aNode, index){ // error: after argument list
    console.log(aNode, index)
})
</script>
</html>

```

### es6的迭代器
在之前的版本中，JS原生的集合类型数据结构，只有Array（数组）和Object（对象） 
而ES6中，又新增了Map和Set 
四种数据结构各自有着自己特别的内部实现，但我们仍期待以同样的一套规则去遍历它们 
以ES6在推出新数据结构的同时也推出了一套`统一的接口机制`——迭代器（Iterator） 

ES6约定，任何数据结构只要具备Symbol.iterator属性（这个属性就是Iterator的具体实现，它本质上是当前数据结构默认的迭代器生成函数），就可以被遍历——准确地说，是被for...of...循环和迭代器的next方法遍历。 事实上，for...of...的背后正是对next方法的反复调用。  

使用迭代器，可以对nodeList节点遍历
```js
const aNodes = document.getElementsByTagName('a')[Symbol.iterator]()
// 初始化一个迭代结果
let now = { done: false }

// 循环往外迭代成员
while(!now.done) {
    now = aNodes.next()
    if(!now.done) {
        console.log(`现在遍历到了${now.value}`)
    }
}

```

### 实现一个迭代器
使用生成器实现一个迭代器函数
```js
// 定义生成器函数，入参是任意集合
function iteratorGenerator(list) {
    // idx记录当前访问的索引
    var idx = 0
    // len记录传入集合的长度
    var len = list.length
    return {
        // 自定义next方法
        next: function() {
            // 如果索引还没有超出集合长度，done为false
            var done = idx >= len
            // 如果done为false，则可以继续取值
            var value = !done ? list[idx++] : undefined
            
            // 将当前值与遍历是否完毕（done）返回
            return {
                done: done,
                value: value
            }
        }
    }
}

var iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手'])
iterator.next()
iterator.next()
iterator.next()


```



















































































































[toc]