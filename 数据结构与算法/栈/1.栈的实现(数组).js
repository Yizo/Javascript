class Stack {
  constructor() {
    this.items = []
  }

  /**
   * 将元素压栈
   * @param {any} element 任意类型 
   */
  push(element) {
    this.items.push(element)
  }

  /**
   * 取出栈中顶部元素
   * @return {any} 返回栈中最顶部的元素
   */
  pop() {
    return this.items.pop()
  }

  /**
   * 查看栈顶元素
   * @return {any}
   */
  peek() {
    return this.items[this.size() - 1]
  }

  /**
   * 判断栈是否为空
   * @return {Boolean}
   */
  isEmpty() {
    return this.size() === 0
  }

  /**
   * 获取栈中元素个数
   * @return {Number}
   */
  size() {
    return this.items.length
  }

  /**
   * 以字符串形式返回栈中所有元素
   * @return {String} 
   */
  toString() {
    return this.items.reduce((prev, current) => {
      return prev += current + ''
    }, '')
  }
  /**
   * 清空栈
   * */
  clear() {
    this.items = []
  }
}

/*----------------------------------------*/

let s = new Stack()
s.push('a')
s.push('b')
s.push(1)

console.log(s.toString())
console.log(s.peek())
console.log(s.isEmpty())

/*----------------------------------------*/

/**
 * 十进制转二进制
 * @param decNumber
 * @return {Number}
 */
function dec2bin(decNumber) {

  const stack = new Stack()
  let binaryString = ''

  while (decNumber > 0) {
    stack.push(decNumber % 2)
    decNumber = Math.floor(decNumber / 2)
  }

  while (!stack.isEmpty()) {
    binaryString += stack.pop()
  }

  return Number(binaryString)

}

console.log(dec2bin(100))

const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: []
        },
        {
          val: 'e',
          children: []
        },
        {
          val: 'f',
          children: []
        }
      ]
    },
    {
      val: 'c',
      children: [
        {
          val: 'g',
          children: []
        },
        {
          val: 'h',
          children: []
        },
        {
          val: 'i',
          children: []
        }
      ]
    }
  ]
}

// 深度优先遍历
function dfs(node) {
  const nodes = []
  if(node) {
    const stack = new Stack()
    stack.push(node)
    while (stack.size()) {
      const item = stack.pop()
      nodes.push(item.val)
      while (item.children && item.children.length) {
        stack.push(item.children.pop())
      }
    }
  }
  return nodes
}