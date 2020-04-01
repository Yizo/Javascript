### 1. 判断数据类型

```javascript
function type(o) {
	var s = Object.prototype.toString.call(o);
	return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}
```
<a name="W3zn2"></a>
### [](#W3zn2)2. 获取对象的属性

```javascript
Object.prototype.allAttr = function () {
	var attrs = [];
	for (var i in this) {
		if (this.hasOwnProperty(i)) {
			if (type(this[i]) == "string") {
				attrs.push(i);
			}
		}
	}
	return attrs;
}
```

<a name="xgymnq"></a>
### [](#xgymnq)3. 对象转字符串

```javascript
function serialize(data) {
	if (!data) return '';
	var pairs = [];
	for (var name in data) {
		if (!data.hasOwnProperty(name)) continue;
		if (typeof data[name] === 'function') continue;
		var value = data[name].toString();
		name = encodeURIComponent(name);
		value = encodeURIComponent(value);
		pairs.push(name + '=' + value);
	}
	return pairs.join('&');
}
```

<a name="keqlxt"></a>
### [](#keqlxt)4. Cookit转对象

```javascript
function getcookie() {
	var cookie = {};
	var all = document.cookie;
	if (all === '') return cookie;
	var list = all.split('; ');
	for (var i = 0, len = list.length; i < len; i++) {
		var item = list[i];
		var p = item.indexOf('=');
		var name = item.substring(0, p);
		name = decodeURIComponent(name);
		var value = item.substring(p + 1);
		value = decodeURIComponent(value);
		cookie[name] = value;
	}
	return cookie;
}
```

<a name="i7fmud"></a>
### [](#i7fmud)5. ajax封装

```javascript
/*
 *author: Ivan
 *date: 2014.06.01
 *参数说明：
 *opts: {'可选参数'}
 **method: 请求方式:GET/POST,默认值:'GET';
 **url:    发送请求的地址, 默认值: 当前页地址;
 **data: string,json;
 **async: 是否异步:true/false,默认值:true;
 **cache: 是否缓存：true/false,默认值:true;
 **contentType: HTTP头信息，默认值：'application/x-www-form-urlencoded';
 **success: 请求成功后的回调函数;
 **error: 请求失败后的回调函数;
 */
function ajax(opts) {
	//一.设置默认参数
	var defaults = {
		method: 'GET',
		url: '',
		data: '',
		async: true,
		cache: true,
		contentType: 'application/x-www-form-urlencoded',
		success: function () {},
		error: function () {}
	};

	//二.用户参数覆盖默认参数    
	for (var key in opts) {
		defaults[key] = opts[key];
	}

	//三.对数据进行处理
	if (typeof defaults.data === 'object') { //处理 data
		var str = '';
		for (var key in defaults.data) {
			str += key + '=' + defaults.data[key] + '&';
		}
		defaults.data = str.substring(0, str.length - 1);
	}

	defaults.method = defaults.method.toUpperCase(); //处理 method

	defaults.cache = defaults.cache ? '' : '&' + new Date().getTime(); //处理 cache

	if (defaults.method === 'GET' && (defaults.data || defaults.cache)) defaults.url += '?' + defaults.data +
			defaults.cache; //处理 url    

	//四.开始编写ajax
	//1.创建ajax对象
	var oXhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	//2.和服务器建立联系，告诉服务器你要取什么文件
	oXhr.open(defaults.method, defaults.url, defaults.async);
	//3.发送请求
	if (defaults.method === 'GET')
		oXhr.send(null);
	else {
		oXhr.send(defaults.data);
	}
	//4.等待服务器回应
	oXhr.onreadystatechange = function () {
		if (oXhr.readyState === 4) {
			if (oXhr.status === 200)
				defaults.success.call(oXhr, oXhr.responseText);
			else {
				defaults.error();
			}
		}
	};
}
```

<a name="day5gx"></a>
### [](#day5gx)6. 字符串长度截取

```javascript
function cutstr(str, len) {
	var temp;
	var icount = 0;
	var patrn = /[^\x00-\xff]/;
	var strre = "";
	for (var i = 0; i < str.length; i++) {
		if (icount < len - 1) {
			temp = str.substr(i, 1);
			if (patrn.exec(temp) == null) {
				icount = icount + 1
			} else {
				icount = icount + 2
			}
			strre += temp
		} else {
			break
		}
	}
	return strre + "..."
}
```

<a name="e4snog"></a>
### [](#e4snog)7. 获取域名主机

```javascript
function getHost(url) {
	var host = "null";
	if (typeof url == "undefined" || null == url) {
		url = window.location.href;
	}
	var regex = /^\w+\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if (typeof match != "undefined" && null != match) {
		host = match[1];
	}
	return host;
}
```

<a name="1r5foa"></a>
### [](#1r5foa)8. 清除空格

```javascript
String.prototype.trim = function () {
	var reExtraSpace = /^\s*(.*?)\s+$/;
	return this.replace(reExtraSpace, "$1")
}
```

<a name="3znaic"></a>
### [](#3znaic)9. 替换全部

```javascript
String.prototype.replaceAll = function (s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2)
}
```

<a name="udd5at"></a>
### [](#udd5at)10. 转义html标签

```javascript
function HtmlEncode(text) {
	return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>')
}
```


<a name="7aa6ni"></a>
### [](#7aa6ni)11. 时间日期格式转换

```javascript
Date.prototype.Format = function (formatStr) {
	var str = formatStr;
	var Week = ['日', '一', '二', '三', '四', '五', '六'];
	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() %
		100));
	str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() +
		1));
	str = str.replace(/M/g, (this.getMonth() + 1));
	str = str.replace(/w|W/g, Week[this.getDay()]);
	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());
	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());
	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());
	return str
}
```

<a name="0kxoov"></a>
### [](#0kxoov)12. 判断是否为数字类型

```javascript
function isDigit(value) {
	var patrn = /^[0-9]*$/;
	if (patrn.exec(value) == null || value == "") {
		return false
	} else {
		return true
	}
}
```

<a name="0xgqge"></a>
### [](#0xgqge)13. 设置cookie值

```javascript
function setCookie(name, value, Hours) {
	var d = new Date();
	var offset = 8;
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	var nd = utc + (3600000 * offset);
	var exp = new Date(nd);
	exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
}
```

