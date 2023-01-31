/**
 * 封装队列元素
 */
class QueueElement {
  constructor(element, priority) {
    this.element = element
    this.priority = priority
  }
}

class PriorityQueue {
  constructor() {
    this.items = []
  }

  /**
   * 向队列尾部添加一个新的项
   * @param {any} element 任意类型的队列元素
   * @param {Number} priority 队列的优先级,数字越大,优先级越大
   */
  enqueue(element, priority) {
    const queueElement = new QueueElement(element, priority)

    if (this.isEmpty()) {
      this.items.push(queueElement)
    } else {
      // 是否添加了
      let added = false
      this.items.forEach((item, index) => {
        if (queueElement.priority < item.priority) {
          this.items.splice(index, 0, queueElement)
          added = true
        }
      })
      if (!added) {
        this.items.push(queueElement)
      }
    }
  }

  /**
   * 移除队列的第一项，并返回被移除的项
   * @return {any} 被移除的项
   */
  dequeue() {
    return this.items.shift()
  }

  /**
   * 查看队列第一项
   * @return {any}
   */
  front() {
    return this.items[0]
  }

  /**
   * 如果队列中不包含任何元素返回true, 否则返回false
   * @return {Boolean}
   */
  isEmpty() {
    return this.size() === 0
  }

  /**
   * 获取队列中元素个数
   * @return {Number}
   */
  size() {
    return this.items.length
  }

  /**
   * 将队列中的内容，转为字符串形式
   * @return {String} 
   */
  toString() {
    return this.items.reduce((prev, current) => {
      return prev += current + ''
    }, '')
  }
}


/*********************验证***************************/
const bq = new PriorityQueue()

bq.enqueue('aaa', 70)
bq.enqueue('ccc', 2)
bq.enqueue('ddd', 100)
bq.enqueue('fff', 89)

console.log(bq.front())
console.log(bq.toString())