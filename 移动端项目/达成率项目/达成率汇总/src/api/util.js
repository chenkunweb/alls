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
function jisuan(allnum){
  if(allnum>=0&allnum<=10){return allnum}
  if(allnum>=11&allnum<=101){return Math.round(allnum*0.99)}
  if(allnum>=101&allnum<=500){return Math.round(allnum*0.98)}
  if(allnum>=501&allnum<=1000){return Math.round(allnum*0.97)}
  if(allnum>=1001&allnum<=5000){return Math.round(allnum*0.96)}
  if(allnum>=5001){return Math.round(allnum*0.95)}
}
function jxf(num){
  let jxfList
  if(num>=0&num<5){jxfList = 'A05'}
  if(num>=5&num<10){jxfList = 'A10'}
  if(num>=10&num<15){jxfList = 'A15' }
  if(num>=15&num<20){jxfList = 'A20' }
  if(num>=20&num<25){jxfList = 'A25' }
  if(num>=25&num<30){jxfList = 'A30' }
  if(num>=30&num<35){jxfList = 'A35' }
  if(num>=35&num<40){jxfList = 'A40' }
  if(num>=40&num<45){jxfList = 'A45'}
  if(num>=45&num<50){jxfList = 'A50'}
  if(num>=50&num<55){jxfList = 'A55'}
  if(num>=55&num<60){jxfList = 'A60'}
  if(num>=60&num<65){jxfList = 'A65' }
  if(num>=65&num<70){jxfList = 'A70' }
  if(num>=70&num<75){jxfList = 'A75' }
  if(num>=75&num<80){jxfList = 'A80' }
  if(num>=80&num<85){jxfList = 'A85'}
  if(num>=85&num<90){jxfList = 'A90'}
  if(num>=90&num<95){ jxfList = 'A95' }
  if(num>=95&num<100){ jxfList = 'A100' }
  if(num>=100){ jxfList = 'A105' }
  return jxfList
}
function dcl(bm,start,end,_this){
  bm.forEach(async(item)=>{
    
    if(item.ERP部门.replace(/\s+/g, "")!=''){
      let wc = item.ERP部门代号
      let name = item.ERP部门
      let data = {bm:wc,date1:start,date2:end}
      let zf_list = JSON.parse(await _this.$api.api.get('/api/HT2',data)).Table
      console.log(zf_list)
      if(zf_list!=''){
        let objs = {};
        zf_list.forEach((item, index) => {
          let jiaoqi = item.交期.replace(/\s+/g, "")
            if (!objs[jiaoqi]) {
                objs[jiaoqi] = []
            }
            objs[jiaoqi].push(item);
        });
        let all_lists = Object.values(objs)//日达成率数据
        all_lists.forEach((items)=>{
          items.forEach((itemss)=>{
            let gongdan = itemss.工单号.replace(/\s+/g, "")
            let shuliang = itemss.数量*1
            let jiaoqi = itemss.交期.replace(/\s+/g, "")
            let wancheng = itemss.完成数量*1
            let ck_wancheng = itemss.审核状态*1
            let quxiao = itemss.取消数量*1
            let max_num = wancheng
            let ckmax_num = ck_wancheng
            let 审核结果 = itemss.异况审核==null?'':itemss.异况审核.replace(/\s+/g, "")
            let 品质审核结果 = itemss.品质审核结果==null?'':itemss.品质审核结果.replace(/\s+/g, "")
            if(品质审核结果=='合格'||品质审核结果=='特采'){itemss.完成3 = 1}
            //完成--柔性
            //完成1--刚性
            //完成2--仓库
            //完成3--品质
            if(ckmax_num>=shuliang){
              if(itemss.报数日期!=null){
                let 报数日期 = itemss.报数日期.substring(0,10)
                if(报数日期<=jiaoqi){
                  itemss.完成2=1;
                }
              }else{
                itemss.完成2=1;
              }
            }
            if(max_num>=shuliang){
              if(itemss.报数日期!=null){
                let 报数日期 = itemss.报数日期.substring(0,10)
                if(报数日期<=jiaoqi){
                  itemss.完成=1;itemss.完成1=1;
                }
              }else{
                itemss.完成=1;itemss.完成1=1;
              }
            }
            if(审核结果=='同意'){
              itemss.完成=1
            }
        
          })
          
        })
        
        let 柔性总绩效分 = 0,刚性总绩效分 = 0,仓库总绩效分 = 0,品质总绩效分 = 0
        let 柔性总完成 = 0,刚性总完成 = 0,仓库总完成 = 0,品质总完成 = 0
        let 总条 = zf_list.length
        all_lists.forEach((items)=>{
          let 柔性日总完成 = 0,刚性日总完成 = 0,仓库日总完成 = 0,品质日总完成 = 0
          // let 日达成率条 = 
          items.forEach((itemss)=>{
            if(itemss.完成==1){柔性日总完成+=1}
            if(itemss.完成1==1){刚性日总完成+=1}
            if(itemss.完成2==1){仓库日总完成+=1}
            if(itemss.完成3==1){品质日总完成+=1}
          })
          let 柔性日达成率 = Math.floor((柔性日总完成/items.length) * 100)
          let 刚性日达成率 = Math.floor((刚性日总完成/items.length) * 100)
          let 仓库日达成率 = Math.floor((仓库日总完成/items.length) * 100)
          let 品质日达成率 = Math.floor((品质日总完成/items.length) * 100)
          let rjxf=0,gjxf=0,cjxf=0
          if(柔性日达成率<98){
            if(柔性日达成率>=90&柔性日达成率<98){
              rjxf = (98-柔性日达成率)*0.5
            }else{
              rjxf = (98-柔性日达成率)*1
            }
          }
          // rjxf = (rjxffun(name,_this).扣分起点.split('%')[0]*1-柔性日达成率)*rjxffun(name,_this).每百分点扣分*1
          _this.$store.state.jxfLists.forEach((jxfs)=>{
            if(name ==jxfs.部门.replace(/\s+/g, "")&jxfs.类型.replace(/\s+/g, "")=='刚性'){
              if(_this.util.jxf(刚性日达成率)==undefined){
                gjxf = 0
                cjxf = 0
              }else{
                gjxf = jxfs[_this.util.jxf(刚性日达成率)]*1
                cjxf = jxfs[_this.util.jxf(仓库日达成率)]*1
              }
            }
          })
          
          let 柔性日绩效分 = -rjxf
          if(rjxf=0){柔性日绩效分 = 0}
          let 刚性日绩效分 = gjxf
          let 仓库日绩效分 = cjxf

          柔性总绩效分+=柔性日绩效分
          刚性总绩效分+=刚性日绩效分
          仓库总绩效分+=仓库日绩效分
          
          柔性总完成+=柔性日总完成
          刚性总完成+=刚性日总完成
          仓库总完成+=仓库日总完成
          品质总完成+=品质日总完成
          items.柔性日达成率条 = items.length
          items.刚性日达成率条 = items.length   
          items.仓库日达成率条 = items.length
          items.品质日达成率条 = items.length
          items.柔性日达成率 = 柔性日达成率
          items.刚性日达成率 = 刚性日达成率
          items.仓库日达成率 = 仓库日达成率
          items.品质日达成率 = 品质日达成率
          items.柔性日绩效分 = 柔性日绩效分
          items.刚性日绩效分 = 刚性日绩效分
          items.仓库日绩效分 = 仓库日绩效分
          items.交期 = items[0].交期
          items.柔性日总完成 = 柔性日总完成
          items.刚性日总完成 = 刚性日总完成
          items.仓库日总完成 = 仓库日总完成
          items.品质日总完成 = 品质日总完成
        })
        let 实时完工批次 = 刚性总完成
        let 合计绩效 = 实时完工批次*1+Math.round(柔性总绩效分*10)/10+Math.round(刚性总绩效分*10)/10
        let 柔性总达成率 = Math.floor((柔性总完成/总条) * 100)
        let 刚性总达成率 = Math.floor((刚性总完成/总条) * 100)
        let 仓库总达成率 = Math.floor((仓库总完成/总条) * 100)
        let 品质总达成率 = Math.floor((品质总完成/总条) * 100)
        let all_data = []
        all_lists.forEach((items)=>{
          all_data.push({
            交期:items.交期.replace(/\s+/g, ""),
            车间:items[0].车间.replace(/\s+/g, ""),
            柔性总达成率:柔性总达成率+'%',
            刚性总达成率:刚性总达成率+'%',
            仓库总达成率:仓库总达成率+'%',
            品质总达成率:品质总达成率+'%',
            柔性总绩效分:Math.round(柔性总绩效分*10)/10,
            刚性总绩效分:Math.round(刚性总绩效分*10)/10,
            仓库总绩效分:Math.round(仓库总绩效分*10)/10,
            品质总绩效分:' * ',
            柔性日达成率:items.柔性日达成率+'%',
            刚性日达成率:items.刚性日达成率+'%',
            仓库日达成率:items.仓库日达成率+'%',
            品质日达成率:items.品质日达成率+'%',
            柔性日绩效分:items.柔性日绩效分,
            刚性日绩效分:items.刚性日绩效分,
            仓库日绩效分:items.仓库日绩效分,
            实时完工批次:实时完工批次,
            合计绩效:合计绩效,
            品质日绩效分:' * ',
          })
        })
        let list = all_data.sort(function(a, b) {
          return b.交期 < a.交期 ? 1 : -1
        })
        _this.tableData.push({
          部门:name,
          list:list
        })
        
      }
    }
  })
}
function rjxffun(bm,_this){
 
 
  let list
  _this.$store.state.rjxfLists.forEach((item)=>{
    if(bm == item.部门.replace(/\s+/g, "")){
      list = item
    }
  })
  return list
}
  // 将四个全局公共方法，组合成一个对象，并暴露出去
  export default {
    parse_url,
    dateFormat,
    flexColumnWidth,
    jisuan,
    jxf,
    dcl,
    rjxffun
  }