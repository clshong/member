// 1.会员列表
// function loadList(){
//   axios({
//     method:'GET',
//     url:'/member-list-page'
//     })
//     .then( res => {
//         const {code,data} = res.data
//         if(code === 200){
//           // 模板引擎渲染数据
//           let html = template('tmp',{
//             members:data,
//           })
//           // 把渲染的数据呈现在页面上
//           document.querySelector('#members').innerHTML = html
//         }else{
//           alert('请求数据失败')
//         }
//     })
//     .catch( err =>{
//       console.log(err);
//     })
// }

// loadList()
let last = null
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
        // 删除成功,加载第一页数据
        last = null
        axios({
          method:'GET',
          url:'/member-list-last',
          params:{
            last:last
          }
          })
          .then( res => {
              const {code,data} = res.data
              if(code === 200){
                // 模板引擎渲染数据
                let html = template('tmp',{
                  members:data,
                })
                // 记录下来最后一条数据ID
                last = data[data.length - 1 ].id
                // 把渲染的数据呈现在页面上
                document.querySelector('#members').innerHTML = html
              }else{
                alert('请求数据失败')
              }
              // 执行完毕
              loading =false
          })
          .catch( err =>{
            console.log(err);
          })
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

//根据最后一条数据获取会员列表

window.onscroll = function(){
      // 文档高度
      let docHeight = document.documentElement.scrollHeight;
      // 浏览器可视区域高度
      let winHeight = document.documentElement.clientHeight;
      // 文档滚出去的距离
      let offset = document.documentElement.scrollTop;
      if(docHeight - winHeight - offset >= 100) return
      // 文档在浏览器外面距离如果不到 100px 则去加载下一页数据
      // 正在加载就不调用loadList
  if(!loading){
    loadList()
  }
}
function loadList(){
  // 正在执行
  loading = true
  axios({
    method:'GET',
    url:'/member-list-last',
    params:{
      last:last
    }
    })
    .then( res => {
        const {code,data} = res.data
        if(code === 200){
          // 模板引擎渲染数据
          let html = template('tmp',{
            members:data,
          })
          // 记录下来最后一条数据ID
          last = data[data.length - 1 ].id
          // 把渲染的数据呈现在页面上
          document.querySelector('#members').innerHTML += html
        }else{
          alert('请求数据失败')
        }
        // 执行完毕
        loading =false
    })
    .catch( err =>{
      console.log(err);
    })
}
loadList()