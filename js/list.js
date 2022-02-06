// 1.会员列表
function loadList(){
  axios({
  method:'GET',
  url:'/member-list-page'
  })
  .then( res => {
      const {code,data} = res.data
      if(code === 200){
        // 模板引擎渲染数据
        let html = template('tmp',{
          members:data,
        })
        // 把渲染的数据呈现在页面上
        document.querySelector('#members').innerHTML = html
      }else{
        alert('请求数据失败')
      }
  })
  .catch( err =>{
    console.log(err);
  })
}

loadList()

// 2.删除会员
let members = document.querySelector('#members')
members.onclick = function(e){
  if(e.target.classList.contains('text-danger')){
    // 取消后续代码执行
    e.preventDefault();
    // 提示用户是否删除数据
    if(!confirm('是否删除数据')) return
    // 获取删除数据的id
    const id = e.target.dataset.id
    // 如果是删除按钮
    axios({
      method:'DELETE',
      url:'/member-delete',
      params:{
        id:id
      }
    })
    .then(res => {
      const {code,message} = res.data
      if(code === 200){
        // 删除成功更新列表
        loadList()
      }else{
        // 删除失败的原因
        alert(message)
      }
    })
    .catch(err =>{
      console.log(err);
    })
  }
}
