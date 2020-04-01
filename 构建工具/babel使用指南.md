## 1. babel是什么？
Babel 是一个工具链，主要用于将 ECMAScript2015+版本的代码转换为向后兼容的 Javascript 代码，以便能够运行在当前和旧版本的浏览器或其他环境中。

## 2. babel 主要功能点
* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
* 源码转换(codemods)
* 更多...

## 3. 使用理念
1. Babel 主要通过 插件 plugins 的形式 达到转换代码的目的。
2. Babel 本身内置了部分环境预设 preset-env,当然项目中 需要根据实际 进行配置。
3. 为了方便书写参数，一般通过 配置文件的方式 babel.config.js(官方推荐) 或者.babelrc.js(以编程的方式创建配置)或者.bablerc

## 4. babel核心模块
### @babel/core
babel编译核心包
### @babel/cli
babel 提供的命令行工具，用于命令行下编译源代码
### babel-loader
webpack中使用babel加载文件
### @babel/plugin-*
babel编译功能实现插件
### @babel/preset-*
* 功能实现插件预设(一个预先设定的插件列表)
* @babel/preset-es2016, @babel/preset-es2017
* @babel/preset-env (这是一个智能预设，只要安装这一个preset，就会根据你设置的目标浏览器，自动将代码中的新特性转换成目标浏览器支持的代码)

### @babel/plugin-transform-runtime
必装生产依赖，提取辅助函数的复用，以引入的方式，而引入需要@babel/runtime
### @babel/runtime
工具函数库, 必装生产依赖，和@babel/plugin-transform-runtime同时存在
### @babel/polyfill
低版本浏览器兼容库, 非必装生产依赖，已不推荐使用 

* babel可以转化一些新的特性，但是对于一些特殊API，新的内置函数，静态方法，实例方法无法解决
* 由core-js2和regenerator-runtime组成
* babel-polyfill会完整模拟一个 ES2015+环境。
* @babel/polyfill体积比较大，整体引入既增加项目体积，又污染了全局命名空间
* 推荐通过preset-env的{useBuiltIns: 'usage'}属性按需引入

### core-js@*
corejs 是一个给低版本的浏览器提供接口的库，也是polyfill功能实现的核心
### @babel/runtime-corejs*
不污染变量的低版本浏览器兼容库, 非必装生产依赖，plugin-transform-runtime设置开启后，可以不污染变量的引入polyfill
### @babel/register
* 源码能在真正在生产环境下运行,不需要babel编译这一环节
* 在入口头部引入`@babel/register`后，可以任意使用es2015的特性
* 坏处是动态编译，导致程序在速度、性能上有所损耗

```js
// 解决高阶语法向低阶语法转化时产生重复辅助函数
// 解决污染全局命名空间
module.exports = function (api) {
    api.cache(true);

    const presets =  [
        ['@babel/preset-env',
            {
            'useBuiltIns': 'usage',
            'targets':{
                'browsers':['> 1%', 'last 2 versions', 'not ie <= 8']
                }
            }
        ]
    ];
    const plugins = [
        ['@babel/plugin-transform-runtime',{corejs:3}]
    ]

    return {
        presets,
        plugins
    };
}
```

[toc]