// 获取url参数
function parse_url(params){ 
  var reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)", "i");//解析url地址
  var r = window.location.search.substr(1).match(reg);
  if (r != null){
     
      return decodeURIComponent(r[2]);
  }
  return null;
}
function isType(params){
  // console.log()
  let list = [
    {id:'1',name:'生产入库'},
    {id:'2',name:'电镀'},
    {id:'3',name:'外协'},
    {id:'4',name:'返修入库'},
   
  ]
  let deprants
  list.forEach((item)=>{
    if(params==item.id||params==item.name){
      deprants = item
    }
  })
  return deprants
}
function isShf(params){
  // console.log()
  let list = [
    {id:'1',name:'电镀'},
    {id:'2',name:'宗泰仓库'},
    {id:'3',name:'宗联机仓库'},
    {id:'4',name:'宗泰宗联机'},
   
  ]
  let deprants
  list.forEach((item)=>{
    if(params==item.id||params==item.name){
      deprants = item
    }
  })
  return deprants
}
  // 将四个全局公共方法，组合成一个对象，并暴露出去
  export default {
    parse_url,
    isType,
    isShf
  }