<a name="wexgyo"></a>
### [](#wexgyo)14. 获取cookie值

```javascript
function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) return unescape(arr[2]);
	return null
}
```

<a name="co19cr"></a>
### [](#co19cr)15.  加入收藏夹

```javascript
function AddFavorite(sURL, sTitle) {
	try {
		window.external.addFavorite(sURL, sTitle)
	} catch (e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "")
		} catch (e) {
			alert("加入收藏失败，请使用Ctrl+D进行添加")
		}
	}
}
```

<a name="hhdgnw"></a>
### [](#hhdgnw)16. 设为首页

```javascript
function setHomepage() {
	if (document.all) {
		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage('http://www.jq-school.com')
	} else if (window.sidebar) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
			} catch (e) {
				alert(
					"该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
			}
		}
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
		prefs.setCharPref('browser.startup.homepage', 'http://www.jq-school.com')
	}
}
```

<a name="gy10nt"></a>
### [](#gy10nt)17. 判断IE6

```javascript
var ua = navigator.userAgent.toLowerCase();
var isIE6 = ua.indexOf("msie 6") > -1;
if (isIE6) {
	try {
		document.execCommand("BackgroundImageCache", false, true)
	} catch (e) {}
}
```

<a name="9ysopg"></a>
### [](#9ysopg)18. 加载样式文件

```javascript
function LoadStyle(url) {
	try {
		document.createStyleSheet(url)
	} catch (e) {
		var cssLink = document.createElement('link');
		cssLink.rel = 'stylesheet';
		cssLink.type = 'text/css';
		cssLink.href = url;
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(cssLink)
	}
}
```

<a name="hc8pga"></a>
### [](#hc8pga)19. 返回脚本内容

```javascript
function evalscript(s) {
	if (s.indexOf('<script') == -1) return s;
	var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
	var arr = [];
	while (arr = p.exec(s)) {
		var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
		var arr1 = [];
		arr1 = p1.exec(arr[0]);
		if (arr1) {
			appendscript(arr1[1], '', arr1[2], arr1[3]);
		} else {
			p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
			arr1 = p1.exec(arr[0]);
			appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
		}
	}
	return s;
}
```

<a name="bzw2hk"></a>
### [](#bzw2hk)20. 清除脚本内容

```javascript
function stripscript(s) {
	return s.replace(/<script.*?>.*?<\/script>/ig, '');
}
```

<a name="w3l6xh"></a>
### [](#w3l6xh)21. 动态加载脚本文件

```javascript
function appendscript(src, text, reload, charset) {
	var id = hash(src + text);
	if (!reload && in_array(id, evalscripts)) return;
	if (reload && $(id)) {
		$(id).parentNode.removeChild($(id));
	}

	evalscripts.push(id);
	var scriptNode = document.createElement("script");
	scriptNode.type = "text/javascript";
	scriptNode.id = id;
	scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
	try {
		if (src) {
			scriptNode.src = src;
			scriptNode.onloadDone = false;
			scriptNode.onload = function () {
				scriptNode.onloadDone = true;
				JSLOADED[src] = 1;
			};
			scriptNode.onreadystatechange = function () {
				if ((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
					scriptNode.onloadDone = true;
					JSLOADED[src] = 1;
				}
			};
		} else if (text) {
			scriptNode.text = text;
		}
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	} catch (e) {}
}
```

<a name="lmtgub"></a>
### [](#lmtgub)22. 返回按ID检索的元素对象

```javascript
function $(id) {
	return !id ? null : document.getElementById(id);
}
```

<a name="g300yr"></a>
### [](#g300yr)23. 返回浏览器版本内容

```javascript
function browserVersion(types) {
	var other = 1;
	for (i in types) {
		var v = types < i > ? types < i > : i;
		if (USERAGENT.indexOf(v) != -1) {
			var re = new RegExp(v + '(\\/|\\s)([\\d\\.]+)', 'ig');
			var matches = re.exec(USERAGENT);
			var ver = matches != null ? matches[2] : 0;
			other = ver !== 0 && v != 'mozilla' ? 0 : other;
		} else {
			var ver = 0;
		}
		eval('BROWSER.' + i + '= ver');
	}
	BROWSER.other = other;
}
```

<a name="pd46si"></a>
### [](#pd46si)24. 元素显示的通用方法

```javascript
function $(id) {
	return !id ? null : document.getElementById(id);
}
function display(id) {
	var obj = $(id);
	if (obj.style.visibility) {
		obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';
	} else {
		obj.style.display = obj.style.display == '' ? 'none' : '';
	}
}
```

<a name="lug2ns"></a>
### [](#lug2ns)25. 原生insertAfter

```javascript
function insertAfter(newChild, refChild) {
	var parElem = refChild.parentNode;
	if (parElem.lastChild == refChild) {
		refChild.appendChild(newChild);
	} else {
		parElem.insertBefore(newChild, refChild.nextSibling);
	}
}
```

<a name="hzcxhg"></a>
### [](#hzcxhg)26. 兼容浏览器绑定元素事件

```javascript
function addEventSamp(obj, evt, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + evt, fn);
	}
}
```

<a name="1d37yu"></a>
### [](#1d37yu)27. 光标停在文字的后面，文本框获得焦点时调用

```javascript
function focusLast() {
	var e = event.srcElement;
	var r = e.createTextRange();
	r.moveStart('character', e.value.length);
	r.collapse(true);
	r.select();
}
```

<a name="3vb9pl"></a>
### [](#3vb9pl)28. 检验URL链接是否有效

```javascript
function getUrlState(URL) {
	var xmlhttp = new ActiveXObject("microsoft.xmlhttp");
	xmlhttp.Open("GET", URL, false);
	try {
		xmlhttp.Send();
	} catch (e) {} finally {
		var result = xmlhttp.responseText;
		if (result) {
			if (xmlhttp.Status == 200) {
				return (true);
			} else {
				return (false);
			}
		} else {
			return (false);
		}
	}
}
```

<a name="s8ziyv"></a>
### [](#s8ziyv)29. 格式化CSS样式代码

```javascript
function formatCss(s) { //格式化代码 
	s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
	s = s.replace(/;\s*;/g, ";"); //清除连续分号 
	s = s.replace(/\,[\s\.\#\d]*{/g, "{");
	s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
	s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
	s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
	return s;
}
```

