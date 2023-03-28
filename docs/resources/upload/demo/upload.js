// 为ID为'upload-button'的按钮元素添加'click'事件监听器
document.getElementById('upload-button').addEventListener('click', () => {
  // 获取ID为'file-input'的文件输入元素
  const fileInput = document.getElementById('file-input');
  // 获取文件输入元素中的文件列表
  const files = fileInput.files;

  // 检查是否选择了文件
  if (!files.length) {
    alert('请选择一个文件');
    return;
  }

  // 创建一个FormData实例
  const formData = new FormData();
  // 遍历文件列表并将文件添加到FormData实例中
  for (const file of files) {
    formData.append('files', file);
  }

  // 在这里替换为您的服务器端接收文件上传的URL
  const uploadUrl = 'http://localhost:3000/upload-multiple';

  // 使用fetch API发送POST请求到指定的URL
  fetch(uploadUrl, {
    method: 'POST',
    body: formData, // 将formData作为请求体
  })
    // 当请求成功时，解析响应为文本
    .then((response) => {
      if (!response.ok) {
        throw new Error('网络错误，无法上传文件');
      }
      return response.text();
    })
    // 将解析后的文本数据打印到控制台，并显示上传成功的提示
    .then((data) => {
      console.log('文件上传成功:', data);
      alert('文件上传成功');
    })
    // 如果发生错误，打印错误信息到控制台，并显示上传失败的提示
    .catch((error) => {
      console.error('文件上传失败:', error);
      alert('文件上传失败');
    });
});