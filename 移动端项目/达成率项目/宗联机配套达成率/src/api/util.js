// 获取url参数
function parse_url(params){ 
  var reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)", "i");//解析url地址
  var r = window.location.search.substr(1).match(reg);
  if (r != null){
     
      return decodeURIComponent(r[2]);
  }
  return null;
}
function dateFormat(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        opt[k] = opt[k]<10?'0'+opt[k]:opt[k]
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k]))
      };
  };
  return fmt;
}
function flexColumnWidth(str, tableData, flag = 'max') {
  // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
  // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
  // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
  str = str + ''
  console.log(str)
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
        columnContent = tableData[i][str].replace(/\s+/g, "")
        break
      }
    }
  } else {
    // 获取该列中最长的数据(内容)
    let index = 0
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i][str].replace(/\s+/g, "") === null) {
        return
      }
      const now_temp = tableData[i][str].replace(/\s+/g, "") + ''
      const max_temp = tableData[index][str].replace(/\s+/g, "") + ''
      if (now_temp.length > max_temp.length) {
        index = i
      }
    }
    columnContent = tableData[index][str].replace(/\s+/g, "")
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
function jisuan(allnum){
  if(allnum>=0&allnum<=10){return allnum}
  if(allnum>=11&allnum<=101){return Math.round(allnum*0.99)}
  if(allnum>=101&allnum<=500){return Math.round(allnum*0.98)}
  if(allnum>=501&allnum<=1000){return Math.round(allnum*0.97)}
  if(allnum>=1001&allnum<=5000){return Math.round(allnum*0.96)}
  if(allnum>=5001){return Math.round(allnum*0.95)}
}
 function dcl(all){
  
  if(all!=''){
    all.forEach((item)=>{
      let jiaoqi = item.交期.replace(/\s+/g, "")
      let riqi = item.生产日期.replace(/\s+/g, "")
      let gongdan = item.工单号.replace(/\s+/g, "")
      let shuliang = item.数量.replace(/\s+/g, "")
      let xinghao = item.产品型号.replace(/\s+/g, "")
      let ckmax_num = item.审核状态*1
      let max_num = item.完成数量*1
      let 审核结果 = item.异况审核==null?'':item.异况审核.replace(/\s+/g, "")
      let 品质审核结果 = item.品质审核结果==null?'':item.品质审核结果.replace(/\s+/g, "")
      if(品质审核结果=='合格'||品质审核结果=='特采'){item.完成3 = '已完成'}else{item.完成3 = '未完成'}
      //完成--柔性
      //完成1--刚性
      //完成2--仓库
      //完成3--品质
      if(ckmax_num>=shuliang){
        if(item.报数日期!=null){
          let 报数日期 = item.报数日期.substring(0,10)
          if(报数日期<=jiaoqi){
            item.完成2='已完成';
          }else{
            item.完成2='未完成';
          }
        }else{
          item.完成2='已完成';
        }
      }else{
        item.完成2='未完成';
      }
      if(max_num>=shuliang){
        if(item.报数日期!=null){
          let 报数日期 = item.报数日期.substring(0,10)
          if(报数日期<=jiaoqi){
            item.完成='已完成';item.完成1='已完成';
          }else{
            item.完成='未完成';item.完成1='未完成';
          }
        }else{
          item.完成='已完成';item.完成1='已完成';
        }
      }else{
        item.完成='未完成';item.完成1='未完成';
      }
      if(审核结果=='同意'){
        item.完成='已完成'
      }
    })
  }
  return all
}
  // 将四个全局公共方法，组合成一个对象，并暴露出去
  export default {
    parse_url,
    dateFormat,
    flexColumnWidth,
    jisuan,
    dcl
  }