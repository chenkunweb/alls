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
  function flexColumnWidth(str, tableData, flag = 'max') {
    // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
    // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
    // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
    str = str + ''
    let columnContent = ''
    if (!tableData || !tableData.length || tableData.length === 0 || tableData === undefined) {
      return
    }
    if (!str || !str.length || str.length === 0 || str === undefined) {
      return
    }
    if (flag === 'equal') {
      // 获取该列中第一个不为空的数据(内容)
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i][str].length > 0) {
          // console.log('该列数据[0]:', tableData[0][str])
          columnContent = tableData[i][str]
          break
        }
      }
    } else {
      // 获取该列中最长的数据(内容)
      let index = 0
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i][str] === null) {
          return
        }
        const now_temp = tableData[i][str] + ''
        const max_temp = tableData[index][str] + ''
        if (now_temp.length > max_temp.length) {
          index = i
        }
      }
      columnContent = tableData[index][str]
    }
    // console.log('该列数据[i]:', columnContent)
    // 以下分配的单位长度可根据实际需求进行调整
    let flexWidth = 0
    for (const char of columnContent) {
      if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
        // 如果是英文字符，为字符分配8个单位宽度
        flexWidth += 8
      } else if (char >= '\u4e00' && char <= '\u9fa5') {
        // 如果是中文字符，为字符分配15个单位宽度
        flexWidth += 15
      } else {
        // 其他种类字符，为字符分配8个单位宽度
        flexWidth += 8
      }
    }
    if (flexWidth < 80) {
      // 设置最小宽度
      flexWidth = 80
    }
    // if (flexWidth > 250) {
    //   // 设置最大宽度
    //   flexWidth = 250
    // }
    return flexWidth + 30 + 'px'
  }
  // 获取url参数
function parse_url(params){ 
  var reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)", "i");//解析url地址
  var r = window.location.search.substr(1).match(reg);
  if (r != null){
     
      return decodeURIComponent(r[2]);
  }
  return null;
}
  export default {
    flexColumnWidth,
    deprant,
    parse_url
  }