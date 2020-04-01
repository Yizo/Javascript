## performance.timing

| 参数  | 含义  | 默认值  | 备注  |
| :------------ | :------------ | :------------: | :------------: |
| navigationStart  | 前一个网页卸载的时间  | fetchStart  |   |
| uploadEventStart  | 前一个网页的unload事件开始  | 0  |   |
| unloadEventEnd  | 前一个网页的unload事件结束  | 0  |   |
| redirectStart  | 重定向开始时间  | 0  | 需要同域  |
| redirectEnd  | 重定向结束时间  | 0  | 需要同域  |
| fetchStart  | 开始请求网页  |   |   |
| domainLookupStart  | DNS查询开始  | fetchStart  |   |
| domainLookupEnd  | DNS查询结束  | fetchStart  |   |
| connectStart  | 向服务器建立握手开始  |   |   |
| connectEnd  | 向服务器建立握手结束  |   |   |
| secureConnectionStart  | 安全握手开始  | 0  | 非https的没有  |
| requestStart  | 向服务器发送请求开始  |   |   |
| responseStart  | 服务器返回数据开始  |   |   |
| responseEnd  | 服务器返回数据结束  |   |   |
| domLoading  | 解析DOM开始  |   | document.readyState为loading  |
| domInteractive  | 解析DOM结束  |   |  document.readyState为interactive  |
| domContentLoadedEventStart  | DOMContentLoaded事件开始  |   |   |
| domContentLoadedEventEnd  | DOMContentLoaded事件结束  |   |   |
| domComplete  | 文档解析完成  |   |   |
| loadEventStart  | load事件发送前  |   |   |
| loadEventEnd  | load事件发送后  |   |   |

## 性能监控
```js
let isDOMReady = false
let isOnload = false
let cycleTime = 100

let Util = {
  getPerfData: p => {
    let data = {
      // 网路连接
      prevPage: p.fetchStart - p.navigationStart, // 上一个页面的时间
      redirect: p.redirectEnd - p.redirectStart, // 重定向时间
      dns: p.domainLookupEnd - p.domainLookupStart, // dns解析时间
      connect: p.connectEnd - p.connectStart, // tcp连接时间
      networdk: p.connectEnd - p.navigationStart, // 网络总耗时

      // 网络接受
      send: p.responseStart - p.requestStart, // 前端发送请求到接受的时间
      receive: p.responseEnd - p.responseStart, // 接受数据用时
      request: p.responseEnd - p.requestStart, // 请求页面总耗时

      // 前端渲染
      dom: p.domComplete - p.domLoading, // dom解析时间
      loadEvent: p.loadEventEnd - p.loadEventStart, // loadEvent时间
      frontend: p.loadEventEnd - p.domLoading, // 前端总时间

      // 关键阶段
      load: p.loadEventEnd - p.navigationStart, // 页面完全加载的时间
      domRead: p.domContentLoadedEventStart - p.navigationStart, // dom准备时间
      interactive: p.domInteractive - p.navigationStart, // 可操作时间
      ttfb: p.responseStart - p.navigationStart // 首字节时间
    }

    return data
  },
  // dom解析完成
  domReady: callback => {
    if (isDOMReady === true) {
      return false
    }

    let timer = null

    let runCheck = () => {
      if (performance.timing.domComplete) {
        // 1. 停止循环检测 2. 运行calllback
        clearTimeout(timer)
        callback()
        isDOMReady = true
      } else {
        // 再去循环检测
        timer = setTimeout(runCheck, cycleTime)
      }
    }

    if (document.readyState === 'interactive') {
      callback()
      return false
    }

    window.addEventListener('DOMContentLoaded', () => {
      // 开始循环检查， DOMContentLoaded是否完成
      runCheck()
    })
  },
  // 页面加载完成
  onload: callback => {
    if (isOnload === true) {
      return false
    }

    let timer = null

    let runCheck = () => {
      if (performance.timing.loadEventEnd) {
        // 1. 停止循环检测 2. 运行calllback
        clearTimeout(timer)
        callback()
        isOnload = true
      } else {
        // 再去循环检测
        timer = setTimeout(runCheck, cycleTime)
      }
    }

    if (document.readyState === 'interactive') {
      callback()
      return false
    }

    window.addEventListener('DOMContentLoaded', () => {
      // 开始循环检查， DOMContentLoaded是否完成
      runCheck()
    })
  }
}

let performance = window.performance

Util.domReady(() => {
  let perfData = Util.getPerfData(performance.timing)
  perfData.type = 'domReady'
  console.log(perfData)
})

Util.onload(() => {
  let perfData = Util.getPerfData(performance.timing)
  perfData.type = 'onload'
  console.log(perfData)
})


```

[toc]