<a name="el63zg"></a>
### [](#el63zg)30. 压缩CSS样式代码

```javascript
function yasuoCss(s) { //压缩代码 
	s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释 
	s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
	s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //容错处理 
	s = s.replace(/;\s*;/g, ";"); //清除连续分号 
	s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白 
	return (s == null) ? "" : s[1];
}
```

<a name="4ytnng"></a>
### [](#4ytnng)31. 获取当前路径

```javascript
var currentPageUrl = "";
if (typeof this.href === "undefined") {
	currentPageUrl = document.location.toString().toLowerCase();
} else {
	currentPageUrl = this.href.toString().toLowerCase();
}
```

<a name="7vydzt"></a>
### [](#7vydzt)32. IP转成整型

```javascript
function _ip2int(ip) {
	var num = 0;
	ip = ip.split(".");
	num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
	num = num >>> 0;
	return num;
}
```

<a name="urb5bu"></a>
### [](#urb5bu)33. 整型解析为IP地址

```javascript
function _int2iP(num) {
	var str;
	var tt = new Array();
	tt[0] = (num >>> 24) >>> 0;
	tt[1] = ((num << 8) >>> 24) >>> 0;
	tt[2] = (num << 16) >>> 24;
	tt[3] = (num << 24) >>> 24;
	str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
	return str;
}
```

<a name="wo4ocz"></a>
### [](#wo4ocz)34. 实现checkbox全选与全不选

```javascript
function checkAll() {
	var selectall = document.getElementById("selectall");
	var allbox = document.getElementsByName("allbox");
	if (selectall.checked) {
		for (var i = 0; i < allbox.length; i++) {
			allbox.checked = true;
		}
	} else {
		for (var i = 0; i < allbox.length; i++) {
			allbox.checked = false;
		}
	}
}
```

<a name="lvliov"></a>
### [](#lvliov)35. 判断是否移动设备

```javascript
function isMobile() {
	if (typeof this._isMobile === 'boolean') {
		return this._isMobile;
	}
	var screenWidth = this.getScreenWidth();
	var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
	var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
	if (!fixViewPortsExperiment) {
		if (!this.isAppleMobileDevice()) {
			screenWidth = screenWidth / window.devicePixelRatio;
		}
	}
	var isMobileScreenSize = screenWidth < 600;
	var isMobileUserAgent = false;
	this._isMobile = isMobileScreenSize && this.isTouchScreen();
	return this._isMobile;
}
```

<a name="y1yhuy"></a>
### [](#y1yhuy)36. 判断是否移动设备访问

```javascript
function isAppleMobileDevice() {
	return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
}
```

<a name="vgs7ma"></a>
### [](#vgs7ma)37. 判断是否苹果移动设备访问

```javascript
function isAppleMobileDevice() {
	return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
}
```

<a name="ecdbms"></a>
### [](#ecdbms)38. 判断是否安卓移动设备访问

```javascript
function isAndroidMobileDevice() {
	return (/android/i.test(navigator.userAgent.toLowerCase()));
}
```

<a name="7lr4pb"></a>
### [](#7lr4pb)39. 判断是否Touch屏幕

```javascript
function isTouchScreen() {
	return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
}
```

<a name="re37mg"></a>
### [](#re37mg)40. 判断是否在安卓上的谷歌浏览器

```javascript
function isNewChromeOnAndroid() {
	if (this.isAndroidMobileDevice()) {
		var userAgent = navigator.userAgent.toLowerCase();
		if ((/chrome/i.test(userAgent))) {
			var parts = userAgent.split('chrome/');
			var fullVersionString = parts[1].split(" ")[0];
			var versionString = fullVersionString.split('.')[0];
			var version = parseInt(versionString);
			if (version >= 27) {
				return true;
			}
		}
	}
	return false;
}
```

<a name="luyknt"></a>
### [](#luyknt)40. 判断是否打开视窗

```javascript
function isViewportOpen() {
	return !!document.getElementById('wixMobileViewport');
}
```

<a name="zzhucs"></a>
### [](#zzhucs)41. 获取移动设备初始化大小

```javascript
function getInitZoom() {
	if (!this._initZoom) {
		var screenWidth = Math.min(screen.height, screen.width);
		if (this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()) {
			screenWidth = screenWidth / window.devicePixelRatio;
		}
		this._initZoom = screenWidth / document.body.offsetWidth;
	}
	return this._initZoom;
}
```

<a name="k7kyig"></a>
### [](#k7kyig)42. 获取移动设备最大化大小

```javascript
function getZoom() {
	var screenWidth = (Math.abs(window.orientation) === 90) ? Math.max(screen.height, screen.width) : Math.min(
		screen.height, screen.width);
	if (this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()) {
		screenWidth = screenWidth / window.devicePixelRatio;
	}
	var FixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
	var FixViewPortsExperimentRunning = FixViewPortsExperiment && (FixViewPortsExperiment === "New" ||
		FixViewPortsExperiment === "new");
	if (FixViewPortsExperimentRunning) {
		return screenWidth / window.innerWidth;
	} else {
		return screenWidth / document.body.offsetWidth;
	}
}
```

<a name="kpdaty"></a>
### [](#kpdaty)43. 获取移动设备屏幕宽度

```javascript
function getScreenWidth() {
	var smallerSide = Math.min(screen.width, screen.height);
	var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
	var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
	if (fixViewPortsExperiment) {
		if (this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()) {
			smallerSide = smallerSide / window.devicePixelRatio;
		}
	}
	return smallerSide;
}
```

<a name="5q8fdw"></a>
### [](#5q8fdw)44. 完美判断是否为网址

```javascript
function IsURL(strUrl) {
	var regular =
		/^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
	if (regular.test(strUrl)) {
		return true;
	} else {
		return false;
	}
}
```

<a name="3cr8bp"></a>
### [](#3cr8bp)45. 根据样式名称检索元素对象

```javascript
function getElementsByClassName(name) {
	var tags = document.getElementsByTagName('*') || document.all;
	var els = [];
	for (var i = 0; i < tags.length; i++) {
		if (tags.className) {
			var cs = tags.className.split(' ');
			for (var j = 0; j < cs.length; j++) {
				if (name == cs[j]) {
					els.push(tags);
					break
				}
			}
		}
	}
	return els
}
```

