## 1.接口的描述
* 接口一方面在面向对象编程中描述为`行为的抽象`, 另一方面可以用来描述`对象的形状`
* 接口是把类中共有的属性和方法抽象出来，用来约束实现该接口的类
* 一个类可以实现多个接口

## 2. 接口vs抽象类
* 抽象类是提供其他继承类的基类，无法被实例化，只能被继承
* 一个类只能继承一个父类，但可以实现多个接口
* 接口中不能包含具体实现，抽象类中除抽象函数之外，还能实现其他方法和初始化属性
* 抽象类的抽象方法必须在子类中实现，子类的构造函数必须调用`super()`
* 抽象类中的抽象方法在子类中必须实现， 接口中的非可选项在接口被调用时必须实现。
* 抽象方法可当做类的实例方法，添加访问修饰符；但是接口不可以  


*总结*: 抽象类本质上是一个无法实例化的类，接口实际上是一种抽象的类型描述  


```js
abstract class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  abstract speak(): void
}
interface Flying {
  fly(): void
}
class Duck extends Animal implements Flying {
  speak() {
    console.log('汪汪汪')
  }
  fly() {
    console.log('我会飞')
  }
}
let duck = new Duck('zhufeng')
duck.speak()
duck.fly()

```

## 3. 接口的继承
一个接口可以继承自另外一个接口
```js
interface Speakable {
  speak(): void
}
interface SpeakChinese extends Speakable {
  speakChinese(): void
}
class Person implements SpeakChinese {
  speak() {
    console.log('Person')
  }
  speakChinese() {
    console.log('speakChinese')
  }
}

```

## 4.readonly
```js
interface Person {
  readonly id: number
  name: string
}
let tom: Person = {
  id: 1,
  name: 'zhufeng'
}
tom.id = 1

```

## 5.函数类型接口
对方法传入的参数和返回值进行约束
```js
interface discount {
  (price: number): number
}
let cost: discount = function(price: number): number {
  return price * 0.8
}

```

## 6.可索引接口
对数组和对象进行约束
```js
// userInterface 表示index的类型是 number，那么值的类型必须是 string
// UserInterface2 表示：index 的类型是 string，那么值的类型必须是 string
interface UserInterface {
  [index: number]: string
}
let arr: UserInterface = ['zfpx1', 'zfpx2']
console.log(arr)

interface UserInterface2 {
  [index: string]: string
}
let obj: UserInterface2 = { name: 'zhufeng' }

```

## 7.类接口
```js
interface Speakable {
  name: string
  speak(words: string): void
}
class Dog implements Speakable {
  name!: string
  speak(words: string) {
    console.log(words)
  }
}
let dog = new Dog()
dog.speak('汪汪汪')

```

## 构造函数的类型
* 在ts中，可以用`interface`来描述类
* 同时也可以用`interface`里特殊的`new`关键字来描述类的构造函数类型

```js
class Animal {
  constructor(public name: string) {}
}
interface WithNameClass {
  new (name: string): Animal
}
function createAnimal(clazz: WithNameClass, name: string) {
  return new clazz(name)
}
let a = createAnimal(Animal, 'zhufeng')
console.log(a.name)

```

[toc]

