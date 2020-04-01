
<!-- wp:paragraph -->

<!-- /wp:paragraph -->

<!-- wp:heading {"level":1} -->
<h1>对象</h1>
<!-- /wp:heading -->

<!-- wp:heading -->
<h2>1. 概述</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>什么是对象，其实就是一种类型，即引用类型。而对象的值就是引用类型的实例。在ECMAScript中引用类型是一种数据结构，用于将数据和功能组织在一起。它也常被称做为类，但ECMAScript中却没有这种东西。虽然ECMAScript是一门面向对象的语言，却不具备传统面向对象语言所支持的类和接口等基本结构</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>引用类型细分主要有<code>Object 类型</code>、<code>Array 类型</code>、<code>Date 类型</code>、<code>RegExp 类型</code>、<code>Function 类型</code> 等。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>2. 内置对象</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>Global对象</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>所有在全局作用域定义的变量和函数，都是Global对象的属性和方法。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>URL编码方法<br>encodeURI()不会对本身属于URI的特殊字符进行编码<br>encodeURIComponent()则会对它发现的任何非标准字符进行编码</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>URL解码<br>decodeURI()<br>decodeURIComponent()</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>eval()方法<br>eval()方法主要担当一个字符串解析器的作用，他只接受一个参数，而这个参数就是要执行的JavaScript代码的字符串。<br> <br>Global对象属性<br>Global对象包含了一些属性：undefined、NaN、Object、Array、Function等等。<br>alert(Array);                                                      //返回构造函数<br> <br>window对象<br>之前已经说明，Global没有办法直接访问，而Web浏览器可以使用window对象来实现一全局访问。<br>alert(window.Array);                                    //同上</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Math对象</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>abs(x) 返回数的绝对值 1 2 3 <br>acos(x) 返回数的反余弦值 1 2 3 <br>asin(x) 返回数的反正弦值 1 2 3 <br>atan(x) 以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值 1 2 3 <br>atan2(y,x) 返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间） 1 2 3 <br>ceil(x) 对一个数进行上舍入。 向上取整1 2 3 <br>cos(x) 返回数的余弦 1 2 3 <br>exp(x) 返回 e 的指数。 1 2 3 <br>floor(x) 对一个数进行下舍入。 向下取整1 2 3 <br>log(x) 返回数的自然对数（底为e） 1 2 3 <br>max(x,y) 返回 x 和 y 中的最高值 1 2 3 <br>min(x,y) 返回 x 和 y 中的最低值 1 2 3 <br>pow(x,y) 返回 x 的 y 次幂 1 2 3 <br>random() 返回 0 ~ 1 之间的随机数 1 2 3 <br>round(x) 把一个数四舍五入为最接近的整数 1 2 3 <br>sin(x) 返回数的正弦 1 2 3 <br>sqrt(x) 返回数的平方根 1 2 3 <br>tan(x) 返回一个角的正切 1 2 3 <br>toSource() 代表对象的源代码 1 4 - <br>valueOf() 返回一个 Math 对象的原始值</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>3. 数组操作</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>            sort   对数组进行排序(由大到小)<br>            join  连接数组中的元素.(默认分隔符为，)<br>            concat  合并数组(可以有N个参数)<br>            shift() 将数组第一个元素移除<br>            pop()   将数组最后一个元素移除<br>            unshift() 向数组开头添加元素<br>            push()  向数组末尾添加元素<br>      splice 添加，删除，替换<br>删除：splice(1,1)  删除起索引为1开始，删除1个；<br>添加：splice(1,0,’a’)从索引为1开始，添加a<br>替换：splice(1,1,’a’,’b’)从索引1开始删除1个，插入‘a’,’b’</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>a.splice(2, 3, 2, 'a', 'b') 
// 删除从索引 2 开始的 3 个元素, 
// 并且从索引 2 开始添加 2 元素（'a', 'b'）</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>      reverse()反转元素<br>
</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>4. 时间与日期</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>1.Date.parse(box);   <br>2.Date.UTC(2011，11，1);   </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>相同点：1.都能返回日期的毫秒数<br>2.参数都不能为空<br>不同的：1.前者的参数是一个data对象，或者一个日期格式的字符串<br>后者的参数为年月日具体数值类型,年月是必须，日为可选<br> <br>
</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>4.1 日期格式化方法</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Date类型还有一些专门用于将日期格式化为字符串的方法。<br> <br>varbox = new Date();<br>alert(box.toDateString());                      //以特定的格式显示星期几、月、日和年<br>alert(box.toTimeString());                      //以特定的格式显示时、分、秒和时区<br>alert(box.toLocaleDateString());                     //以特定地区格式显示星期几、月、日和年<br>alert(box.toLocaleTimeString());                    //以特定地区格式显示时、分、秒和时区<br>alert(box.toUTCString());                      //以特定的格式显示完整的UTC日期。<br> <br>
</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>4.2 组件方法</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>alert(box.getTime());                             //获取日期的毫秒数，和valueOf()返回一致<br>alert(box.setTime(100));                               //以毫秒数设置日期，会改变整个日期<br>alert(box.getFullYear());                               //获取四位年份<br>alert(box.setFullYear(2012));                         //设置四位年份，返回的是毫秒数<br>alert(box.getMonth());                                 //获取月份，没指定月份，从0开始算起<br>alert(box.setMonth(11));                              //设置月份<br>alert(box.getDate());                             //获取日期<br>alert(box.setDate(8));                                   //设置日期，返回毫秒数<br>alert(box.getDay());                              //返回星期几，0表示星期日，6表示星期六<br>alert(box.setDay(2));                             //设置星期几<br>alert(box.getHours());                                  //返回时<br>alert(box.setHours(12));                               //设置时<br>alert(box.getMinutes());                               //返回分钟<br>alert(box.setMinutes(22));                      //设置分钟<br>alert(box.getSeconds());                               //返回秒数<br>alert(box.setSeconds(44));                      //设置秒数<br>alert(box.getMilliseconds());                         //返回毫秒数<br>alert(box.setMilliseconds());                         //设置毫秒数<br>alert(box.getTimezoneOffset());               //返回本地时间和UTC时间相差的分钟数</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>5. RegExp</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>5.1 创建正则表达式</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>参数1：匹配字符串;参数2：修饰符，i忽略大小写g全局匹配m多行匹配</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>1.new形式</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><br>var box = new RegExp('box','ig');<br></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>2.字面量形式    </h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><br>var box = /box/ig;</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>5.2 测试正则表达式</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>text() 测速是否匹配,返回true或false</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>exec() <br>功能：在字符串中执行匹配检索,返回结果数组<br>特性：1.使用全局标记g时，持续查找所有匹配项并返回<br>          2.不使用全局标记g时，始终返回第一个匹配项信息<br>执行过程：1.检索字符串参数,获取字符串匹配文本<br>    2.找到匹配文本则返回一个数组<br>a)第0个元素 与整个模式匹配的字符串<br>b)其他元素 与捕获组匹配的字符串<br>                3.否则返回null<br>派生属性:index,input:引用正则表达式的字符串，length；</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>match()<br>找到一个或多个正则表达式的匹配,返回结果数组</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>search()<br>检索与正则表达式相匹配的值，查找到返回位置，否则返回-1</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>replace(box,’Tom’)<br>替换与正则表达式匹配的子串,将box表达式的值替换为Tom</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>split()<br>把字符串分割为字符串数组</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>5.3 RegExp对象的静态属性</h3>
<!-- /wp:heading -->