<a name="ulo1dx"></a>
### [](#ulo1dx)46. 判断是否以某个字符串开头

```javascript
String.prototype.startWith = function (s) {
	return this.indexOf(s) == 0
}
```

<a name="o5adbc"></a>
### [](#o5adbc)47. 判断是否以某个字符串结束

```javascript
String.prototype.endWith = function (s) {
	var d = this.length - s.length;
	return (d >= 0 && this.lastIndexOf(s) == d)
}
```

<a name="i7q8vu"></a>
### [](#i7q8vu)48. 返回IE浏览器的版本号

```javascript
function getIE() {
	if (window.ActiveXObject) {
		var v = navigator.userAgent.match(/MSIE ([^;]+)/)[1];
		return parseFloat(v.substring(0, v.indexOf(".")))
	}
	return false
}
```

<a name="dd27pw"></a>
### [](#dd27pw)49. 获取页面高度

```javascript
function getPageHeight() {
	var g = document,
		a = g.body,
		f = g.documentElement,
		d = g.compatMode == "BackCompat" ? a : g.documentElement;
	return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}
```

<a name="954osx"></a>
### [](#954osx)50. 获取页面scrollLeft

```javascript
function getPageScrollLeft() {
	var a = document;
	return a.documentElement.scrollLeft || a.body.scrollLeft;
}
```

<a name="54gpsc"></a>
### [](#54gpsc)51. 获取页面可视宽度

```javascript
function getPageViewWidth() {
	var d = document,
		a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
	return a.clientWidth;
}
```

<a name="8q5sfs"></a>
### [](#8q5sfs)52. 获取页面宽度

```javascript
function getPageWidth() {
	var g = document,
		a = g.body,
		f = g.documentElement,
		d = g.compatMode == "BackCompat" ? a : g.documentElement;
	return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}
```

<a name="deu1bi"></a>
### [](#deu1bi)53. 获取页面scrollTop

```javascript
function getPageScrollTop() {
	var a = document;
	return a.documentElement.scrollTop || a.body.scrollTop;
}
```

<a name="0ikdca"></a>
### [](#0ikdca)54. 获取页面可视高度

```javascript
function getPageViewHeight() {
	var d = document,
		a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
	return a.clientHeight;
}
```

<a name="ypumvb"></a>
### [](#ypumvb)55. 跨浏览器添加事件

```javascript
function addEvt(oTarget, sEvtType, fnHandle) {
	if (!oTarget) {
		return;
	}
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEvtType, fnHandle, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEvtType, fnHandle);
	} else {
		oTarget["on" + sEvtType] = fnHandle;
	}
}
```

<a name="2d3mfz"></a>
### [](#2d3mfz)56. 跨浏览器删除事件

```javascript
function delEvt(oTarget, sEvtType, fnHandle) {
	if (!oTarget) {
		return;
	}
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEvtType, fnHandle, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEvtType, fnHandle);
	} else {
		oTarget["on" + sEvtType] = fnHandle;
	}
}
```

<a name="8f35wf"></a>
### [](#8f35wf)56. 去掉url前缀

```javascript
function removeUrlPrefix(a) {
	a = a.replace(/：/g, ":").replace(/．/g, ".").replace(/／/g, "/");
	while (trim(a).toLowerCase().indexOf("http://") == 0) {
		a = trim(a.replace(/http:\/\//i, ""));
	}
	return a;
}
```

<a name="2s7ttd"></a>
### [](#2s7ttd)57. 随机数时间戳

```javascript
function uniqueId() {
	var a = Math.random,
		b = parseInt;
	return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());
}
```

<a name="t7qcpc"></a>
### [](#t7qcpc)58. 全角半角转换

```javascript
// iCase: 0全到半，1半到全，其他不转化
function chgCase(sStr, iCase) {
	if (typeof sStr != "string" || sStr.length <= 0 || !(iCase === 0 || iCase == 1)) {
		return sStr;
	}
	var i, oRs = [],
		iCode;
	if (iCase) { /*半->全*/
		for (i = 0; i < sStr.length; i += 1) {
			iCode = sStr.charCodeAt(i);
			if (iCode == 32) {
				iCode = 12288;
			} else if (iCode < 127) {
				iCode += 65248;
			}
			oRs.push(String.fromCharCode(iCode));
		}
	} else { /*全->半*/
		for (i = 0; i < sStr.length; i += 1) {
			iCode = sStr.charCodeAt(i);
			if (iCode == 12288) {
				iCode = 32;
			} else if (iCode > 65280 && iCode < 65375) {
				iCode -= 65248;
			}
			oRs.push(String.fromCharCode(iCode));
		}
	}
	return oRs.join("");
}
```

<a name="eplfqw"></a>
### [](#eplfqw)59. 确认是否键盘有效输入值

```javascript
function checkKey(iKey) {
	if (iKey == 32 || iKey == 229) {
		return true;
	} /*空格和异常*/
	if (iKey > 47 && iKey < 58) {
		return true;
	} /*数字*/
	if (iKey > 64 && iKey < 91) {
		return true;
	} /*字母*/
	if (iKey > 95 && iKey < 108) {
		return true;
	} /*数字键盘1*/
	if (iKey > 108 && iKey < 112) {
		return true;
	} /*数字键盘2*/
	if (iKey > 185 && iKey < 193) {
		return true;
	} /*符号1*/
	if (iKey > 218 && iKey < 223) {
		return true;
	} /*符号2*/
	return false;
}
```

<a name="vz4kva"></a>
### [](#vz4kva)60. 获取滚动条位置
```javascript
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
```

<a name="ce59ch"></a>
### [](#ce59ch)61. 日期格式化函数

```javascript
Date.prototype.format = function (format) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}
alert(new Date().format("yyyy-MM-dd hh:mm:ss"));
```

<a name="9glsue"></a>
### [](#9glsue)62. 时间个性化输出功能

```javascript
/*
1、< 60s, 显示为“刚刚”
2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
*/
function timeFormat(time) {
	var date = new Date(time),
		curDate = new Date(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		curYear = curDate.getFullYear(),
		curHour = curDate.getHours(),
		timeStr;

	if (year < curYear) {
		timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
	} else {
		var pastTime = curDate - date,
			pastH = pastTime / 3600000;

		if (pastH > curHour) {
			timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
		} else if (pastH >= 1) {
			timeStr = '今天 ' + hour + ':' + minute + '分';
		} else {
			var pastM = curDate.getMinutes() - minute;
			if (pastM > 1) {
				timeStr = pastM + '分钟前';
			} else {
				timeStr = '刚刚';
			}
		}
	}
	return timeStr;
}
```

