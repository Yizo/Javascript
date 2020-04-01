## Get,post区别

- get如果请求url没有变化，取出缓存，提高效率；请求会缓存到浏览器中，可以通过历史记录查看用户信息，安全性低；
- post传送变化的数据显示，变动性访问；
- get通过url地址传送数据，数据量不能超过1024byte；
- post作为http消息的实体内容传送到服务器中，传送数据量可以很大；
- get传送数据要经过encodeURIComponent编码，防止乱码。
- get方式，服务器端用Request.QueryString获取变量的值；
- post方式，服务器端用Request.Form获取提交的数据；
- get方式将参数等数据放在URL中提交给服务器，服务器返回信息
- post方法将参数等数据放在http信息的body中提交给服务器，服务器返回信息
- Get将表单中数据的按照variable=value的形式，添加到action所指向的URL后面，并且两者使用“?”连接，而各个变量之间使用 “&”连接；Post是将表单中的数据放在form的数据体中，按照变量和值相对应的方式，传递到action所指向URL。  
- Get限制Form表单的数据集的值必须为ASCII字符；而Post支持整个ISO10646字符集。 
- Get是Form的默认方法。
- get方法传值参数在url里面，而post参数放send里面
- post方法必须加上xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")


## 原生通用写法
 
```javascript
// 获取XMLHttpRequest对象
      function createXMLHttpRequest(){
        var xhr;
        //IE5和IE6
        if(window.ActiveXObject){
          try{
      xhr = new ActiveXObject(Microsoft.XMLHTTP)
          }catch(e){
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
          }
        }else if(window.XMLHttpRequest){
          //其它主流浏览器
          xhr = new XMLHttpRequest();
        }else{
          alert("你使用的浏览器不支持XMLHttpRequest！");
          return false;
        }
        return xhr;
      }

       
      // 创建XMLHttpRequest对象
      var xhr = createXMLHttpRequest();       
      // 处理Ajax请求
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
          //获取相应的文本：通过xhr的responseText可以获取文本信息，包括xml的标签
          alert(xhr.responseText);
        }
      }
      // 发送Ajax请求
      xhr.open("GET","b.html",true);
      xhr.send();

```
[toc]
