## 函数的定义
```js
function hello(name: string): void {
  console.log('hello', name)
}
hello('zfpx')
```

## 定义函数类型
```js
type GetUsernameFunction = (x: string, y: string) => string
let getUsername: GetUsernameFunction = function(firstName, lastName) {
  return firstName + lastName
}
```

## 可选参数
```js
function print(name: string, age?: number): void {
  console.log(name, age)
}
print('zfpx')
```

## 默认参数
```js
function ajax(url: string, method: string = 'GET') {
  console.log(url, method)
}
ajax('/users')
```

## 剩余参数
```js
function sum(...numbers: number[]) {
  return numbers.reduce((val, item) => (val += item), 0)
}
console.log(sum(1, 2, 3))
```

## 函数重载
在TypeScript中，表现为给同一个函数提供多个函数类型定义
```js
let obj: any = {}
function attr(val: string): void
function attr(val: number): void
function attr(val: any): void {
  if (typeof val === 'number') {
    obj.age = val
  } else {
    obj.name = val
  }
}
attr('zfpx')
attr(9)
console.log(obj)
```
[toc]