<a name="86dgaf"></a>
### [](#86dgaf)63. 解决offsetX兼容性问题

```javascript
function getOffset(e) {
	var target = e.target, // 当前触发的目标对象
		eventCoord,
		pageCoord,
		offsetCoord;

	// 计算当前触发元素到文档的距离
	pageCoord = getPageCoord(target);

	// 计算光标到文档的距离
	eventCoord = {
		X: window.pageXOffset + e.clientX,
		Y: window.pageYOffset + e.clientY
	};

	// 相减获取光标到第一个定位的父元素的坐标
	offsetCoord = {
		X: eventCoord.X - pageCoord.X,
		Y: eventCoord.Y - pageCoord.Y
	};
	return offsetCoord;
}

function getPageCoord(element) {
	var coord = {
		X: 0,
		Y: 0
	};
	// 计算从当前触发元素到根节点为止，
	// 各级 offsetParent 元素的 offsetLeft 或 offsetTop 值之和
	while (element) {
		coord.X += element.offsetLeft;
		coord.Y += element.offsetTop;
		element = element.offsetParent;
	}
	return coord;
}
```

<a name="qqnxqm"></a>
### [](#qqnxqm)64. 返回顶部的通用方法

```javascript
function backTop(btnId) {
	var btn = document.getElementById(btnId);
	var d = document.documentElement;
	var b = document.body;
	window.onscroll = set;
	btn.style.display = "none";
	btn.onclick = function () {
		btn.style.display = "none";
		window.onscroll = null;
		this.timer = setInterval(function () {
			d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
			b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
			if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
		},
			10);
	};

	function set() {
		btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block' : "none"
	}
};
```

<a name="banbxu"></a>
### [](#banbxu)65. 获得URL中GET参数值

```javascript
// 用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]

function get_get() {
	querystr = window.location.href.split("?")
	if (querystr[1]) {
		GETs = querystr[1].split("&")
		GET = new Array()
		for (i = 0; i < GETs.length; i++) {
			tmp_arr = GETs.split("=")
			key = tmp_arr[0]
			GET[key] = tmp_arr[1]
		}
	}
	return querystr[1];
}
```

<a name="i1q0an"></a>
### [](#i1q0an)66. 全选通用方法

```javascript
function checkall(form, prefix, checkall) {
	var checkall = checkall ? checkall : 'chkall';
	for (var i = 0; i < form.elements.length; i++) {
		var e = form.elements;
		if (e.type == "checkbox") {
			e.checked = form.elements[checkall].checked;
		}
	}
}
```

<a name="rmasxm"></a>
### [](#rmasxm)67. 全部取消选择通用方法

```javascript
function uncheckAll(form) {
	for (var i = 0; i < form.elements.length; i++) {
		var e = form.elements;
		if (e.name != 'chkall')
			e.checked = !e.checked;
	}
}
```

<a name="re72me"></a>
### [](#re72me)68. 打开一个窗体通用方法

```javascript
function openWindow(url, windowName, width, height) {
	var x = parseInt(screen.width / 2.0) - (width / 2.0);
	var y = parseInt(screen.height / 2.0) - (height / 2.0);
	var isMSIE = (navigator.appName == "Microsoft Internet Explorer");
	if (isMSIE) {
		var p = "resizable=1,location=no,scrollbars=no,width=";
		p = p + width;
		p = p + ",height=";
		p = p + height;
		p = p + ",left=";
		p = p + x;
		p = p + ",top=";
		p = p + y;
		retval = window.open(url, windowName, p);
	} else {
		var win = window.open(url, "ZyiisPopup", "top=" + y + ",left=" + x + ",scrollbars=" + scrollbars +
			",dialog=yes,modal=yes,width=" + width + ",height=" + height + ",resizable=no");
		eval("try { win.resizeTo(width, height); } catch(e) { }");
		win.focus();
	}
}
```

<a name="pevmhl"></a>
### [](#pevmhl)69. 判断是否为客户端设备

```javascript
function client(o) {
	var b = navigator.userAgent.toLowerCase();
	var t = false;
	if (o == 'isOP') {
		t = b.indexOf('opera') > -1;
	}
	if (o == 'isIE') {
		t = b.indexOf('msie') > -1;
	}
	if (o == 'isFF') {
		t = b.indexOf('firefox') > -1;
	}
	return t;
}
```

<a name="02lnot"></a>
### [](#02lnot)70. 获取单选按钮的值

```javascript
function get_radio_value(field) {
	if (field && field.length) {
		for (var i = 0; i < field.length; i++) {
			if (field.checked) {
				return field.value;
			}
		}
	} else {
		return;
	}
}
```

<a name="nu59si"></a>
### [](#nu59si)71. 获取复选框的值

```javascript
function get_checkbox_value(field) {
	if (field && field.length) {
		for (var i = 0; i < field.length; i++) {
			if (field.checked && !field.disabled) {
				return field.value;
			}
		}
	} else {
		return;
	}
}
```

<a name="ifyalu"></a>
### [](#ifyalu)72. 判断是否为邮箱

```javascript
function isEmail(str) {
	var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	if (re.test(str) != true) {
		return false;
	} else {
		return true;
	}
}
```

<a name="v40dtt"></a>
### [](#v40dtt)73. 判断是否有列表中的危险字符

```javascript
function isValidReg(chars) {
	var re =
		/<|>|
|
|\{|\}|『|』|※|○|●|◎|§|△|▲|☆|★|◇|◆|□|▼|㊣|﹋|⊕|⊙|〒|ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|ㄙ|ㄚ|ㄛ|ㄜ|ㄝ|ㄞ|ㄟ|ㄢ|ㄣ|ㄤ|ㄥ|ㄦ|ㄧ|ㄨ|ㄩ|■|▄|▆|\*|@|#|\^|\\/;
	if (re.test(chars) == true) {
		return false;
	} else {
		return true;
	}
}
```

<a name="0tdiuu"></a>
### [](#0tdiuu)74. 判断字符串是否大于规定的长度

