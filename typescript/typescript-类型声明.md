* 声明文件可以让我们不需要将JS重构为TS，只需要加上声明文件就可以使用系统
* 类型声明在编译时的检查，编译结果中会被删除
* 使用`declare`关键字声明类型系统，就可以在js中使用ts

## 1. 普通类型声明
```js
// 不是箭头函数
declare const $: (
  selector: string
) => {
  //变量
  click(): void
  width(length: number): void
}
declare let name: string //变量
declare let age: number //变量
declare function getName(): string //方法
declare class Animal {
  name: string
} //类

interface Person {
  //声明接口
  name: string
}

type Student = {
      //声明类型
      name: string
    }
  | 'string'

```

## 2. 外部枚举
* 外部枚举是使用`declare enum`定义的枚举类型
* 外部枚举用来描述已经存在的枚举类型的形状
```js
declare enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter
}

let seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
]

// 编译结果
var seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
]

```  

加上`const`关键字，变成常量枚举
```js
declare const enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter
}

let seasons = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
]

//编译结果
var seasons = [
    0 /* Spring */,
    1 /* Summer */,
    2 /* Autumn */,
    3 /* Winter */
]

```

## 3. namespace
* 如果一个全局变量包括了很多子属性，可能使用namespace
* 在声明文件中的`namespace`表示一个全局变量包含很多子属性
* 在命名空间内部不需要使用 declare 声明属性或方法
```js
declare namespace $ {
  function ajax(url: string, settings: any): void
  let name: string
  namespace fn {
    function extend(object: any): void
  }
}
$.ajax('/api/users', {})
$.fn.extend({
  log: function(message: any) {
    console.log(message)
  }
})
export {}

```
## 4. 类型声明文件
* 我们可以把类型声明放在一个单独的类型声明文件中
* 可以在类型声明文件中使用类型声明
* 文件命名规范为*.d.ts
* 观看类型声明文件有助于了解库的使用方式
### jquery.d.ts
typings\jquery.d.ts
```js
declare const $:(selector:string)=>{
  click():void
  width(length:number):void
}

```
### tsconfig.json
tsconfig.json
```js
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2015",  
    "outDir":"lib"
  },
  // 包含编译目录
  "include": [
    "src/**/*",
    "typings/**/*"
  ]
}

```

### test.js
```js
$('#button').click()
$('#button').width(100)
export {}

```

## 5. 第三方声明文件
* 可以安装使用第三方的声明文件
* @types是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀
* JavaScript 中有很多内置对象，它们可以在 TypeScript 中被当做声明好了的类型
* 内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准
* 这些内置对象的类型声明文件，就包含在[TypeScript 核心库的类型声明文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中

### 使用jquery
```js
// 对于common.js风格的模块必须使用 import * as 
import * as jQuery from 'jquery'
jQuery.ajax('/user/1')

```

### 安装声明文件
```js
npm i @types/jquery -S

```

### 自己编写声明文件
types\jquery\index.d.ts
```js
declare function jQuery(selector: string): HTMLElement
declare namespace jQuery {
  function ajax(url: string): void
}
export default jQuery

```  

* 如果配置了`paths`,那么在引入包的的时候会自动去`paths`目录里找类型声明文件
* 在 webpack 中，我们可以通过配置 alias 的形式来为项目里的文件做映射。在 `tsconfig.json` 中，我们同样也可以做路径的映射
* 在 tsconfig.json 中，我们通过 `compilerOptions` 里的 `paths` 属性来配置路径映射。   

tsconfig.json
```js
{
"baseUrl": "./",// 使用 paths 属性的话必须要指定 baseUrl 的值
"paths": {
"*":["types/*"]
}

```

### npm 声明文件可能的位置
* node_modules/jquery/package.json
 "types":"types/xxx.d.ts"
* node_modules/jquery/index.d.ts
* node_modules/@types/jquery/index.d.ts

[toc]