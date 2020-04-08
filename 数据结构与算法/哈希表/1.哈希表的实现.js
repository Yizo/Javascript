const VALUE_NULL = Symbol(-1)

class HashTable {

  constructor() {
    this.storage = []
    // 当前数组已经存放了多少元素
    this.count = []
    // 数组的长度
    this.limit = 7
  }

  /**
   * 哈希函数
   * 1. 将字符串转成比较大的数字:hashCode
   * 2. 将大的数字hashCode压缩到数组范围之内
   * @param {String} str
   * @param {Number} size 数组大小,最好为质数
   * @return {Number}
   */
  hashFunc(str, size) {
    let hashCode = 0
    for (let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i)
    }
    let index = hashCode % size
    return index
  }

  /**
   * 插入&修改操作
   */
  put(key, value) {
    // 1. 根据key获取对应的index
    let index = this.hashFunc(key, this.limit)

    // 2. 根据index取出对应的bucket
    let buckets = this.storage[index]

    // 3. 判断bucket是否为空
    if (buckets == null) {
      bucket = []
      this.storage[index] = buckets
    }

    // 4. 判断是否为修改数据
    buckets.forEach(bucket => {
      if (bucket[0] === key) {
        bucket[1] = value
        return
      }
    })

    // 5. 进行添加操作
    buckets.push([key, value])
    this.count++

    // 6. 判断是否需要扩容
    if (this.count > this.limit * 0 / 75) {
      this.resize(this.limit * 2)
    }

  }

  /**
   * 获取key对应的数据
   * @param {String} key
   * @return {Null||String}
   */
  get(key) {
    // 1. 根据key获取对应的index
    let index = this.hashFunc(key, this.limit)

    // 2. 根据index取出对应的bucket
    let buckets = this.storage[index]

    // 3. 判断bucket是否为空
    if (bucket == null) {
      return null
    }

    // 4. 有bucket，就进行线性查找
    buckets.forEach(bucket => {
      if (bucket[0] === key) {
        return bucket[1]
      }
    })

    return null

  }

  /**
   * 删除key对应数据
   * @param {String} key
   * @return {Null||String}
   */
  remove(key) {
    // 1. 根据key获取对应的index
    let index = this.hashFunc(key, this.limit)

    // 2. 根据index取出对应的bucket
    let buckets = this.storage[index]

    // 3. 判断bucket是否为空
    if (buckets == null) {
      return null
    }

    // 4. 有bucket，就进行线性查找
    buckets.forEach((bucket, index) => {
      if (bucket[0] === key) {
        buckets.splice(index, 1)
        this.count--

        // 缩小容量
        if (this.limit > 7 && this.count < this.limit * 0.25) {
          this.resize(Math.floor(this.limit / 2))
        }

        return bucket[1]
      }
    })

    return null
  }

  /**
   * 判断哈希表是否为空
   * @return {Boolean}
   */
  isEmpty() {
    return this.count === 0
  }

  /**
   * 获取哈希表的数据个数
   * @return {Number}
   */
  size() {
    return this.count
  }

  /**
   * 哈希表扩容
   */
  resize(newLimit) {
    // 1. 保存旧的数组内容
    let oldStorage = this.storage
    const self = this

    // 2. 重置所有属性
    this.storage = []
    this.count = 0
    this.limit = newLimit

    // 3. 遍历oldStorage所有的bucket
    oldStorage.forEach((bucket) => {
      // 判断bucket是否为null
      if (bucket == null) {
        continue
      }

      // bucket中有数据, 那么将里面的数据重新哈希化插入
      bucket.forEach(item => {
        if (item) {
          self.put(item[0], item[1])
        }
      })

    })
  }
}

/********************测试**************************/
let hashTable = new HashTable()

console.group()
console.log(`%c ${hashTable.hashFunc('function', 5)}`, 'color:red')
console.groupEnd()