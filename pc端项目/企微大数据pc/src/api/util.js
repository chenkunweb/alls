// 获取url参数
function parse_url(params){ 
    var reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)", "i");//解析url地址
    var r = window.location.search.substr(1).match(reg);
    if (r != null){
       
        return decodeURIComponent(r[2]);
    }
    return null;
  }
function deWeight(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].id == arr[j].id) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}
export default {
    parse_url,
    deWeight
  }