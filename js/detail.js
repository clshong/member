// 查询字符串
// location.search
// 写一个函数：把查询字符串转成对象，?id='456' {id:456}
function qs(search){
  search = search.replace('?','')
  const arr = search.split('&')
  const obj ={}
  arr.forEach(item => {
    const tmpArr = item.split('=')
    if(tmpArr.length === 2){
      const key = tmpArr[0]
      const value = tmpArr[1]
      obj[key] = value
    }
  })
  return obj
}

const query = qs(location.search)
const id = query.id

axios({
  method:'GET',
  url:'/member-detail',
  params:{
    id
  }
})
.then(res => {
  const {code,data} = res.data
  if(code === 200 ){
    // 数据获取成功
    const html = template('tmp',{
      member:data
    })
    document.querySelector('#detail').innerHTML = html
  }else{
    // 数据获取失败
    alert('获取数据失败')
  }
})
.catch(err => {
  console.log(err);
})