## 1.类的定义
```js
class Person{
    name!:string;
    getName():void{
        console.log(this.name)
    }
}
let p1 = new Person()
p1.name = 'zhufeng'
p1.getName()

```

## 2.存取器
- 在typescript中，我们可以通过存取器来改变一个类中属性的读取和赋值行为
- 构造函数
	1. 主要用于初始化类的成员变量属性
	2. 类的对象创建时自动调用执行
	3. 没有返回值  

```js
class User {
    myname:string
	// 参数属性
	// constructor(public myname: string)
    constructor(myname: string) {
        this.myname = myname
    }
    get name() {
        return this.myname
    }
    set name(value) {
        this.myname = value
    }
}

let user = new User('zhufeng')
user.name = 'jiagou'
console.log(user.name)

```

## 3. readonly
- readonly修饰的变量只能在`构造函数`中初始化
- readonly是在`编译`阶段检查,而const是在`运行时`检查

```js
class Animal {
    public readonly name: string
    constructor(name:string) {
        this.name = name
    }
    changeName(name:string){
        this.name = name
    }
}

let a = new Animal('zhufeng')
a.changeName('jiagou')

```

## 4.参数属性
```js
class User {
  constructor(public myname: string) {}
  get name() {
    return this.myname
  }
  set name(value) {
    this.myname = value
  }
}

```

## 5.继承
* 子类继承父类后，子类的实例就拥有了父类的属性和方法
* 将子类公用的方法放在父类中，自己的特殊逻辑放在子类中重写父类的逻辑
* super可以调用父类上的方法和属性
```js
class Person1 {
  name: string //定义实例的属性，默认省略public修饰符
  age: number
  constructor(name: string, age: number) {
    //构造函数
    this.name = name
    this.age = age
  }
  getName(): string {
    return this.name
  }
  setName(name: string): void {
    this.name = name
  }
}
class Student extends Person1 {
  no: number
  constructor(name: string, age: number, no: number) {
    super(name, age)
    this.no = no
  }
  getNo(): number {
    return this.no
  }
}
let s1 = new Student('zfpx', 10, 1)
console.log(s1)

```

## 6.类里的修饰符
 * public: 定义类的公有成员, 任何人都可以访问，如果不写，默认就是public.
 * protected: 定义类的保护成员, 只能在定义类的内部与子类内部访问
 * private: 定义类的私有成员， 只能在定义内的内部访问.  
 
```js
class Father {
  public name: string
  protected age: number
  private money: number
  constructor(name: string, age: number, money: number) {
    //构造函数
    this.name = name
    this.age = age
    this.money = money
  }
  getName(): string {
    return this.name
  }
  setName(name: string): void {
    this.name = name
  }
}
class Child extends Father {
  constructor(name: string, age: number, money: number) {
    super(name, age, money)
  }
  desc() {
    // 编译错误, 属性“money”为私有属性，只能在类“Father”中访问。
    console.log(`${this.name} ${this.age} ${this.money}`)
  }
}

let child = new Child('zfpx', 10, 1000)
console.log(child.name)
console.log(child.age) // 编译错误, 属性“age”受保护，只能在类“Father”及其子类中访问
console.log(child.money) // 编译错误, 属性“money”为私有属性，只能在类“Father”中访问

```

## 7.静态属性, 静态方法
```js
class Father2 {
  static className = 'Father'
  static getClassName() {
    return Father.className
  }
  public name: string
  constructor(name: string) {
    //构造函数
    this.name = name
  }
}
console.log(Father.className)
console.log(Father.getClassName())

```

## 8.抽象类[abstract]
 * 抽象描述一种抽象的概念，无法被实例化，只能被继承
 * 无法创建抽象类的实例
 * 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现  

```js
abstract class Animal3 {
  name: string
  abstract speak()
}
class Cat extends Animal3 {
  speak() {
    console.log('喵喵喵')
  }
}
let cat = new Cat()
cat.speak()

```

## 9.抽象方法
* 抽象类和方法不包含具体实现，必须在子类中实现
* 抽象方法只能出现在抽象类中
* 子类可以对抽象类进行不同的实现
```js
abstract class Animal {
  abstract speak(): void
}
class Dog extends Animal {
  speak() {
    console.log('小狗汪汪汪')
  }
}
class Cat extends Animal {
  speak() {
    console.log('小猫喵喵喵')
  }
}
let dog = new Dog()
let cat = new Cat()
dog.speak()
cat.speak()

```

## 10.重写和重载
* 重写是指子类重写继承自父类中的方法
* 重载是指为同一个函数提供多个类型定义
```js
class Animal {
  speak(word: string): string {
    return '动作叫:' + word
  }
}
class Cat extends Animal {
  speak(word: string): string {
    return '猫叫:' + word
  }
}
let cat = new Cat()
console.log(cat.speak('hello'))

//--------------------------------------------

function double(val: number): number
function double(val: string): string
function double(val: any): any {
  if (typeof val == 'number') {
    return val * 2
  }
  return val + val
}

let r = double(1)
console.log(r)

```

## 11.继承和多态
* 继承：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的方法
* 多态：由继承而产生类相关的不同类，对同一个方法可以有不同的行为
```js
class Animal {
  speak(word: string): string {
    return 'Animal: ' + word
  }
}
class Cat extends Animal {
  speak(word: string): string {
    return 'Cat:' + word
  }
}
class Dog extends Animal {
  speak(word: string): string {
    return 'Dog:' + word
  }
}
let cat = new Cat()
console.log(cat.speak('hello'))
let dog = new Dog()
console.log(dog.speak('hello'))

```


[toc]