```javascript
function isValidLength(chars, len) {
	if (chars.length < len) {
		return false;
	}
	return true;
}
```

<a name="4k1ylb"></a>
### [](#4k1ylb)75. 判断字符串是为网址不区分大小写

```javascript
function isValidURL(chars) {
	var re = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(\S+\.\S+)$/;
	if (!isNULL(chars)) {
		chars = jsTrim(chars);
		if (chars.match(re) == null)
			return false;
		else
			return true;
	}
	return false;
}
```

<a name="vd64vf"></a>
### [](#vd64vf)76. 判断字符串是否为小数

```javascript
function isValidDecimal(chars) {
	var re = /^\d*\.?\d{1,2}$/;
	if (chars.match(re) == null)
		return false;
	else
		return true;
}
```

<a name="h8ifgl"></a>
### [](#h8ifgl)77. 判断字符串是否为整数

```javascript
function isNumber(chars) {
	var re = /^\d*$/;
	if (chars.match(re) == null)
		return false;
	else
		return true;
}
```

<a name="7wspha"></a>
### [](#7wspha)78. 判断字符串是否为浮点数

```javascript
function isFloat(str) {
	for (i = 0; i < str.length; i++) {
		if ((str.charAt(i) < "0" || str.charAt(i) > "9") && str.charAt(i) != '.') {
			return false;
		}
	}
	return true;
}
```

<a name="y9gqda"></a>
### [](#y9gqda)79. 判断字符是否为A-Za-z英文字母

```javascript
function isLetters(str) {
	var re = /^[A-Za-z]+$/;
	if (str.match(re) == null)
		return false;
	else
		return true;
}
```

<a name="f3ydgk"></a>
### [](#f3ydgk)80. 判断字符串是否邮政编码

```javascript
function isValidPost(chars) {
	var re = /^\d{6}$/;
	if (chars.match(re) == null)
		return false;
	else
		return true;
}
```

<a name="shtiqu"></a>
### [](#shtiqu)81. 判断字符是否空NULL

```javascript
function isNULL(chars) {
	if (chars == null)
		return true;
	if (jsTrim(chars).length == 0)
		return true;
	return false;
}
```

<a name="d11imk"></a>
### [](#d11imk)82. 用正则表达式提取页面代码中所有网址

```javascript
var aa = document.documentElement.outerHTML.match(
	/(url|src=|href=)[\"\']∗([\"\'\(\<\>
]+)[\"\'\)]*|(http:\/\/[\w\-\.]+[^\"\'\<\>
]+)/ig).join("\r\n").replace(
	/^(src=|href=|url)[\"\']∗|[\"\' ]*$/igm, "");
alert(aa)
```

<a name="21yakg"></a>
### [](#21yakg)83. 用正则表达式清除相同的数组(低效率)

```javascript
Array.prototype.unique = function () {
	return this.reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse();
};
```

<a name="ouv8yg"></a>
### [](#ouv8yg)84. 用正则表达式清除相同的数组(高效率)

```javascript
String.prototype.unique = function () {
	var x = this.split(/[\r\n]+/);
	var y = '';
	for (var i = 0; i < x.length; i++) {
		if (!new RegExp("^" + x.replace(/([^\w])/ig, "\\$1") + "[        DISCUZ_CODE_2        ]quot;,"
		igm ").test(y)){
					y+=x+"\
		r\ n "
			}
	}
	return y
};
```

<a name="fsf4fx"></a>
### [](#fsf4fx)85. 用正则表达式按字母排序，对每行进行数组排序

```javascript
function SetSort(){
	var text=K1.value.split(/[\r\n]/).sort().join("\
		r\ n ");//顺序
	var test=K1.value.split(/[\r\n]/).sort().reverse().join("\
		r\ n ");//反序
	K1.value=K1.value!=text?text:test;
}
```

<a name="7lygua"></a>
### [](#7lygua)86. 字符串反序

```javascript
function IsReverse(text){
	return text.split('').reverse().join('');
}
```

<a name="pxffef"></a>
### [](#pxffef)87. 用正则表达式清除html代码中的脚本

```javascript
function clear_script(){
K1.value=K1.value.replace(/<script.*?>[\s\S]*?<\/script>|\s+on[a-zA-Z]{3,16}\s?=\s?" [\
				s\ S] * ? "|\s+on[a-zA-Z]{3,16}\s?=\s?'[\s\S]*?'|\s+on[a-zA-Z]{3,16}\s?=[^ >]+/ig,"
		");
}
```

<a name="olzopf"></a>
### [](#olzopf)88. 金额大写转换函数

```javascript
function transform(tranvalue) {
try {
var i = 1;
var dw2 = new Array("
		", "万
		", "亿
		"); //大单位
var dw1 = new Array("拾
		", "佰
		", "仟
		"); //小单位
var dw = new Array("零
		", "壹
		", "贰
		", "叁
		", "肆
		", "伍
		", "陆
		", "柒
		", "捌
		", "玖
		"); //整数部分用
//以下是小写转换成大写显示在合计大写的文本框中    
//分离整数与小数
var source = splits(tranvalue);
var num = source[0];
var dig = source[1];
//转换整数部分
var k1 = 0; //计小单位
var k2 = 0; //计大单位
var sum = 0;
var str = "
		";
var len = source[0].length; //整数的长度
for (i = 1; i <= len; i++) {
  var n = source[0].charAt(len - i); //取得某个位数上的数字
  var bn = 0;
  if (len - i - 1 >= 0) {
	bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
  }
  sum = sum + Number(n);
  if (sum != 0) {
	str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
	if (n == '0') sum = 0;
  }
  if (len - i - 1 >= 0) { //在数字范围内
	if (k1 != 3) { //加小单位
	  if (bn != 0) {
		str = dw1[k1].concat(str);
	  }
	  k1++;
	} else { //不加小单位，加大单位
	  k1 = 0;
	  var temp = str.charAt(0);
	  if (temp == "万
		" || temp == "亿
		") //若大单位前没有数字则舍去大单位
	  str = str.substr(1, str.length - 1);
	  str = dw2[k2].concat(str);
	  sum = 0;
	}
  }
  if (k1 == 3) //小单位到千则大单位进一
  {
	k2++;
  }
}
//转换小数部分
var strdig = "
		";
if (dig != "
		") {
  var n = dig.charAt(0);
  if (n != 0) {
	strdig += dw[Number(n)] + "角
		"; //加数字
  }
  var n = dig.charAt(1);
  if (n != 0) {
	strdig += dw[Number(n)] + "分
		"; //加数字
  }
}
str += "元
		" + strdig;
} catch(e) {
return "
		0元 ";
}
return str;
}
//拆分整数与小数
function splits(tranvalue) {
var value = new Array('', '');
temp = tranvalue.split("
			.
		");
for (var i = 0; i < temp.length; i++) {
value = temp;
}
return value;
}
```

