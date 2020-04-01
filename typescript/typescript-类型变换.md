## 1. 交叉类型
交叉类型（Intersection Types）表示将多个类型合并为一个类型
```js
interface Bird {
  name: string
  fly(): void
}
interface Person {
  name: string
  talk(): void
}
type BirdPerson = Bird & Person

let p: BirdPerson = {
  name: 'zhufeng',
  fly() {},
  talk() {}
}

p.fly()
p.name
p.talk()

```

## 2. typeof
```js
//先定义变量，再定义类型
let p1 = {
  name: 'zhufeng',
  age: 10,
  gender: 'male'
}
type People = typeof p1
function getName(p: People): string {
  return p.name
}
getName(p1)

```

## 3. 索引访问操作符
可以通过[]获取一个类型的子类型
```js
interface Person {
  name: string
  age: number
  job: {
    name: string
  }
  interests: { name: string; level: number }[]
}
let FrontEndJob: Person['job'] = {
  name: '前端工程师'
}
let interestLevel: Person['interests'][0]['level'] = 2

```

## 4. keyof
索引类型查询操作符
```js
interface Person {
  name: string
  age: number
  gender: 'male' | 'female'
}
//type PersonKey = 'name'|'age'|'gender';
type PersonKey = keyof Person

function getValueByKey(p: Person, key: PersonKey) {
  return p[key]
}
let val = getValueByKey({ name: 'zhufeng', age: 10, gender: 'male' }, 'name')
console.log(val) // zhufeng

```

## 5. 映射类型
在定义的时候用in操作符去批量定义类型中的属性
```js
interface Person {
  name: string
  age: number
  gender: 'male' | 'female'
}
//批量把一个接口中的属性都变成可选的
type PartPerson = {
  [Key in keyof Person]?: Person[Key]
  // name?: string
  // age?:number
  // gender?: 'male' | 'female' 
}

let p1: PartPerson = {}
//也可以使用泛型
type Part<T> = {
  [key in keyof T]?: T[key]
}
let p2: Part<Person> = {}

```

## 6. 内置工具类型
TS 中内置了一些工具类型来帮助我们更好地使用类型系统
### Partial
**将传入的属性由非可选变为可选**
```js
type Partial<T> = { [P in keyof T]?: T[P] }

interface A {
  a1: string
  a2: number
  a3: boolean
}

type aPartial = Partial<A>

const a: aPartial = {} // 不会报错

```

### Required
**将传入的属性中的可选项变为必选项，用了 `-?` 修饰符来实现**
```js
//type Required<T> = { [P in keyof T]-?: T[P] };

interface Person {
  name: string
  age: number
  gender?: 'male' | 'female'
}
/**
 * type Require<T> = { [P in keyof T]-?: T[P] };
 */
let p: Required<Person> = {
  name: 'zhufeng',
  age: 10
  //gender:'male'
}
	
```

### Readonly
为传入的属性每一项都加上 `readonly` 修饰符来实现
```js
interface Person {
  name: string
  age: number
  gender?: 'male' | 'female'
}
//type Readonly<T> = { readonly [P in keyof T]: T[P] };
let p: Readonly<Person> = {
  name: 'zhufeng',
  age: 10,
  gender: 'male'
}
p.age = 11

```

### Pick
帮助我们从传入的属性中摘取某一项返回
```js
interface Animal {
  name: string
  age: number
}
/**
 * From T pick a set of properties K
 * type Pick<T, K extends keyof T> = { [P in K]: T[P] };
 */
// 摘取 Animal 中的 name 属性
type AnimalSub = Pick<Animal, 'name'> //{ name: string; }
let a: AnimalSub = {
  name: 'zhufeng',
  age: 10
}

```

### 映射类型修饰符的控制
* TypeScript中增加了对映射类型修饰符的控制
* 具体而言，一个 readonly 或 ? 修饰符在一个映射类型里可以用前缀 + 或-来表示这个修饰符应该被添加或移除
* TS 中部分内置工具类型就利用了这个特性（Partial、Required、Readonly...），这里我们可以参考 Partial、Required 的实现

## 7. 条件类型
在定义泛型的时候能够添加进逻辑分支，以后泛型更加灵活
### 定义条件类型
```js
interface Fish {
  name: string
}
interface Water {
  name: string
}
interface Bird {
  name: string
}
interface Sky {
  name: string
}
// 三元运算符
// T如果能继承Fish, 那么返回water, 否则返回Sky
type Condition<T> = T extends Fish ? Water : Sky
let condition: Condition<Fish> = { name: '水' }

```

### 条件类型的分发
```js
interface Fish {
  fish: string
}
interface Water {
  water: string
}
interface Bird {
  bird: string
}
interface Sky {
  sky: string
}

type Condition<T> = T extends Fish ? Water : Sky
//(Fish extends Fish ? Water : Sky) | (Bird extends Fish ? Water : Sky)
// Water|Sky
let condition1: Condition<Fish | Bird> = { water: '水' }
let condition2: Condition<Fish | Bird> = { sky: '天空' }

```

### 内置条件类型
TS 在内置了一些常用的条件类型，可以在 [lib.es5.d.ts](https://github.com/Microsoft/TypeScript/blob/c48662c891ce810f5627a0f6a8594049cccceeb5/lib/lib.es5.d.ts#L1291) 中查看  


**Exclude**  

从 T 可分配给的类型中排除 U
```js
// 排除string
type E = Exclude<string | number, string>
let e: E = 10

```  

**Extract**  

从 T 可分配的类型中提取 U
```js
type E = Extract<string | number, string>
let e: E = '1'

```  

**NonNullable**  

从 T 中排除 null 和 undefined
```js
type E = NonNullable<string | number | null | undefined>
let e: E = null

```  

**ReturnType**  

获取函数类型的返回类型
```js
function getUserInfo() {
  return { name: 'zhufeng', age: 10 }
}

// 通过 ReturnType 将 getUserInfo 的返回值类型赋给了 UserInfo
type UserInfo = ReturnType<typeof getUserInfo>

const userA: UserInfo = {
  name: 'zhufeng',
  age: 10
}

```  

**InstanceType**  

获取构造函数类型的实例类型
```js
class Person {
  name: string
  constructor(name) {
    this.name = name
  }
  getName() {
    console.log(this.name)
  }
}

type P = InstanceType<typeof Person>
let p: P = { name: 'zhufeng', getName() {} }

```  

[toc]