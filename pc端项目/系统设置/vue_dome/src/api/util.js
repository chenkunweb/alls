// Uint.js
import * as getData from './getDate';
import pinyin from 'pinyin';
//是否加粗
function blod(_this,e){
  let hot3 = _this.$refs.testHot.hotInstance
  let styleSheets = document.styleSheets[0];
  let indexs = styleSheets.length;
  // 加粗切换
  let font
  if(e ==true){
      font = 'bold'
  }else{
      font = 'normal'
  }
  // 获取选中的每个单元格，赋值class
  let blod = []
  if(_this.row.length ==1||_this.column.length == 1){
      if(_this.row.length ==1){
          _this.column.forEach((item)=>{
              blod.push({
                  blod:'blod'+_this.row+item,
                  rowIndexs:_this.row,
                  columnIndexs:item
              })
              
          })
      }else{
          _this.row.forEach((item)=>{
              blod.push({
                  blod:'blod'+item+_this.column,
                  rowIndexs:item,
                  columnIndexs:_this.column
              })
          })
      }
      
  }else{
      _this.row.forEach((item)=>{
          _this.column.forEach((items)=>{
              blod.push({
                  blod:'blod'+item+items,
                  rowIndexs:item,
                  columnIndexs:items
              })
          })
      })
  }
  _this.index+=1//切换的index递增
  //添加class,设置加粗样式
  blod.forEach((item)=>{
      const rule = item.blod + '-' + _this.index
      _this.blodstate.push({
          state:e,
          rowIndexs:item.rowIndexs,
          columnIndexs:item.columnIndexs
      })
      let BGcolor = '.BG'+item.rowIndexs+item.columnIndexs//颜色class
      let color = '.color'+item.rowIndexs+item.columnIndexs//字体class
      let size = '.size'+item.rowIndexs+item.columnIndexs//字体class
      let BGclass
      for(var i =0;i<styleSheets.cssRules.length;i++){
          if(styleSheets.cssRules[i].selectorText!=undefined){
              
              if(styleSheets.cssRules[i].selectorText.indexOf(BGcolor)!= -1){
                  
                  BGclass = styleSheets.cssRules[i].selectorText
                  break
              }
          }
      }
      if(BGclass!=undefined){
          BGclass = BGclass.split('.')[1]
      }
      let colorclass
      for(var i =0;i<styleSheets.cssRules.length;i++){
          if(styleSheets.cssRules[i].selectorText!=undefined){
              
              if(styleSheets.cssRules[i].selectorText.indexOf(color)!= -1){
                  
                  colorclass = styleSheets.cssRules[i].selectorText
                  break
              }
          }
      }
      if(colorclass!=undefined){
          colorclass = colorclass.split('.')[1]
      }
      let sizeclass
      for(var i =0;i<styleSheets.cssRules.length;i++){
          if(styleSheets.cssRules[i].selectorText!=undefined){
              
              if(styleSheets.cssRules[i].selectorText.indexOf(size)!= -1){
                  
                  sizeclass = styleSheets.cssRules[i].selectorText
                  break
              }
          }
      }
      if(sizeclass!=undefined){
          sizeclass = sizeclass.split('.')[1]
      }
      hot3.setCellMeta(item.rowIndexs,item.columnIndexs,'className',rule+' '+BGclass+' '+colorclass+' '+sizeclass)
      if(styleSheets.insertRule){
          styleSheets.insertRule("."+rule+`{font-weight:${font}`, indexs);
      }else{  
          styleSheets.addRule("."+rule, `font-weight:${font}`, indexs);
      }
      
  })
  hot3.render();
}
// 改变字体大小
function size(_this,e){
  let hot3 = _this.$refs.testHot.hotInstance
                let styleSheets = document.styleSheets[0];
                let indexs = styleSheets.length;
                let blod = []
                if(_this.row.length ==1||_this.column.length == 1){
                    if(_this.row.length ==1){
                        _this.column.forEach((item)=>{
                            blod.push({
                                blod:'size'+_this.row+item,
                                rowIndexs:_this.row,
                                columnIndexs:item
                            })
                            
                        })
                    }else{
                        _this.row.forEach((item)=>{
                            blod.push({
                                blod:'size'+item+_this.column,
                                rowIndexs:item,
                                columnIndexs:_this.column
                            })
                        })
                    }
                    
                }else{
                    _this.row.forEach((item)=>{
                        _this.column.forEach((items)=>{
                            blod.push({
                                blod:'size'+item+items,
                                rowIndexs:item,
                                columnIndexs:items
                            })
                        })
                    })
                }
                _this.index+=1//切换的index递增
                //添加class,设置加粗样式
                blod.forEach((item)=>{
                    const rule = item.blod + '-' + _this.index
                    _this.sizestate.push({
                        state:e,
                        rowIndexs:item.rowIndexs,
                        columnIndexs:item.columnIndexs
                    })
                    let BGcolor = '.BG'+item.rowIndexs+item.columnIndexs//颜色class
                    let color = '.color'+item.rowIndexs+item.columnIndexs//字体class
                    let blod = '.blod'+item.rowIndexs+item.columnIndexs//字体class
                    let BGclass//背景颜色
                    for(var i =0;i<styleSheets.cssRules.length;i++){
                        if(styleSheets.cssRules[i].selectorText!=undefined){
                            
                            if(styleSheets.cssRules[i].selectorText.indexOf(BGcolor)!= -1){
                                
                                BGclass = styleSheets.cssRules[i].selectorText
                                break
                            }
                        }
                    }
                    if(BGclass!=undefined){
                        BGclass = BGclass.split('.')[1]
                    }
                    let colorclass//颜色
                    for(var i =0;i<styleSheets.cssRules.length;i++){
                        if(styleSheets.cssRules[i].selectorText!=undefined){
                            
                            if(styleSheets.cssRules[i].selectorText.indexOf(color)!= -1){
                                
                                colorclass = styleSheets.cssRules[i].selectorText
                                break
                            }
                        }
                    }
                    if(colorclass!=undefined){
                        colorclass = colorclass.split('.')[1]
                    }
                    let blodclass//加粗
                    for(var i =0;i<styleSheets.cssRules.length;i++){
                        if(styleSheets.cssRules[i].selectorText!=undefined){
                            
                            if(styleSheets.cssRules[i].selectorText.indexOf(blod)!= -1){
                                
                                blodclass = styleSheets.cssRules[i].selectorText
                                break
                            }
                        }
                    }
                    if(blodclass!=undefined){
                        blodclass = blodclass.split('.')[1]
                    }
                    
                    hot3.setCellMeta(item.rowIndexs,item.columnIndexs,'className',rule+' '+BGclass+' '+colorclass+' '+blodclass)
                    if(styleSheets.insertRule){
                        styleSheets.insertRule("."+rule+`{font-size:${e}`, indexs);
                    }else{  
                        styleSheets.addRule("."+rule, `font-size:${e}`, indexs);
                    }
                    
                })
                hot3.render();
}
// 改变颜色
function headleChangeColor(_this,e){
  let hot3 = _this.$refs.testHot.hotInstance
                let styleSheets = document.styleSheets[0];
                let indexs = styleSheets.length;
                // 获取选中的每个单元格，赋值class
                let blod = []
                if(_this.row.length ==1||_this.column.length == 1){
                    if(_this.row.length ==1){
                        _this.column.forEach((item)=>{
                            blod.push({
                                blod:'color'+_this.row+item,
                                rowIndexs:_this.row,
                                columnIndexs:item
                            })
                            
                        })
                    }else{
                        _this.row.forEach((item)=>{
                            blod.push({
                                blod:'color'+item+_this.column,
                                rowIndexs:item,
                                columnIndexs:_this.column
                            })
                        })
                    }
                    
                }else{
                    _this.row.forEach((item)=>{
                        _this.column.forEach((items)=>{
                            blod.push({
                                blod:'color'+item+items,
                                rowIndexs:item,
                                columnIndexs:items
                            })
                        })
                    })
                }
                _this.index+=1//切换的index递增
                //添加class,设置加粗样式
                blod.forEach((item)=>{
                    const rule = item.blod + '-' + _this.index
                    _this.state.push({
                        state:e,
                        rowIndexs:item.rowIndexs,
                        columnIndexs:item.columnIndexs
                    })
                    let BGcolor = '.BG'+item.rowIndexs+item.columnIndexs//颜色class
                    let blod = '.blod'+item.rowIndexs+item.columnIndexs//字体class
                    let size = '.size'+item.rowIndexs+item.columnIndexs//字体class
                    let BGclass
                    for(var i =0;i<styleSheets.cssRules.length;i++){
                        if(styleSheets.cssRules[i].selectorText!=undefined){
                            
                            if(styleSheets.cssRules[i].selectorText.indexOf(BGcolor)!= -1){
                                
                                BGclass = styleSheets.cssRules[i].selectorText
                                break
                            }
                        }
                    }
                    if(BGclass!=undefined){
                        BGclass = BGclass.split('.')[1]
                    }
                    let blodclass
                    for(var i =0;i<styleSheets.cssRules.length;i++){
                        if(styleSheets.cssRules[i].selectorText!=undefined){
                            
                            if(styleSheets.cssRules[i].selectorText.indexOf(blod)!= -1){
                                
                                blodclass = styleSheets.cssRules[i].selectorText
                                break
                            }
                        }
                    }
                    if(blodclass!=undefined){
                        blodclass = blodclass.split('.')[1]
                    }
                    let sizeclass
                    for(var i =0;i<styleSheets.cssRules.length;i++){
                        if(styleSheets.cssRules[i].selectorText!=undefined){
                            
                            if(styleSheets.cssRules[i].selectorText.indexOf(size)!= -1){
                                
                                sizeclass = styleSheets.cssRules[i].selectorText
                                break
                            }
                        }
                    }
                    if(sizeclass!=undefined){
                        sizeclass = sizeclass.split('.')[1]
                    }
                    hot3.setCellMeta(item.rowIndexs,item.columnIndexs,'className',rule+' '+BGclass+' '+blodclass+' '+sizeclass)
                    if(styleSheets.insertRule){
                        styleSheets.insertRule("."+rule+`{color:${e} !important`, indexs);
                    }else{  
                        styleSheets.addRule("."+rule, `color:${e} !important`, indexs);
                    }
                    
                })
                hot3.render();   
}
// 改变字体颜色
function headleChangeBGColor(_this,e){
  let hot3 = _this.$refs.testHot.hotInstance
                let styleSheets = document.styleSheets[0];
                let indexs = styleSheets.length;
                // 获取选中的每个单元格，赋值class
                let blod = []
                if(_this.row.length ==1||_this.column.length == 1){
                    if(_this.row.length ==1){
                        _this.column.forEach((item)=>{
                            blod.push({
                                blod:'BG'+_this.row+item,
                                rowIndexs:_this.row,
                                columnIndexs:item
                            })
                            
                        })
                    }else{
                        _this.row.forEach((item)=>{
                            blod.push({
                                blod:'BG'+item+_this.column,
                                rowIndexs:item,
                                columnIndexs:_this.column
                            })
                        })
                    }
                    
                }else{
                    _this.row.forEach((item)=>{
                        _this.column.forEach((items)=>{
                            blod.push({
                                blod:'BG'+item+items,
                                rowIndexs:item,
                                columnIndexs:items
                            })
                        })
                    })
                }
                _this.index+=1//切换的index递增
                //添加class,设置样式
                blod.forEach((item)=>{
                    const rule = item.blod + '-' + _this.index
                    _this.BGstate.push({
                        state:e,
                        rowIndexs:item.rowIndexs,
                        columnIndexs:item.columnIndexs
                    })
                    let color = '.color'+item.rowIndexs+item.columnIndexs//颜色class
                    let blod = '.blod'+item.rowIndexs+item.columnIndexs//字体class
                    let size = '.size'+item.rowIndexs+item.columnIndexs//字体class
                    let colorclass
                    for(var i =0;i<styleSheets.cssRules.length;i++){
                        if(styleSheets.cssRules[i].selectorText!=undefined){
                            
                            if(styleSheets.cssRules[i].selectorText.indexOf(color)!= -1){
                                
                                colorclass = styleSheets.cssRules[i].selectorText
                                break
                            }
                        }
                    }
                    if(colorclass!=undefined){
                        colorclass = colorclass.split('.')[1]
                    }
                    let blodclass
                    for(var i =0;i<styleSheets.cssRules.length;i++){
                        if(styleSheets.cssRules[i].selectorText!=undefined){
                            
                            if(styleSheets.cssRules[i].selectorText.indexOf(blod)!= -1){
                                
                                blodclass = styleSheets.cssRules[i].selectorText
                                break
                            }
                        }
                    }
                    if(blodclass!=undefined){
                        blodclass = blodclass.split('.')[1]
                    }
                    let sizeclass
                    for(var i =0;i<styleSheets.cssRules.length;i++){
                        if(styleSheets.cssRules[i].selectorText!=undefined){
                            
                            if(styleSheets.cssRules[i].selectorText.indexOf(size)!= -1){
                                
                                sizeclass = styleSheets.cssRules[i].selectorText
                                break
                            }
                        }
                    }
                    if(sizeclass!=undefined){
                        sizeclass = sizeclass.split('.')[1]
                    }
                    hot3.setCellMeta(item.rowIndexs,item.columnIndexs,'className',rule+' '+colorclass+' '+blodclass+' '+sizeclass)
                    if(styleSheets.insertRule){
                        styleSheets.insertRule("."+rule+`{background-color:${e} !important`, indexs);
                    }else{  
                        styleSheets.addRule("."+rule, `background-color:${e} !important`, indexs);
                    }
                    
                })
                hot3.render();
}
//下载文件
function click(_this,title){
  let time = getData.dateUtils.today({ymrSign:true})
  var exportPlugin1 = _this.a.getPlugin('exportFile');
  exportPlugin1.downloadFile('csv', {
      bom: 'UTF-8',
      columnDelimiter: ',',
      columnHeaders: true,
      rowHeaders:false,
      exportHiddenColumns: false,
      exportHiddenRows: false,
      fileExtension: 'csv',
      filename: title+time,
      mimeType: 'text/csv',
      rowDelimiter: '\r\n',
  });
}
//获取url参数
function parse_url(){ 
    let url = window.location.href
    var pattern = /(\w+)=(\w+)/ig;
    console.log(url)
    var parames = {};
    url.replace(pattern, function(a, b, c){parames[b] = c;});
    return parames;
}
//根据字母排序
function name_sort(list) {
    let w_users = []; //字母开头
    let n_users = []; //数字 or 符号

    list.forEach(item => {
        let first_word = pinyin(item.name, {
            style: pinyin.STYLE_FIRST_LETTER
        });
        first_word = first_word[0][0];
        first_word = first_word.substr(0, 1);
        item.nick_name_sort = first_word + item.name;//增加一个临时排序属性, 不然排序后还要处理原属性
        let regx = /^[A-Za-z]*$/; //正则匹配出字母开头的
        let flag = regx.test(first_word);
        flag && w_users.push(item) || n_users.push(item); //根据类型决定存入哪个数组
    })

    //利用新增的nick_name_sort排序
    w_users.sort((a,b) => a.nick_name_sort.substr(0, 1).toLowerCase().charCodeAt(0) - b.nick_name_sort.substr(0, 1).toLowerCase().charCodeAt(0));
    n_users.sort((a,b) => a.nick_name_sort.substr(0, 1).toLowerCase().charCodeAt(0) - b.nick_name_sort.substr(0, 1).toLowerCase().charCodeAt(0));
    var res = w_users.sort(function(a,b){ return a.name.localeCompare(b.name)})
    let sort_list = w_users.concat(n_users);
    return sort_list;
}
function deprant(params){
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
    ]
    let deprants
    list.forEach((item)=>{
      if(params==item.id){
        deprants = item
      }
    })
    return deprants
  }
  function userList(list,id){
    //   console.log(list)
    //   console.log(id)
      let lables = ''
      list.some((item)=>{
          if(item.userid==id){
            //   console.log(item)
            return lables = item.label
          }
      })
      return lables
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
        flexWidth += 7
      } else if (char >= '\u4e00' && char <= '\u9fa5') {
        // 如果是中文字符，为字符分配15个单位宽度
        flexWidth += 14 
      } else {
        // 其他种类字符，为字符分配8个单位宽度
        flexWidth += 7
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
    return flexWidth + 'px'
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
    if(num>=80&num<81){jxfList = 'A81' }
    if(num>=81&num<82){jxfList = 'A82' }
    if(num>=82&num<83){jxfList = 'A83' }
    if(num>=83&num<84){jxfList = 'A84' }
    if(num>=84&num<85){jxfList = 'A85' }
    if(num>=85&num<86){jxfList = 'A86' }
    if(num>=86&num<87){jxfList = 'A87' }
    if(num>=87&num<88){jxfList = 'A88' }
    if(num>=88&num<89){jxfList = 'A89' }
    if(num>=89&num<90){jxfList = 'A90' }
    if(num>=90&num<91){jxfList = 'A91'}
    if(num>=91&num<92){jxfList = 'A92'}
    if(num>=92&num<93){jxfList = 'A93'}
    if(num>=93&num<94){jxfList = 'A94'}
    if(num>=94&num<95){jxfList = 'A95'}
    if(num>=95&num<96){jxfList = 'A96'}
    if(num>=96&num<97){jxfList = 'A97'}
    if(num>=97&num<98){jxfList = 'A98'}
    if(num>=98&num<99){jxfList = 'A99'}
    if(num>=99&num<100){jxfList = 'A100'}
    if(num>=100){ jxfList = 'A105' }
    return jxfList
}
  
  // 将四个全局公共方法，组合成一个对象，并暴露出去
  export default {
    blod,
    size,
    headleChangeBGColor,
    headleChangeColor,
    click,
    parse_url,
    name_sort,
    flexColumnWidth,
    deprant,
    userList,
    jxf
    
  }