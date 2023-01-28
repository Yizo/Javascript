class Stack {
    constructor() {
        this.count = 0;
        this.items = {}
    }
    push(element) {
        this.items[this.count] = element;
        this.count++
    }
    size() {
        return this.count
    }

    isEmpty() {
        return this.size() === 0
    }

    pop() {
        if(this.isEmpty()) {
            return undefined;
        }
        this.count--
        const result = this.items[this.count];
        Reflect.deleteProperty(this.items, this.count)
        return  result
    }

    peek() {
        return this.items[this.count - 1]
    }

    clear() {
        this.count = 0
        this.items = {}
    }

    toString() {
        if(this.isEmpty()) {
            return ''
        }
        let str = this.items['0']
        for(let i = 1; i < this.count; i++) {
            str = `${str},${this.items[i]}`
        }
        return str
    }
}

// test
const stack = new Stack();
stack.push(1);
stack.push(2)
console.log(stack.size());
stack.push(5)
console.log(stack.toString())
console.log(stack.peek())
stack.push(3)
console.log(stack.pop())
console.log(stack.size())
stack.clear()

console.log(stack.size())

/**
 * 进制转换
 * @param {Number} num 待转换数据
 * @param {Number} base 位数：2-36
 * @return {String}
 * */
function baseConverter(num, base) {
    const stack = new Stack()
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let number = num
    let rem
    let binaryString = ''
    if(!(base >=2 && base <=36)) {
        return ''
    }
    while (number > 0) {
        rem = Math.floor(number % base)
        stack.push(rem)
        number = Math.floor(number / base)
    }
    while (!stack.isEmpty()) {
        binaryString += digits[stack.pop()]
    }

    return binaryString
}

console.log(baseConverter(100, 2))  // 1100100
console.log(baseConverter(100, 8))  // 144
console.log(baseConverter(100, 16)) // 64
console.log(baseConverter(100, 32)) // 34