<a name="8td2if"></a>
### [](#8td2if)89. 窗体改变事件resize

```javascript
(function () {
	var fn = function () {
		var w = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth,
			r = 1255,
			b = Element.extend(document.body),
			classname = b.className;
		if (w < r) {
			//当窗体的宽度小于1255的时候执行相应的操作
		} else {
			//当窗体的宽度大于1255的时候执行相应的操作
		}
	}
	if (window.addEventListener) {
		window.addEventListener('resize', function () {
			fn();
		});
	} else if (window.attachEvent) {
		window.attachEvent('onresize', function () {
			fn();
		});
	}
	fn();
})();
```

<a name="iukhgr"></a>
### [](#iukhgr)90. 用正则清除空格分左右

```javascript
function ltrim(s) {
	return s.replace(/^(\s*| *)/, "");
}
function rtrim(s) {
	return s.replace(/(\s*| *)$/, "");
}
function trim(s) {
	return ltrim(rtrim(s));
}
```

<a name="oxhict"></a>
### [](#oxhict)91. 判断变量是否空值

```javascript
function empty(v){
	switch (typeof v) {
	case 'undefined':
		return true;
	case 'string':
		if (trim(v).length == 0) return true;
		break;
	case 'boolean':
		if (!v) return true;
		break;
	case 'number':
		if (0 === v) return true;
		break;
	case 'object':
		if (null === v) return true;
		if (undefined !== v.length && v.length == 0) return true;
		for (var k in v) {
			return false;
		}
		return true;
		break;
	}
	return false;
}
```

<a name="q7ggkw"></a>
### [](#q7ggkw)92. base64解码

```javascript
function base64_decode(data) {
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
		ac = 0,
		dec = "",
		tmp_arr = [];
	if (!data) {
		return data;
	}
	data += '';
	do {
		h1 = b64.indexOf(data.charAt(i++));
		h2 = b64.indexOf(data.charAt(i++));
		h3 = b64.indexOf(data.charAt(i++));
		h4 = b64.indexOf(data.charAt(i++));
		bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
		o1 = bits >> 16 & 0xff;
		o2 = bits >> 8 & 0xff;
		o3 = bits & 0xff;
		if (h3 == 64) {
			tmp_arr[ac++] = String.fromCharCode(o1);
		} else if (h4 == 64) {
			tmp_arr[ac++] = String.fromCharCode(o1, o2);
		} else {
			tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
		}
	} while (i < data.length);
	dec = tmp_arr.join('');
	dec = utf8_decode(dec);
	return dec;
}
```

<a name="4qpfdf"></a>
### [](#4qpfdf)93. utf8解码

```javascript
function utf8_decode(str_data) {
	var tmp_arr = [],
		i = 0,
		ac = 0,
		c1 = 0,
		c2 = 0,
		c3 = 0;
	str_data += '';
	while (i < str_data.length) {
		c1 = str_data.charCodeAt(i);
		if (c1 < 128) {
			tmp_arr[ac++] = String.fromCharCode(c1);
			i++;
		} else if (c1 > 191 && c1 < 224) {
			c2 = str_data.charCodeAt(i + 1);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = str_data.charCodeAt(i + 1);
			c3 = str_data.charCodeAt(i + 2);
			tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return tmp_arr.join('');
}
```

<a name="kbiglz"></a>
### [](#kbiglz)94. 获取窗体可见范围的宽与高

```javascript
function getViewSize() {
	var de = document.documentElement;
	var db = document.body;
	var viewW = de.clientWidth == 0 ? db.clientWidth : de.clientWidth;
	var viewH = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;
	return Array(viewW, viewH);
}
```

<a name="63ndvk"></a>
### [](#63ndvk)95. 判断IE版本号

```javascript
var _IE = (function () {
	var v = 3,
		div = document.createElement('div'),
		all = div.getElementsByTagName('i');
	while (
		div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
		all[0]);
	return v > 4 ? v : false;
}());
```

<a name="vf2mwh"></a>
### [](#vf2mwh)96. 获取浏览器版本号

```javascript
function browserVersion(types) {
	var other = 1;
	for (i in types) {
		var v = types ? types : i;
		if (USERAGENT.indexOf(v) != -1) {
			var re = new RegExp(v + '(\\/|\\s|: )([\\d\\.]+)', 'ig');
			var matches = re.exec(USERAGENT);
			var ver = matches != null ? matches[2] : 0;
			other = ver !== 0 && v != 'mozilla' ? 0 : other;
		} else {
			var ver = 0;
		}
		eval('BROWSER.' + i + '= ver');
	}
	BROWSER.other = other;
}
```

<a name="9tntms"></a>
### [](#9tntms)97. 判断鼠标是否移出事件

```javascript
function isMouseOut(e, handler) {
	if (e.type !== 'mouseout') {
		return false;
	}
	var reltg = e.relatedTarget ? e.relatedTarget : e.type === 'mouseout' ? e.toElement : e.fromElement;
	while (reltg && reltg !== handler) {
		reltg = reltg.parentNode;
	}
	return (reltg !== handler);
}
```

<a name="76k9sr"></a>
### [](#76k9sr)98. 半角转换为全角

```javascript
function ToDBC(str) {
	var result = '';
	for (var i = 0; i < str.length; i++) {
		code = str.charCodeAt(i);
		if (code >= 33 && code <= 126) {
			result += String.fromCharCode(str.charCodeAt(i) + 65248);
		} else if (code == 32) {
			result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
		} else {
			result += str.charAt(i);
		}
	}
	return result;
}
```

<a name="o0x4vn"></a>
### [](#o0x4vn)99. 全角转换为半角函数

