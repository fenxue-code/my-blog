---
title: 文档示例
description: 如果不设置这个就会取文章前100个字符
cover: ../img/test.png
# hidden: true 文章是否在首页显示
# author: 单独设置文章作者
# readingTime: 单独设置是否展示文章的预计阅读时间
# date: 发布时间
tags:
 - 文档示例
sticky: 1 #用于设置在首页展示的 精选文章，值越大展示越靠前
top: 1 #用于设置在首页置顶展示的文章，从 1 开始，值越小越靠前
recommend: 1 #于设置文章左侧展示的 推荐文章 顺序或者false
---
# 测试一下
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

>这是一段引用
>
>### 引用
>>这是嵌套引用

有序列表：
1. 111
2. 222
3. 333

无序列表
- 111
- 222
- 333

选择列表：
- [x] 吃饭
- [x] 睡觉
- [ ] 写代码 

代码块：
```javascript
let a = '我是一段代码';
```

```html
<html>
  <head>
  </head>
</html>
```

`一小块内容`

表格：
| 姓名   | 年龄 |  成绩  |
| :----- | ---: | :----: |
| 张山啊 |   65 | 900000 |
| 张山啊 |   65 | 900000 |
| 张山啊 |   65 | 900000 |

---

横线

[百度](baidu.com "一个搜索引擎")  
变成一个链接的方式  
<https://markdown.com.cn>  
email  
<fake@example.com>  

[markdown官方文档][1]

[1]:https://markdown.com.cn/basic-syntax/horizontal-rules.html "markdown官方文档"

URL:
http://www.baidu.com

`第一个方括号是代替文本，圆括号第二个参数是鼠标悬浮展示,如果前面方括号包起来，最后结尾一个空格就可以给图片添加链接`  
[![百度](https://www.baidu.com/img/bd_logo1.png "百度搜索")](https://markdown.com.cn)

**加粗**   
<u>下划线</u>  

<!-- 在末尾添加两个空格+回车可以换行,br标签也可以 -->
This is the first line.  
And this is the <br> second line.  
`转译字符`  
\ - [x] 吃饭  
\ - [x] 睡觉  
\ - [ ] 写代码  
