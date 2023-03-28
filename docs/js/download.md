---
  title: 文件下载
  description: 很多时候下载功能都是由后端提供地址，前端a链接渲染。有些简单数据下载可以由前端部分实现
  tags:
    - js
---

# 前端下载

## `需求`
项目经理在做一个前端拖拽平台，需要输出代码。想要不依服务器环境实现一个将一段字符串输出为一个文件下载下来。

## `场景`
平时业务场景中遇到的下载功能一般实现方式分为：  
- ### a标签实现文件下载
  >通过a标签实现下载的数据格式为：下载文件的url地址，所以从后台获取数据时得到的是url格式。
  ```javascript
  function downLoadFile(url, title){
      const a = document.createElement('a');
      a.href = url; //设置下载文件的url地址
      a.download = title; //设置下载文件的文件名
      a.click(); //触发下载
  }
  ```
---
- ### Form表单提交实现文件下载
  >直接从后台获取数据下载，不使用ajax请求，使用表单的get请求
  ```javascript
  function downLoadFile(url , data){
    var $iframe = $('<iframe />');
    var $form = $('<form  method="get" target="_self"/>');
    $form.attr('action', url); //设置get的url地址
    for (var key in data) {//设置请求的参数
        $form.append('<input type="hidden"  name="' + key  + '" value="' + data[key] + '" />');
    }
    $iframe.append($form);
    $(document.body).append($iframe);
    $form[0].submit();//提交表单
    $iframe.remove();//移除框架
  }
  $(".downloadBtn").click(function () {
    var data ={projectID: '测试'};
    var url = 'download-images';
    downLoadFile(url , data);
  })
  ```
  下载函数将数据作为参数传递，并创建一个`<iframe>`元素和一个`<form>`元素。表单的method属性被设置为get，并将目标URL设置为函数的第一个参数。然后，通过循环迭代数据对象中的每个属性，将它们添加为表单的隐藏输入字段。

  接下来，将`<form>`元素添加到`<iframe>`元素中，并将`<iframe>`元素添加到文档主体中。最后，使用submit()方法提交表单以触发文件下载，然后从DOM中删除`<iframe>`元素以清理。
---
- ### 二进制流实现文件下载  
  blob的存在，允许我们在js中对二进制数据直接进行操作。Blob对象可以看做是一个用来存放二进制对象的容器，通过构造函数实现初始化
  >向后台请求的到的数据为压缩包的文件流的格式，使用blob文件转换blob对象表示一个不可变的、原始数据的类文件对象。bolb表示的不一定是原生js格式的数据。File接口基于blob接口，继承了blob的功能并将其扩展使其支持用户系统上的文件
  ```javascript
  function fileDownLoad(data) {
    var linkElement = document.createElement('a');//创建点击下载的元素
    //判断浏览器是否支持blob对象
    try{
        //该实例化的方式第一个参数必须是数组的格式
        var blob = new Blob([data] , {type:"application/zip"});
    }catch(e){
        //旧版本浏览器下的blob创建对象
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
        if(e.name == 'TypeError' && window.BlobBuilder){
            var blobbuilder = new BlobBuilder();
            BlobBuilder.append(data);
            var blob = blobbuilder.getBlob("application/zip");
        }else{
            alert("浏览器版本较低，暂不支持该文件类型下载");
        }
    }
    var url = window.URL.createObjectURL(blob);
    linkElement.setAttribute('href',url);
    linkElement.setAttribute('downLoad','download');
    linkElement.click();
  }
  window.onload = function(){
    $.ajax({
        url:"get-file",
        type:"get",
        dataType:'arraybuffer'
    }).then(function(res){
        if(res.bizNo > 0 ){
            fileDownLoad(res.data);
        }else{
            alert(res.bizMsg);
        }
   }).always(function(){
        alert("连接异常")；
    })
  }
  ```
  1. URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的 URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的 URL 对象表示指定的 File 对象或 Blob 对象。
  2. 在使用blob构造函数时，即使只有一个数据，也要封装为数组结构。

## `实现`
需求是将字符串输出为一个文件本地下载，我们采用blob对象来实现这个功能比较。
```javascript
function downloadFile(data, filename, mimeType = 'octet/stream') {
  // 创建一个隐藏的可下载链接
  var element = document.createElement("a");
  element.style.display = "none";
  document.body.appendChild(element);

  // 使用Blob对象和URL.createObjectURL将数据转换为可下载的URL
  var blob = new Blob([data], { type: mimeType });
  var url = URL.createObjectURL(blob);

  // 设置链接的属性并模拟点击
  element.href = url;
  element.download = filename;
  element.click();

  // 清理创建的链接和URL对象
  document.body.removeChild(element);
  URL.revokeObjectURL(url);
}

// 要下载的数据
var data = "这是一个文本文件的内容。";
var filename = "example.txt";
var mimeType = "text/plain";

// 调用函数以下载文件
downloadFile(data, filename, mimeType);
```
通过创建Blob对象，然后使用createObjectURL方法转换为url的方式来进行前端下载功能。
