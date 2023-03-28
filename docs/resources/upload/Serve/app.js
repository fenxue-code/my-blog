// 导入所需的依赖项
const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer();
const cors = require('cors');

app.use(cors());
// 使用 JSON 中间件处理请求主体
app.use(express.json());

// 定义一个 POST 路由，用于处理文件上传。`upload.single('file')`中间件用于处理单个文件上传。
app.post('/upload', upload.single('file'), (req, res) => {
  // 如果没有文件被上传，返回400状态码（错误请求）和错误信息
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // 提取文件的相关信息
  const fileInfo = {
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
  };

  // 在控制台输出整理好的文件信息
  console.log('File uploaded successfully:');
  console.log(JSON.stringify(fileInfo, null, 2));

  // 返回200状态码（成功）和成功信息
  res.status(200).send('File uploaded successfully.');
});

app.post('/upload-multiple', upload.array('files', 10), (req, res) => {
  // 如果没有文件被上传，返回400状态码（错误请求）和错误信息
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  // 提取所有上传文件的相关信息
  const filesInfo = req.files.map(file => ({
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
  }));

  // 在控制台输出整理好的文件信息
  console.log('Files uploaded successfully:');
  console.log(JSON.stringify(filesInfo, null, 2));

  // 返回200状态码（成功）和成功信息
  res.status(200).send('Files uploaded successfully.');
});

// 创建一个 GET 接口，路径为 '/get-demo'。当客户端发送 GET 请求到这个路径时，这个函数会被调用。
app.get('/get-demo', (req, res) => {
  // 响应请求，发送一个简单的文本消息
  res.send('Hello, GET request received!');
});

// 创建一个 POST 接口，路径为 '/get-post'。当客户端发送 POST 请求到这个路径时，这个函数会被调用。
app.post('/post-demo', (req, res) => {
  // 获取请求主体中的 'name' 属性
  const name = req.body.name || 'World';

  // 响应请求，发送一个带有请求中 'name' 属性的文本消息
  res.send(`Hello, ${name}! POST request received!`);
});

// 设置要监听的端口，可以从环境变量中获取，如果没有设置，则使用默认值3000
const PORT = process.env.PORT || 3000;

// 启动服务器并监听指定端口
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