<!-- wp:table -->
<table class="wp-block-table"><thead><tr><th>属性</th><th>短名</th><th>含义</th></tr></thead><tbody><tr><td>input</td><td>$_</td><td>当前被匹配的字符串</td></tr><tr><td>lastMatch</td><td>$&</td><td>最后一个匹配字符串</td></tr><tr><td>lastParen</td><td>$+</td><td>最后一对圆括号内的匹配子串</td></tr><tr><td>leftContext</td><td>$`</td><td>最后一次匹配前的子串</td></tr><tr><td>multiline</td><td>$*</td><td>用于指定是否所有的表达式都用于多行的布尔值</td></tr><tr><td>rightContext</td><td>$'</td><td>在上次匹配之后的子串</td></tr></tbody></table>
<!-- /wp:table -->

<!-- wp:heading {"level":3} -->
<h3>5.4 RegExp对象的实例属性</h3>
<!-- /wp:heading -->

<!-- wp:table -->
<table class="wp-block-table"><thead><tr><th>属性</th><th>含义</th></tr></thead><tbody><tr><td>global</td><td>Boolean值，表示g是否已设置</td></tr><tr><td>ignoreCase</td><td>Boolean值，表示i是否已设置</td></tr><tr><td>lastIndex</td><td>整数，代表下次匹配将从哪里字符位置开始</td></tr><tr><td>multiline</td><td>Boolean值，表示m是否已设置</td></tr><tr><td>Source</td><td>正则表达式的源字符串形式</td></tr></tbody></table>
<!-- /wp:table -->

<!-- wp:heading {"level":3} -->
<h3>5.5 获取控制</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>    字符类：单个字符和数字</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<table class="wp-block-table"><thead><tr><th>元字符/元符号</th><th>匹配情况</th></tr></thead><tbody><tr><td>.</td><td>匹配除换行符外的任意字符</td></tr><tr><td>[a-z0-9]</td><td>匹配括号中的字符集中的任意字符</td></tr><tr><td>[^a-z0-9]</td><td>匹配任意不在括号中的字符集中的字符</td></tr><tr><td>\d</td><td>匹配数字</td></tr><tr><td>\D</td><td>匹配非数字，同[^0-9]相同</td></tr><tr><td>\w</td><td>匹配字母和数字及_</td></tr><tr><td>\W</td><td>匹配非字母和数字及_ </td></tr></tbody></table>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>字符类：空白字符</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<table class="wp-block-table"><thead><tr><th>元字符/元符号</th><th>匹配情况</th></tr></thead><tbody><tr><td>\0</td><td>匹配null字符</td></tr><tr><td>\b</td><td>匹配空格字符</td></tr><tr><td>\f</td><td>匹配进纸字符</td></tr><tr><td>\n</td><td>匹配换行符</td></tr><tr><td>\r</td><td>匹配回车字符</td></tr><tr><td>\t</td><td>匹配制表符</td></tr><tr><td>\s</td><td>匹配空白字符、空格、制表符和换行符</td></tr><tr><td>\S</td><td>匹配非空白字符</td></tr></tbody></table>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>字符类：锚字符</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<table class="wp-block-table"><thead><tr><th>元字符/元符号</th><th>匹配情况</th></tr></thead><tbody><tr><td>^</td><td>行首匹配</td></tr><tr><td>$</td><td>行尾匹配</td></tr><tr><td>\A</td><td>只有匹配字符串开始处</td></tr><tr><td>\b</td><td>匹配单词边界，词在[]内时无效</td></tr><tr><td>\B</td><td>匹配非单词边界</td></tr><tr><td>\G</td><td>匹配当前搜索的开始位置</td></tr><tr><td>\Z</td><td>匹配字符串结束处或行尾</td></tr><tr><td>\z</td><td>只匹配字符串结束处</td></tr></tbody></table>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p> <br>字符类：重复字符</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<table class="wp-block-table"><thead><tr><th>元字符/元符号</th><th>匹配情况</th></tr></thead><tbody><tr><td>x?</td><td>匹配0个或1个x</td></tr><tr><td>x*</td><td>匹配0个或任意多个x</td></tr><tr><td>x+</td><td>匹配至少一个x</td></tr><tr><td>(xyz)+</td><td>匹配至少一个(xyz)</td></tr><tr><td>x{m,n}</td><td>匹配最少m个、最多n个x </td></tr></tbody></table>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>字符类：替代字符</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<table class="wp-block-table"><thead><tr><th>元字符/元符号</th><th>匹配情况</th></tr></thead><tbody><tr><td>this</td><td>where</td></tr></tbody></table>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>字符类：记录字符</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<table class="wp-block-table"><thead><tr><th>元字符/元符号</th><th>匹配情况</th></tr></thead><tbody><tr><td>(string)</td><td>用于反向引用的分组</td></tr><tr><td>\1或$1</td><td>匹配第一个分组中的内容</td></tr><tr><td>\2或$2</td><td>匹配第二个分组中的内容</td></tr><tr><td>\3或$3</td><td>匹配第三个分组中的内容</td></tr></tbody></table>
<!-- /wp:table -->

<!-- wp:heading {"level":3} -->
<h3>5.6 常用正则</h3>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>//正整数
/^[0-9]*[1-9][0-9]*$/;
//负整数
/^-[0-9]*[1-9][0-9]*$/;
//正浮点数
/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;  
//负浮点数
/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; 
//浮点数
/^(-?\d+)(\.\d+)?$/;
//email地址
/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//url地址
/^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
//年/月/日（年-月-日、年.月.日）
/^(19|20)\d\d- /.- /.$/;
//匹配中文字符
/[\u4e00-\u9fa5]/;
//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
/^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
//匹配空白行的正则表达式
/\n\s*\r/;
//匹配中国邮政编码
/[1-9]\d{5}(?!\d)/;
//匹配身份证
/\d{15}|\d{18}/;
//匹配国内电话号码
/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
//匹配IP地址
/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
//匹配首尾空白字符的正则表达式
/^\s*|\s*$/;
//匹配HTML标记的正则表达式
< (\S*?)[^>]*>.*?|< .*? />
匹配中文字符的正则表达式： [\u4e00-\u9fa5]
匹配双字节字符（包括汉字在内）：[^\x00-\xff]
匹配空行的正则表达式：\n[\s| ]*\r
匹配 HTML 标记的正则表达式：<(.*)>.*<\/\1>|<(.*) \/>
匹配首尾空格的正则表达式：(^\s*)|(\s*$)
匹配 IP 地址的正则表达式：/(\d+)\.(\d+)\.(\d+)\.(\d+)/g
匹配 Email 地址的正则表达式：\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
匹配网址 URL 的正则表达式：http://(/[\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
sql 语句：^(select|drop|delete|create|update|insert).*[        DISCUZ_CODE_39        ]nbsp;
非负整数：^\d+[        DISCUZ_CODE_39        ]nbsp;
正整数：^[0-9]*[1-9][0-9]*[        DISCUZ_CODE_39        ]nbsp;
非正整数：^((-\d+)|(0+))[        DISCUZ_CODE_39        ]nbsp;
负整数：^-[0-9]*[1-9][0-9]*[        DISCUZ_CODE_39        ]nbsp;
整数：^-?\d+[        DISCUZ_CODE_39        ]nbsp;
非负浮点数：^\d+(\.\d+)?[        DISCUZ_CODE_39        ]nbsp;
正浮点数：^((0-9)+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))[        DISCUZ_CODE_39        ]nbsp;
非正浮点数：^((-\d+\.\d+)?)|(0+(\.0+)?))[        DISCUZ_CODE_39        ]nbsp;
英文字符串：^[A-Za-z]+[        DISCUZ_CODE_39        ]nbsp;
英文大写串：^[A-Z]+[        DISCUZ_CODE_39        ]nbsp;
英文小写串：^[a-z]+[        DISCUZ_CODE_39        ]nbsp;
英文字符数字串：^[A-Za-z0-9]+[        DISCUZ_CODE_39        ]nbsp;
英数字加下划线串：^\w+[        DISCUZ_CODE_39        ]nbsp;
E-mail地址：^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+[        DISCUZ_CODE_39        ]nbsp;
URL：^[a-zA-Z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\s*)?$ 或：^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*[        DISCUZ_CODE_39        ]nbsp;
邮政编码：^[1-9]\d{5}[        DISCUZ_CODE_39        ]nbsp;
电话号码：^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?[        DISCUZ_CODE_39        ]nbsp;
手机号码：^((\d2,3)|(\d{3}\-))?13\d{9}[        DISCUZ_CODE_39        ]nbsp;
双字节字符（包括汉字在内）：^\x00-\xff
匹配首尾空格：(^\s*)|(\s*$)
匹配 HTML 标记：<(.*)>.*<\/\1>|<(.*) \/>
匹配空行：\n[\s| ]*\r
提取信息中的网络链接：(h|H)(r|R)(e|E)(f|F) *= *('|") ?
            (\w | \\ | \
            /|\.)+('|"| *|>)?
提取信息中的邮件地址：\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*
提取信息中的图片链接：(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?
提取信息中的 IP 地址：(\d+)\.(\d+)\.(\d+)\.(\d+)
提取信息中的中国手机号码：(86)*0*13\d{9}
提取信息中的中国固定电话号码：(\d3,4|\d{3,4}-|\s)?\d{8}
提取信息中的中国电话号码（包括移动和固定电话）：(\d3,4|\d{3,4}-|\s)?\d{7,14}
提取信息中的中国邮政编码：[1-9]{1}(\d+){5}
提取信息中的浮点数（即小数）：(-?\d*)\.?\d+
提取信息中的任何数字 ：(-?\d*)(\.\d+)?
IP：(\d+)\.(\d+)\.(\d+)\.(\d+)
电话区号：^0\d{2,3}$
腾讯 QQ 号：^[1-9]*[1-9][0-9]*[        DISCUZ_CODE_39        ]nbsp;
帐号（字母开头，允许 5-16 字节，允许字母数字下划线）：^[a-zA-Z][a-zA-Z0-9_]{4,15}[        DISCUZ_CODE_39        ]nbsp;
中文、英文、数字及下划线：^[\u4e00-\u9fa5_a-zA-Z0-9]+$</code></pre>
<!-- /wp:code -->

<!-- wp:heading -->
<h2>6. Function</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>6.1 arguments对象</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>功能：存放实参的列表<br>特效：    1.仅能在函数体内使用<br> 2.带有下标属性,但并非数组<br> 3.函数声明时自动初始化<br>属性：length：获取函数实参的长度<br>           callee:  指向拥有这个arguments对象的函数<br>             caler :     返回调用当前正在执行函数的函数名</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>6.2 this </h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>指向当前作用域下的操作对象</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>6.3 prototype</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>指向函数附带的原型对象<br>函数对象才有prototype属性，普通对象没有prototype属性，但两者都有<em>proto</em>原型链<br>(prototype对象与实例对象之间的连接)<br>实例对象 prototype对象 object对象</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>6.4 constructor     </h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>指向创建该对象的构造函数</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>6.5 函数的属性和方法</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>ECMAScript中的函数是对象，因此函数也有属性和方法。每个函数都包含两个属性：length和prototype。其中，length属性表示函数希望接收的命     名参数的个数。<br> <br>apply()和call()，每个函数都包含这两个非继承而来的方法。这两个方法的用途都在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。<br>call()方法于apply()方法相同，他们的区别仅仅在于接收参数的方式不同。对于call()方法而言，第一个参数是作用域，没有变化，变化只是其余的参数都是直接传递给函数的。<br> <br>事实上，传递参数并不是apply()和call()方法真正的用武之地；它们经常使用的地方是能够扩展函数赖以运行的作用域。</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>varcolor = '红色的';       //或者window.color= '红色的'也行
 
varbox = {
       color : '蓝色的'
};
 
functionsayColor() {
       alert(this.color);
}
 
sayColor();                //作用域在window
 
sayColor.call(this);       //作用域在window
sayColor.call(window);     //作用域在window
sayColor.call(box);        //作用域在box，对象冒充</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3>6.6 继承的实现</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p> 1.继承属性：call();<br> 2.继承方法：</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>A. <strong>拷贝继承</strong></h4>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>//父类复制给子类
function extend(obj1,obj2){
    for (var attr in Ob2) {
            obj1[attr] = obj2[attr];
     }
}</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":4} -->
<h4>B. <strong>类式继承</strong></h4>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>//父类
function Aaa(){
   this.name = '小明';
}
//子类
function Bbb(){
   //子类继承父类的属性
   Aaa.call(this);
}
//子类继承父类方法
var f = function(){};
f.prototype = Aaa.prototype;
Bbb.prototype = new f();
//修正自身构造函数指向
Bbb.prototype.constructor =Bbb;</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":4} -->
<h4>C. <strong>原型继承</strong></h4>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>function clonObj(obj){
   var f = function(){};
   f.prototype = obj;
   return f();
}</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3>6.7 组件写法</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>a)       1.写配置参数(实例对象中的参数)<br>b)       2.写默认参数(父类中的参数)<br>c)       3.配置参数覆盖默认参数<br>d)       4.实现父类中的方法</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>7. 属性描述符</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>defineProperty</h3>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>var myObject = {};
Object.defineProperty( myObject, "a", {
value: 2,
writable: true,
configurable: true,
enumerable: true
} );
myObject.a; // 2</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>它还包含另外三个特性：writable（可写）、enumerable（可枚举）和 configurable（可配置）。<br>
</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>preventExtensions</h3>
<!-- /wp:heading -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>如果你想禁止一个对象添加新属性并且保留已有属性</p></blockquote>
<!-- /wp:quote -->

<!-- wp:code -->
<pre class="wp-block-code"><code>var myObject = {
    a:2
};
Object.preventExtensions( myObject );
myObject.b = 3;</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3>密封</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false。所以，密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性（虽然可以修改属性的值）。</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>冻结</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(..) 并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们的值。这个方法是你可以应用在对象上的级别最高的不可变性，它会禁止对于对象本身及其任意直接属性的修改（不过就像我们之前说过的，这个对象引用的其他对象是不受影响的）。你可以“深度冻结”一个对象，具体方法为，首先在这个对象上调用 Object.freeze(..)，然后遍历它引用的所有对象并在这些对象上调用 Object.freeze(..)。但是一定要小心，因为这样做有可能会在无意中冻结其他（共享）对象。</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>存在性</h3>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>var myObject = {
    a:2
};
("a" in myObject); // true
("b" in myObject); // false
myObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "b" ); // false</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>in操作符会检测属性是否在对象及其原型链(<strong>proto</strong>)中，hasOwnProperty只会检测对象本身，不检测原型链。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>但对于这种情况</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>Object.create(null) === {} // false</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Object.prototype.hasOwnProperty.call(myObject,"a")</p>
<!-- /wp:paragraph -->

<p>[toc]</p>