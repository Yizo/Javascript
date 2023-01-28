class Deque {
    constructor() {
        this.items = []
    }
    size() {
        return this.items.length
    }

    isEmpty() {
        return this.size() === 0
    }

    clear() {
        this.items = []
    }

    toString() {
        return this.items.reduce((prev, current) => {
            return prev += current + ''
        }, '')
    }

    /**
     * 在双端队列的前端添加新元素
     * */
    addFront(value) {
        this.items.unshift(value)
    }

    /**
     * 在双端队列的后端添加新元素
     * */
    addBack(value) {
        this.items.push(value)
    }

    /**
     * 在双端队列的前端移除新元素
     * */
    removeFront() {
        this.items.shift()
    }

    /**
     * 在双端队列的后端移除新元素
     * */
    removeBack() {
        this.items.pop()
    }

    /**
     * 返回双端队列前端的第一个元素
     * */
    peekFront() {
        if(this.isEmpty()) {
            return undefined
        }
        return this.items[0]
    }

    /**
     * 返回双端队列后端的第一个元素
     * */
    peekBack() {
        if(this.isEmpty()) {
            return undefined
        }
        return this.items[this.items.length - 1]
    }
}

// test
const deque = new Deque()
console.log(deque.isEmpty())  // true
deque.addBack('AAA')
deque.addBack('BBB')
console.log(deque.toString()) // AAA,BBB
deque.addBack('CCC')
console.log(deque.toString()) // AAA,BBB,CCC
console.log(deque.size())     // 3
deque.removeFront()
console.log(deque.toString()) // BBB,CCC
deque.removeBack()
console.log(deque.toString()) // BBB
deque.addFront('DDD')
console.log(deque.peekFront())// DDD
console.log(deque.peekBack()) // BBB
console.log(deque.toString()) // DDD,BBB