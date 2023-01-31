class List {

    constructor() {
        this.dataStore = []
        // 列表当前的位置
        this.pos = 0
    }

    /**
     * 返回列表的长度
     * @return {number}
     * */
    get listSize() {
        return this.dataStore.length
    }

    /**
     * 查找元素，返回索引
     * @param {*} element
     * @return {number}
     * */
    find(element) {
        return this.dataStore.findIndex((item) => item === element)
    }

    /**
     * 在列表的末尾添加新元素
     * @param {*} element
     * */
    append(element) {
        this.dataStore.push(element)
    }

    /**
     * 从列表中删除元素
     * @param {*} element
     * @return {boolean}
     * */
    remove(element) {
        const index = this.find(element)
        if(index === -1) {
            return false
        }
        this.dataStore.splice(index, 1)
        return true
    }

    /**
     * 返回列表的字符串形式
     * @return {string}
     * */
    toString() {
        return this.dataStore.toString()
    }

    /**
     * 向现有元素后面添加新元素
     * @param {*} element 添加的元素
     * @param {*} after  被插入的元素
     * @return {boolean}
     * */
    insert(element, after) {
        const index = this.find(after)
        if(index === -1) {
            return false
        }
        this.dataStore.splice(index + 1, 0, element)
    }

    /**
     * 清空列表中所有元素
     * */
    clear() {
        this.dataStore.length = 0
        this.pos = 0
    }

    /**
     * 判断给定值是否在列表中
     * @param {*} element
     * @return {boolean}
     * */
    contains(element) {
        return this.find(element) > -1
    }

    /**
     * 将列表的位置移动到当前第一个元素
     * */
    front() {
        this.pos = 0
    }

    /**
     * 将列表的位置移动到当前最后一个元素
     * */
    end() {
        if(this.listSize !== 0) {
            this.pos = this.listSize - 1
        }
    }

    /**
     * 将当前位置前移一位
     * */
    prev() {
        if(this.pos > 0) {
            this.pos -= 1
        }
    }

    /**
     * 将当前位置后移一位
     * */
    next() {
        if(this.pos < this.listSize) {
            this.pos += 1
        }
    }

    /**
     * 返回列表的当前位置
     * @return {number}
     * */
    currPos() {
        return  this.pos
    }

    /**
     * 将当前位置移动到指定位置
     * @param {number} pos
     * */
    moveTo(pos) {
        this.pos = pos
    }

    /**
     * 返回当前位置的元素
     * @return {*}
     * */
    getElement() {
        return this.dataStore[this.pos]
    }
}

// test
const nams = new List()
nams.append("张三")
nams.append("李四")
nams.append("王五")
nams.insert('赵六', '李四')

console.log(nams.getElement())
nams.next()
console.log(nams.getElement())
nams.next()
console.log(nams.getElement())