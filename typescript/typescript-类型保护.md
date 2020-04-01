* 类型保护就是一些`表达式`, 他们在编译的时候就能通过类型信息确保某个作用域内变量的类型
* 类型保护就是能够通过关键字判断出分支中的类型

## 1. typeof类型保护
```js
function double(input: string | number | boolean) {
  if (typeof input === 'string') {
    return input + input
  } else {
    if (typeof input === 'number') {
      return input * 2
    } else {
      return !input
    }
  }
}

```

## 2. instanceof类型保护
```js
class Animal {
  name!: string
}
class Bird extends Animal {
  swing!: number
}
function getName(animal: Animal) {
  if (animal instanceof Bird) {
    console.log(animal.swing)
  } else {
    console.log(animal.name)
  }
}


```

## 3. null保护
如果开启了`strictNullChecks`选项，那么对于可能为null的变量不能调用它上面的方法和属性
```js
function getFirstLetter(s: string | null) {
  //第一种方式是加上null判断
  if (s == null) {
    return ''
  }
  //第二种处理是增加一个或的处理
  s = s || ''
  return s.charAt(0)
}
//它并不能处理一些复杂的判断，需要加非空断言操作符
function getFirstLetter2(s: string | null) {
  function log() {
    console.log(s!.trim())
  }
  s = s || ''
  log()
  return s.charAt(0)
}

```

## 4. 链判断运算符
* 链判运算符是一种先行检查属性是否存在，再尝试访问该属性的运算符，其符号为`?.`
* 如果运算符左侧的操作数?.计算为undefined或null，则表达式求值为undefined。否则，正常触发目标属性访问，方法或函数调用
* 链判断运算符 还处于 stage1 阶段,TS 也暂时不支持
```js
a?.b; //如果a是null/undefined,那么返回undefined，否则返回a.b的值.
a == null ? undefined : a.b;

a?.[x]; //如果a是null/undefined,那么返回undefined，否则返回a[x]的值
a == null ? undefined : a[x];

a?.b(); // 如果a是null/undefined,那么返回undefined
a == null ? undefined : a.b(); //如果a.b不函数的话抛类型错误异常,否则计算a.b()的结果

a?.(); //如果a是null/undefined,那么返回undefined
a == null ? undefined : a(); //如果A不是函数会抛出类型错误
//否则 调用a这个函数

```

## 5. 可辨识的联合类型
* 就是利用联合类型中的共有字段进行类型保护的一种技巧
* 相同字段的不同取值就是可辨识
```js
interface WarningButton {
  class: 'warning'
  text1: '修改'
}
interface DangerButton {
  class: 'danger'
  text2: '删除'
}
type Button = WarningButton | DangerButton
function getButton(button: Button) {
  if (button.class == 'warning') {
    console.log(button.text1)
  }
  if (button.class == 'danger') {
    console.log(button.text2)
  }
}

```

## 6. in操作符
in 操作符可以安全的检查一个对象上是否存在一个属性，它通常也被做为类型保护使用
```js
interface Bird {
  swing: number
}

interface Dog {
  leg: number
}

function getNumber(x: Bird | Dog) {
  if ('swing' in x) {
    return x.swing
  }
  return x.leg
}

```

## 7. 自定义的类型保护
* TypeScript 里的类型保护本质上就是一些表达式，它们会在运行时检查类型信息，以确保在某个作用域里的类型是符合预期的
* 要自定义一个类型保护，只需要简单地为这个类型保护定义一个函数即可，这个函数的返回值是一个类型谓词
* 类型谓词的语法为 `parameterName is Type` 这种形式，其中 `parameterName` 必须是当前函数签名里的一个参数名`
```js
// 仅仅是一个 interface
interface Foo {
  foo: number
  common: string
}

interface Bar {
  bar: number
  common: string
}

// 用户自己定义的类型保护！
function isFoo(arg: Foo | Bar): arg is Foo {
  return (arg as Foo).foo !== undefined
}

// 用户自己定义的类型保护使用用例：
function doStuff(arg: Foo | Bar) {
  if (isFoo(arg)) {
    console.log(arg.foo) // ok
    console.log(arg.bar) // Error
  } else {
    console.log(arg.foo) // Error
    console.log(arg.bar) // ok
  }
}

doStuff({ foo: 123, common: '123' })
doStuff({ bar: 123, common: '123' })

```

[toc]