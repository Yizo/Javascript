## 1. Window对象
BOM的核心对象是window，它表示浏览器的一个实例。window对象处于JavaScript结构的最顶层，对于每个打开的窗口，系统都会自动为其定义 window 对象。 <br /> ![](https://cdn.nlark.com/yuque/0/2018/jpeg/210193/1542621752317-29aaab67-8d2e-48e0-ac49-38e45220ed98.jpeg#width=747)

### 1.1 window对象的属性

| 属性  | 含义  |
| --- | --- |
| closed | 当窗口关闭时为真  |
| defaultStatus | 窗口底部状态栏显示的默认状态消息  |
| document | 窗口中当前显示的文档对象  |
| frames | 窗口中的框架对象数组  |
| history | 保存有窗口最近加载的URL  |
| length | 窗口中的框架数  |
| location | 当前窗口的URL  |
| name | 窗口名  |
| offscreenBuffering | 用于绘制新窗口内容并在完成后复制已存在的内容，控制屏幕更新  |
| opener | 打开当前窗口的窗口  |
| parent | 指向包含另一个窗口的窗口（由框架使用）  |
| screen | 显示屏幕相关信息，如高度、宽度（以像素为单位）  |
| self | 指示当前窗口。  |
| status | 描述由用户交互导致的状态栏的临时消息  |
| top | 包含特定窗口的最顶层窗口（由框架使用）  |
| window | 指示当前窗口，与self等效  |

### 1.2 window对象的方法

| 方法 | 功能 |
| --- | --- |
| alert(text) | 创建一个警告对话框，显示一条信息 |
| blur() | 将焦点从窗口移除 |
| clearInterval(interval) | 清除之前设置的定时器间隔 |
| clearTimeOut(timer) | 清除之前设置的超时 |
| close() | 关闭窗口 |
| confirm() | 创建一个需要用户确认的对话框 |
| focus() | 将焦点移至窗口 |
| open(url,name,[options]) | 打开一个新窗口并返回新window对象 |
| prompt(text,defaultInput) | 创建一个对话框要求用户输入信息 |
| scroll(x,y) | 在窗口中滚动到一个像素点的位置 |
| setInterval(expression,milliseconds) | 经过指定时间间隔计算一个表达式 |
| setInterval(function,millisenconds,[arguments]) | 经过指定时间间隔后调用一个函数 |
| setTimeout(expression,milliseconds) | 在定时器超过后计算一个表达式 |
| setTimeout(expression,milliseconds,[arguments]) | 在定时器超过时后计算一个函数 |
| print() | 调出打印对话框 |
| find() | 调出查找对话框 |

### 1.3 系统对话框
浏览器通过alert()、confirm()和prompt()方法可以调用系统对话框向用户显示信息。系统对话框与浏览器中显示的网页没有关系，也不包含HTML
```javascript
//弹出警告
alert('Lee');                                                       //直接弹出警告
//确定和取消
confirm('请确定或者取消');                                //这里按哪个都无效             
if(confirm('请确定或者取消')) {                         //confirm本身有返回值
       alert('您按了确定！');                                 //按确定返回true
}else {
       alert('您按了取消！');                                 //按取消返回false
}
 
//输入提示框
varnum = prompt('请输入一个数字', 0);              //两个参数，一个提示，一个值
alert(num);                                                       //返回值可以得到
 
//调出打印及查找对话框
print();                                                             //打印
find();                                                              //查找
```

### 1.4 新建窗口
使用window.open()方法可以导航到一个特定的URL，也可以打开一个新的浏览器窗口。它可以接受四个参数：1.要加载的URL；2.窗口的名称或窗口目标；3.一个特性字符串；4.一个表示新页面是否取代浏览器记录中当前加载页面的布尔值。<br />第三字符串参数

| 设置 | 值 | 说明 |
| --- | --- | --- |
| width | 数值 | 新窗口的宽度。不能小于100 |
| height | 数值 | 新窗口的高度。不能小于100 |
| top | 数值 | 新窗口的Y坐标。不能是负值 |
| left | 数值 | 新窗口的X坐标。不能是负值 |
| location | yes或no | 是否在浏览器窗口中显示地址栏。不同浏览器默认值不同 |
| menubar | yes或no | 是否在浏览器窗口显示菜单栏。默认为no |
| resizable | yes或no | 是否可以通过拖动浏览器窗口的边框改变大小。默认为no |
| scrollbars | yes或no | 如果内容在页面中显示不下，是否允许滚动。默认为no |
| status | yes或no | 是否在浏览器窗口中显示状态栏。默认为no |
| toolbar | yes或no | 是否在浏览器窗口中显示工具栏。默认为no |
| fullscreen | yes或no | 浏览器窗口是否最大化，仅限IE |


## 2. location对象
location是BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location对象是window对象的属性，也是document对象的属性；所以window.location和document.location等效。<br />location对象的属性

| 属性 | 描述的URL内容 |
| --- | --- |
| hash | 如果该部分存在，表示锚点部分 |
| host | 主机名：端口号 |
| hostname | 主机名 |
| href | 整个URL |
| pathname | 路径名 |
| port | 端口号 |
| protocol | 协议部分 |
| search | 查询字符串 |

 <br />location对象的方法

| 方法 | 功能 |
| --- | --- |
| assign() | 跳转到指定页面，与href等效 |
| reload() | 重载当前URL |
| repalce() | 用新的URL替换当前页面 |

## 3. history对象
history对象是window对象的属性，它保存着用户上网的记录，从窗口被打开的那一刻算起。<br />history对象的属性

| 属性 | 描述URL中的哪部分 |
| --- | --- |
| length | history对象中的记录数 |

 <br /> <br />history对象的方法

| 方法 | 功能 |
| --- | --- |
| back() | 前往浏览器历史条目前一个URL，类似后退 |
| forward() | 前往浏览器历史条目下一个URL，类似前进 |
| go(num) | 浏览器在history对象中向前或向后 |

[toc]
