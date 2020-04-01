## 1. 概述
* `offset`: 获取元素的实际显示尺寸
* `scroll`: 获取滚动后全部尺寸
* `client`: 获取不包括滚动条的实际显示尺寸
* `event`: 获取鼠标的坐标位置  

[![](https://i.loli.net/2019/10/19/oGUnf9xR5A8QKEL.gif)](https://i.loli.net/2019/10/19/oGUnf9xR5A8QKEL.gif)


## 2. offset
| 属性  | 说明  |
| :------------ | :------------ |
|  offsetWiht | widht + padding + border  |
|  offsetHeight | Height + padding + border  |
|  offsetRight | 盒子`与有定位的父元素的距离`，不包含border，但包含padding，父元素无定位时为body |


## 3. client
| 属性  | 说明  |
| :------------ | :------------ |
|  clientWidth | 页面可视区域的宽, width + padding  |
|  clientHeight | 页面可视区域的高，height + padding  |  

**标准模式**
document.documentElement.clientWidth  

**怪异模式**
document.body.clientWidth  


## 4. scroll

| 属性  | 说明  |
| :------------ | :------------ |
|  scrollWidth | 检测盒子内容的宽, 不包含border  |
|  scrollHeight | 检测盒子的内容的高，不包括border  |
|  scrollTop | 被卷去的上部部分  |
|  scrollLeft | 被卷去的左部部分  |


## 5. event
| 属性  | 说明  |
| :------------ | :------------ |
| bubbles  | 是否为冒泡类型  |
| button  |  鼠标哪一个按钮被点击 |
| pageX/pageY  | 相对body，鼠标的坐标  |
| screenX/screenY  | 相对浏览器，鼠标的坐标  |
| clientX/clientY  | 相对浏览器的可视区域，鼠标的坐标  |
| target  | 事件发生的源头  |
| type  | 事件类型  |


[toc]




