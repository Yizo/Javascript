class Set {
  constructor() {
    this.items = {}
  }

  /**
   * 向集合添加一个新的项
   * @returns {Boolean}
   */
  add(value) {
    if (this.has(value)) {
      return false
    }
    this.items[value] = value
    return true
  }

  /**
   * 从集合移除一个值
   * @returns {Boolean}
   */
  remove(value) {
    if (this.has(value)) {
      return false
    }
    delete this.items[value]
    return true
  }

  /**
   * 如果值在集合中，返回true，否则返回false
   * @returns {Boolean}
   */
  has(value) {
    return this.items.hasOwnProperty(value)
  }

  /**
   * 移除集合中所有的项
   */
  clear() {
    this.items = {}
  }

  /**
   * 返回集合中所有元素的数量
   * @returns {Number}
   */
  size() {
    return Object.keys(this.items).length
  }

  /**
   * 返回一个包含集合中所有值的数组
   * @returns {Array}
   */
  values() {
    return Object.keys(this.items)
  }


  /**
   * 返回两个集合的并集
   * @param {Set} otherSet 
   * @returns {Set}
   */
  union(otherSet) {
    // this: 集合对象A
    // otherSet: 集合对象B

    let unionSet = new Set()
    let values = this.values()

    // 将集合A所有对象添加到新集合
    values.forEach(item => {
      unionSet.add(item)
    })

    // 取出B集合中的元素，判断是否需要加到新的集合
    values = otherSet.values()
    values.forEach(item => {
      unionSet.add(item)
    })

    return unionSet
  }

  /**
   * 两个集合的交集
   * @param {Set} otherSet
   * @returns {Set}
   */
  intersection(otherSet) {
    let intersection = new Set()
    let values = this.values()

    values.forEach(item => {
      // 遍历A, 如果同时在B中存在，那么放入新集合
      if (otherSet.has(item)) {
        intersection.add(item)
      }
    })

    return intersection
  }

  /**
   * 两个集合的差集
   * @param {Set} otherSet
   * @returns {Set}
   */
  difference(otherSet) {
    let intersection = new Set()
    let values = this.values()

    values.forEach(item => {
      // 遍历A, 如果同时在B中存在，那么放入新集合
      if (!otherSet.has(item)) {
        intersection.add(item)
      }
    })

    return intersection
  }

  /**
   * otherSet是否为子集
   * @param {Set} otherSet
   * @returns {Boolean}
   */
  subset(otherSet) {
    let values = this.values()
    values.forEach(item => {
      if (!otherSet.has(item)) {
        return false
      }
    })
    return true
  }

}

/*******************测试***********************/
var setA = new Set()
setA.add('a')
setA.add('b')
setA.add('c')
setA.add('d')
var setB = new Set()
setB.add('a')
setB.add('b')

console.log(setA.subset(setB))