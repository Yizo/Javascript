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
        return this.items.shift()
    }

    /**
     * 在双端队列的后端移除新元素
     * */
    removeBack() {
        return this.items.pop()
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
deque.addFront('AAA')
deque.addBack('BBB')
console.log(deque.toString())  // AAABBB
deque.addFront('CCC')
deque.addBack('DDD')
console.log(deque.toString()) // CCCAAABBBDDD
console.log(deque.peekFront()) // CCC
console.log(deque.peekBack()) //  DDD
deque.removeFront()
console.log(deque.toString()) // AAABBBDDD
deque.removeBack()
console.log(deque.toString()) // AAABBB

/**
 * 回文检查
 * @param {string} str
 * @return {boolean}
 * */
function palindromeChecker(str) {
    // 空类型判断
    if (str === undefined || str === null || (str.length === 0)) {
        return false
    }
    let isEqual = true
    let firstChar, lastChar
    const deque = new Deque()
    // 把传入的字符串转小写
    const lowerStr = str.toLowerCase().split('').join('')
    // 遍历字符串，将它添加到双端队列
    for(let i = 0; i < lowerStr.length; i++) {
        deque.addBack(lowerStr.charAt(i))
    }
    // 循环双端队列，比较头部和尾部元素是否相等
    while (deque.size() > 1 && isEqual) {
        firstChar = deque.removeFront()
        lastChar = deque.removeBack()
        // 不相等表示非回文
        if(firstChar !== lastChar) {
            isEqual = false
        }
    }
    return isEqual
}

function palindromeChecker2(str) {
    function reverseString(str) {
        return str.split("").reverse().join("");
    }

    if(str === undefined || str === null || (str.length === 0)) {
        return false
    }

    return str === reverseString(str)
}

console.log(palindromeChecker2('aabbaa'))