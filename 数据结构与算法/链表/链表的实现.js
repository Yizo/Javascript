/**
 * 链表中的内部节点类
 */
class Node {
  /**
   * @param {any} data 当前节点数据
   * @param {Object} next 指向下一个节点 
   */
  constructor(data, next = null) {
    this.data = data
    this.next = next
  }
}

/**
 * 链表结构类
 */
class LinkedList {

  /**
   * @public head 链表的头部
   * @public length 链表的长度
   */
  constructor() {
    this.head = null
    this.length = 0
  }

  /**
   * 位置判断: 数字是否为正整数，是否超出链表长度
   * 
   * 返回true为不通过
   * 
   * @param {Number} position 插入或删除的位置
   * @return {Boolean}
   */
  isInteger(position) {
    return (
      !Number.isInteger(position) || position < 0 || position > this.length
    )
  }

  /**
   * 向尾部添加一个元素
   * @param {*} element
   */
  append(element) {
    // 创建新节点
    let newNode = new Node(element)

    // 判断添加的是否为第一个节点
    if (this.head === null) {
      this.head = newNode
    } else {
      let current = this.head

      // 找到最后一个节点
      while (current.next) {
        current = current.next
      }

      // 把最后节点的next指向新的节点
      current.next = newNode
    }

    // 节点长度加1
    this.length++
  }

  /**
   * 向列表的特定位置插入一个元素
   * @param {Number} position 插入的位置
   * @param {*} element 插入的元素
   * @return {Boolean} true: 插入成功，false: 插入失败
   */
  insert(position, element) {

    if (this.isInteger(position)) {
      return false
    }

    // 创建新的节点
    let newNode = new Node(element)

    // 如果插入的位置是第一个
    if (position == 0) {
      newNode.next = this.head
      this.head = newNode
    } else {

      let index = 0

      // 插入位置的后一个节点
      let current = this.head

      // 插入位置的前一个节点
      let previous = null

      while (index++ < position) {
        previous = current
        current = current.next
      }

      // newNode的左边
      previous.next = newNode
      // newNode的右边
      newNode.next = current
    }

    this.length++

    return true

  }

  /**
   * 获取对应位置的元素,找到返回元素，否则返回null
   * @param {Number} position 元素索引
   * @return {*}
   */
  get(position) {
    // 最多只能获取到length - 1 的位置
    if (position < 0 || position >= this.length) {
      return null
    }

    let index = 0;
    let current = this.head
    while (index++ < position) {
      current = current.next
    }
    return current.data
  }

  /**
   * 返回元素在链表中的索引。如果找不到返回-1
   * @param {*} element 元素
   * @return {Number}
   */
  indexOf(element) {
    let index = 0;
    let current = this.head
    while (current) {
      if (JSON.stringify(current.data) == JSON.stringify(element)) {
        return index
      }
      current = current.next
      index += 1
    }
    return -1
  }

  /**
   * 修改某个位置的元素
   * @param {Number} position 修改的位置
   * @param {*} newElement 新元素
   * @return {Boolean}
   */
  update(position, newElement) {
    if (position < 0 || position >= this.length) {
      return false
    }

    let current = this.head
    let index = 0
    while (index++ < position) {
      current = current.next
    }

    current.data = newElement

    return true
  }

  /**
   * 移除一个特定位置的元素
   * @param {Number} position 移除的位置
   * @return {*} 成功: 返回删除的元素，失败: 返回null
   */
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return null
    }

    let current = this.head

    if (position == 0) {
      current = this.head.next
    } else {
      let index = 0
      let previous = null
      while (index++ < position) {
        previous = current
        current = current.next
      }
      // 前一个的next指向新的next
      previous.next = current.next
    }

    this.length--

    return current.data

  }

  /**
   * 从链表中移除一个元素
   * @param {*} element 移除的元素
   * @return {*} 成功: 返回删除的元素，失败: 返回false
   */
  remove(element) {
    let position = this.indexOf(element)
    if (position) {
      return this.removeAt(position)
    } else {
      return false
    }
  }

  /**
   * 如果链表中不包含任何元素，返回true
   * @return {Boolean}
   */
  isEmpty() {
    return this.length == 0
  }

  /**
   * 返回链表包含的元素个数
   * @return {Number}
   */
  size() {
    return this.length
  }

  /**
   * 将链表中所有的元素，以字符串形式输出
   * @returns {String}
   */
  toString() {
    let current = this.head
    let listString = ''

    while (current) {
      listString += current.data + ' '
      current = current.next
    }

    return listString
  }

}


/******************测试************************/

let list = new LinkedList()
list.append({
  a: 1
})
var a = list.insert(1, {
  b: 1
})
console.log(list)

console.log(list.get(1))

console.log(list.indexOf({
  b: 1
}))

console.log(list.update(0, {
  c: 1
}))

console.log(list)

// console.log(list.removeAt(0))
console.log(list.remove({
  b: 1
}))