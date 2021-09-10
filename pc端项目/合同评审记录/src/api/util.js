import html2canvas from 'html2canvas';
import printJs from 'print-js';
// 获取url参数
function parse_url(params){ 
  var reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)", "i");//解析url地址
  var r = window.location.search.substr(1).match(reg);
  if (r != null){
     
      return decodeURIComponent(r[2]);
  }
  return null;
}
//打印
function onPrint(_this,title,styles) {
  const printContent = _this.$refs.print;
  // 获取dom 宽度 高度
  const width = printContent.clientWidth;
  const height = printContent.clientHeight;
  // 创建一个canvas节点
  const canvas = document.createElement('canvas');

  const scale = 4; // 定义任意放大倍数，支持小数；越大，图片清晰度越高，生成图片越慢。
  canvas.width = width * scale; // 定义canvas 宽度 * 缩放
  canvas.height =height * scale; // 定义canvas高度 *缩放
  canvas.style.width = width * scale + 'px';
  canvas.style.height = height * scale + 'px';
  canvas.getContext('2d').scale(scale, scale); // 获取context,设置scale

  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动轴滚动的长度
  const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft; // 获取水平滚动轴的长度

  html2canvas(printContent, {
    canvas,
    backgroundColor: null,
    useCORS: true,
    windowHeight: document.body.scrollHeight,
    scrollX: -scrollLeft, // 解决水平偏移问题，防止打印的内容不全
    scrollY: -scrollTop
  }).then((canvas) => {
    const url = canvas.toDataURL('image/png')
  //   console.log(url)
    printJS({
      printable: url,
      type: 'image',
      header: title, // 标题
      headerStyle:'text-align: center;margin:0px',
      style:styles,
      // style: '@page{size:auto;margin: 0cm 1cm 0cm 1cm;}' // 去除页眉页脚
    })
  }).catch(err=>{
    console.error(err);
  })
}
  // 将四个全局公共方法，组合成一个对象，并暴露出去
  export default {
    parse_url,
    onPrint
  }