// 获取url参数
function parse_url(){ 
    let url = window.location.href
    var pattern = /(\w+)=(\w+)/ig;
    console.log(url)
    var parames = {};
    url.replace(pattern, function(a, b, c){parames[b] = c;});
    return parames;
}
  // 将四个全局公共方法，组合成一个对象，并暴露出去
  export default {
    parse_url,
  }