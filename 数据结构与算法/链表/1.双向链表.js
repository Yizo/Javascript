class Node {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}
class DoublyLinkedList {

  /**
   * @public head 链表的头部
   * @public tail 链表的尾部
   * @public length 链表的长度
   */
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
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
      this.tail = newNode
    } else {
      // 新节点的上一个位置指向创建前尾节点
      newNode.prev = this.tail
      // 尾节点的next指向新的节点
      this.tail.next = newNode
      // 尾节点更新为新节点
      this.tail = newNode
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

    if (position < 0 || position > this.length) {
      return false
    }

    // 创建新的节点
    let newNode = new Node(element)

    // 如果列表为空
    if (this.length == 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      // 如果插入的位置是第一个
      if (position == 0) {
        // 原来的头节点变尾节点，prev指向新节点
        this.head.prev = newNode
        newNode.next = this.head
        this.tail = newNode
      } else if (position == this.length) {
        // 新节点变尾节点
        newNode.prev = this.tail
        this.tail.next = newNode
        this.tail = newNode
      } else {
        let current = this.head
        let index = 0
        while (index++ < position) {
          current = current.next
        }

        // 修改新节点的指向
        newNode.next = current
        newNode.prev = current.prev
        // 将插入位置的左右节点next,prev指向新节点
        current.prev.next = newNode
        current.prev = newNode

      }

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

    // 大于时从左边查3起，小于时从右边查起
    const isLeft = this.length / 2 > position
    let index = isLeft ? 0 : this.length - 1
    let current = isLeft ? this.head : this.tail

    while (isLeft ? index++ < position : index-- > position) {
      current = isLeft ? current.next : current.prev
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

    // 如果只有一个节点
    if (this.length == 1) {
      this.head = null
      this.tail = null
    } else {
      if (position == 0) {
        // 头节点的next指向第二个节点，将它prev修改为null, 那么第一个节点将失去引用，会被垃圾回收
        this.head.next.prev = null
        // 将头节点修改为第二个节点
        this.head = this.head.next
      } else if (position == this.length) {
        current = this.tail
        // 尾节点的的prev指向倒数第二个节点，即将它的next属性修改为null
        this.tail.prev.next = null
        // 将尾节点修改为倒数第二个节点
        this.tail = this.tail.prev
      } else {
        let index = 0
        while (index++ < position) {
          current = current.next
        }
        // 前一个的节点next指向后一个
        current.prev.next = current.next
        // 后一个节点的prev指向前一个
        current.next.prev = current.prev
      }
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
    return this.backwordString()
  }

  /**
   * 返回反向遍历的节点字符串形式
   * @return {String}
   */
  forwardString() {
    let current = this.tail
    let resultString = ''
    while (current) {
      resultString += JSON.stringify(current.data) + ' '
      current = current.prev
    }
    return resultString
  }

  /**
   * 返回正向遍历的节点字符串形式
   * @return {String}
   */
  backwordString() {
    let current = this.head
    let resultString = ''

    while (current) {
      resultString += JSON.stringify(current.data) + ' '
      current = current.next
    }

    return resultString

  }
}

/*******************测试*******************/
let list = new DoublyLinkedList()
list.append({
  a: 1
})
list.append({
  b: 1
})
list.append({
  c: 1
})

list.insert(1, {
  d: 1
})

console.log(list.get(3))

console.log(list.removeAt(1))