```javascript
function ToCDB(str) {
	var result = '';
	for (var i = 0; i < str.length; i++) {
		code = str.charCodeAt(i);
		if (code >= 65281 && code <= 65374) {
			result += String.fromCharCode(str.charCodeAt(i) - 65248);
		} else if (code == 12288) {
			result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
		} else {
			result += str.charAt(i);
		}
	}
	return result;
}
```

<a name="g01cwm"></a>
### [](#g01cwm)100. 复制到粘贴板

```javascript
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
	document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
	document.getSelection().removeAllRanges();
	document.getSelection().addRange(selected);
  }
}
```

<a name="o8qdff"></a>
### [](#o8qdff)101. 获取元素的样式属性

```javascript
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
```

<a name="mgmlzg"></a>
### [](#mgmlzg)102. 拖拽

```javascript
function drag(obj){
	oDiv.onmousedown = function(ev){
		var ev = ev || event;	
		//鼠标到当前对象的距离
		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;
		
		document.onmousemove = function(ev){
			var ev = ev || event;
			//当前对象视口距离
			var L = ev.clientX - disX;
			var T = ev.clientY - disY;
			
			var T,B,L,R
			//磁性吸附
			if(L<100){
				L = 0;
			}else if(L>document.documentElement.clientWidth - obj.offsetWidth){
				L = document.documentElement.clientWidth - obj.offsetWidth

			}
			
			if(T<100){
				T = 0;
			}else if(T>document.documentElement.clientHeight - obj.offsetHeight){
				T = document.documentElement.clientHeight - obj.offsetHeight
			}
			
			obj.style.left = L +'px';
			obj.style.top = T + 'px';
		}
	
		document.onmouseup = function(){
			document.onmousemove = document.onmouseup = null;
		}			
	}
}
```

<a name="6xbwgn"></a>
### [](#6xbwgn)103. 获取兄弟节点

```javascript
var siblings = function(elm) {
		var a = [];
		var p = elm.parentNode.children;
		for(var i = 0,pl = p.length; i < pl; i++) {
			if(p[i] !== elm) a.push(p[i]);
		}
		return a;
	}
```

<a name="434rur"></a>
### [](#434rur)104. 页面底部是否可见

```javascript
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);
```

<a name="ra01yy"></a>
### [](#ra01yy)105. 创建事件中间站

```javascript
const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach(handler => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
  }
});
```

<a name="r14igm"></a>
### [](#r14igm)106. 判断元素是否在可视窗口可见

> 如果指定的元素在可视窗口中可见，则返回 true ，否则返回 false
> 使用 `Element.getBoundingClientRect()` 和 `window.inner(Width|Height)` 值来确定给定元素是否在可视窗口中可见。 省略第二个参数来判断元素是否完全可见，或者指定 `true` 来判断它是否部分可见。


```javascript
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
```

<a name="uvdrwp"></a>
### [](#uvdrwp)107. 判断元素是否具有指定的样式类

```javascript
const hasClass = (el, className) => el.classList.contains(className);
```

<a name="z9czzm"></a>
### [](#z9czzm)108. 隐藏所有指定的元素
```javascript
const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));

hide(...document.querySelectorAll('img'))
```

<a name="05owwp"></a>
### [](#05owwp)109. off - 移除事件侦听器
> 从元素中移除事件侦听器。

> 使用 `EventTarget.removeEventListener()` 从元素中删除一个事件监听器。 省略第四个参数 `opts` ，则默认使用 `false` 或者根据添加事件监听器时使用的选项来指定它。


```javascript
const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts);
```

<a name="lgukgg"></a>
### [](#lgukgg)110. on - 在元素上添加事件侦听器（事件委派）

```javascript
const on = (el, evt, fn, opts = {}) => {
  const delegatorFn = e => e.target.matches(opts.target) && fn.call(e.target, e);
  el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false);
  if (opts.target) return delegatorFn;
};
```

<a name="gs2xxx"></a>
### [](#gs2xxx)111. 回到顶部

```javascript
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
```

<a name="0lt9it"></a>
### [](#0lt9it)112. 切换一个元素的样式类

```javascript
const toggleClass = (el, className) => el.classList.toggle(className);
```

<a name="grxxmg"></a>
### [](#grxxmg)113. 在浏览器中生成一个 UUID

```javascript
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
```

<a name="cd97gr"></a>
### [](#cd97gr)114. 获取两个日期之间相差的天数

```javascript
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);
```

<a name="hra5gq"></a>
### [](#hra5gq)115. 明天

```javascript
const tomorrow = () => new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];
```

<a name="hc7hyn"></a>
### [](#hc7hyn)116. elo - 等级评分算法

```javascript
const elo = ([...ratings], kFactor = 32, selfRating) => {
  const [a, b] = ratings;
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400));
  const newRating = (rating, i) =>
    (selfRating || rating) + kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  if (ratings.length === 2) {
    return [newRating(a, 1), newRating(b, 0)];
  } else {
    for (let i = 0; i < ratings.length; i++) {
      let j = i;
      while (j < ratings.length - 1) {
        [ratings[i], ratings[j + 1]] = elo([ratings[i], ratings[j + 1]], kFactor);
        j++;
      }
    }
  }
  return ratings;
};
```

<a name="1urday"></a>
### [](#1urday)107. 判断元素是否具有指定的样式类

```javascript
const hasClass = (el, className) => el.classList.contains(className);
```

<a name="hlk4zz"></a>
### 108.深拷贝

```javascript
function getType(o){
  return Object.prototype.toString.call(o).slice(8,-1)
}

function deepCopy(obj, parent = null){
	if(getType(obj) != 'Object' && getType(obj) != 'Function' && getType(obj) != 'Array'){
		return obj
	}
	
	let newObj = getType(obj) == 'Object' ? {} : []
	let _parent = parent
	
	while(_parent){
		if(_parent.originalParent === obj){
			return _parent.currentParent
		}
		_parent = _parent.parent
	}
	
	for(let i in obj){
		if(obj.hasOwnProperty(i)){
		  if(getType(obj[i]) === 'Object'){
			  newObj[i] = deepCopy(obj[i], {
                originalParent: obj,
                currentParent: newObj,
                parent: parent
            });
		  } else {
			  newObj[i] = obj[i]
		  }
		}
	}

	return newObj
}
```

<a name="wsrpry"></a>
### [](#wsrpry)<br />

[toc]