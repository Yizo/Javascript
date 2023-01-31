class Queue {
  constructor() {
    this.items = []
  }

  /**
   * 向队列尾部添加一个新的项
   * @param {any} element 任意类型 
   */
  enqueue(element) {
    this.items.push(element)
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

/*--------------------------------------------------*/

/**
 * 面试题: 击鼓传花 
 * 
 *    1. 参与者有A，B，C，D，E，F，G; 在第5次淘汰
 * 
 *    2. 第一轮: 数到第5个，找到E，淘汰E;剩下A,B,C,D,F,G
 * 
 *    3. N轮后，如果不满5次，则新的次数从第一开始
 * 
 * @parm {Array} nameList 参与者的列表
 * @parm {Number} num 传几次
 * @return {Number} 返回胜出者的下标 
 */
function passGame(nameList, num) {

  // 1. 创建一个队列结构
  const queue = new Queue()
  const elimitatedList = []

  // 2. 将所有人依次加入到队列
  nameList.forEach(item => {
    queue.enqueue(item)
  })

  // 3. 开始数数字
  while (queue.size() > 1) {

    // 3.1 number之前的让重新放入到队列的末尾
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }

    // 3.2 number对应的人，直接淘汰
    elimitatedList.push(queue.dequeue())
  }

  const endName = queue.front()

  return {
    elimitated: elimitatedList,
    index: nameList.indexOf(endName)
  }

}

const names = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE']
const result = passGame(names, 7)
for (let i = 0; i < result.elimitated.length; i++) {
  console.log(`${result.elimitated[i]}在击鼓传花游戏中被淘汰。`)
}
console.log(`胜利者：${names[result.index]}`)
// CCC在击鼓传花游戏中被淘汰。
// BBB在击鼓传花游戏中被淘汰。
// EEE在击鼓传花游戏中被淘汰。
// DDD在击鼓传花游戏中被淘汰。
// 胜利者：AAA