// 获取url参数
function parse_url(){ 
    let url = window.location.href
    var pattern = /(\w+)=(\w+)/ig;
    console.log(url)
    var parames = {};
    url.replace(pattern, function(a, b, c){parames[b] = c;});
    return parames;
}
//部门
function deprant(params){
  // console.log()
  let list = [
    {id:'WC01',name:'注塑'},
    {id:'WC02',name:'五金'},
    {id:'WC03',name:'机加'},
    {id:'WC04',name:'电线'},
    {id:'WC05',name:'电装'},
    {id:'WC11',name:'电镀'},
    {id:'WC12',name:'宗联机'},
    {id:'样品',name:'样品'},
    {id:'治具',name:'治具'},
    {id:'外协',name:'外协'},
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
    deprant
  }