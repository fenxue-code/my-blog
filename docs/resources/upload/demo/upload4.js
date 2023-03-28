var file = null;

// 为ID为'file-input3'的文件输入元素添加'change'事件监听器
document.getElementById('file-input4').onchange = function ({ target: { files } }) {
  // 当文件选择发生变化时，将选中的文件赋值给file变量
  file = files[0];
};

// 为ID为'upload-button3'的按钮元素添加'click'事件监听器
document.getElementById('upload-button4').onclick = async function () {
  if (!file) return;
  // 创建切片   
  // let size = 1024 * 1024 * 10; //10MB 切片大小
  let size = 1024 * 50; //50KB 切片大小
  let fileChunks = [];
  let index = 0 //切片序号
  for(let cur = 0; cur < file.size; cur += size){
    fileChunks.push({
        hash: index++,
        chunk: file.slice(cur, cur + size)
    })
  }
  // 控制并发和断点续传
  const uploadFileChunks = async function(list){
      if(list.length === 0){
          //所有任务完成,合并切片
          await fetch('http://localhost:3000/merge?filename=' + file.name, {
            method: 'GET'
          }).then(res => {
            return res.text();
          }).then(text => {
            alert(text);
          })
          return
      }
      let pool = []//并发池
      let max = 3 //最大并发量
      let finish = 0//完成的数量
      let failList = []//失败的列表
      for(let i=0;i<list.length;i++){
          let item = list[i]
          let formData = new FormData()
          formData.append('filename', file.name)
          formData.append('hash', item.hash)
          formData.append('chunk', item.chunk)
          // 上传切片
          let task = fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
          })
          task.then((data)=>{
              //请求结束后将该Promise任务从并发池中移除
              let index = pool.findIndex(t=> t===task)
              pool.splice(index)
          }).catch(()=>{
              failList.push(item)
          }).finally(()=>{
              finish++
              //所有请求都请求完成
              if(finish===list.length){
                  uploadFileChunks(failList)
              }
          })
          pool.push(task)
          if(pool.length === max){
              //每当并发池跑完一个任务，就再塞入一个任务
              await Promise.race(pool)
          }
      }
  }
  uploadFileChunks(fileChunks)
};
