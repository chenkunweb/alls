// Uint.js
import * as getData from './getDate';
import html2canvas from 'html2canvas';
import printJs from 'print-js';
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
//右键菜单 contextMenu
function contextMenu(_this,Rows,inds){
    return {
        items: {
            "cut": {name: '剪切'},
            "copy": {name: '复制' ,},
            "nian": {
                name: '黏贴' ,
                callback: function(key, selection, clickEvent) {
                    if(this.copyRow+this.copyData.length>Rows){
                        _this.$dialog({ message: '最多只能保存五个数据，请重新复制' });
                        return 
                    }
                    this.copyData.forEach((item,index)=>{
                        item.forEach((items)=>{
                          
                            if(this.copyRow+index>=Rows){
                                return false
                            }
                            console.log(this.copyRow+index)
                            console.log(items.type)
                            console.log(items.name)
                            this.getSourceData()[this.copyRow+index][items.type]=items.name
                            this.contentParst = 1
                            this.render();
                        })
                    })
                },
                disabled: function () { 
                    return this.copyLenght === undefined||this.contentParst === 1; 
                }
            },
            
            "sp1": { name: '---------' },
            
            
            "remove_row": {
                name: ['清空这行内容'],
                callback: function(key, selection, clickEvent) {
                   console.log( this.getSourceData()[this.copyRow])
                   for(var i in this.getSourceData()[this.copyRow]){
                       console.log(i)
                       this.getSourceData()[this.copyRow][i]=''
                   }
                //    this.spliceRow(this.copyRow,)
                //    this.getSourceData()[this.copyRow] =''
                   this.render();
                },
                disabled: function () { 
                    if(inds===1){
                        return this.copyRow===Rows;
                    }else{
                        return this.copyRow===0||this.copyRow===1||this.copyRow===Rows;
                    }
                     
                }
            },
            "undo": {name: ['撤销']},
            "redo": {name: ['恢复撤销']},
            "make_read_only": {name: ['只读']},
        }
    }
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
// 获取url参数
function parse_url(params){ 
    var reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)", "i");//解析url地址
    var r = window.location.search.substr(1).match(reg);
    if (r != null){
       
        return decodeURIComponent(r[2]);
    }
    return null;
}
// 时间格式化
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        
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
      {id:'仓库',name:'仓库'},
    ]
    let deprants
    list.forEach((item)=>{
      if(params==item.id||params==item.name){
        deprants = item
      }
    })
    return deprants
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
//数组去重
function deWeight(arr,name) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i][name] == arr[j][name]) {
                arr.splice(j, 1);
                //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
                j--;
            }
        }
    }
    return arr;
}
  
  // 将四个全局公共方法，组合成一个对象，并暴露出去
  export default {
    blod,
    size,
    headleChangeBGColor,
    headleChangeColor,
    click,
    parse_url,
    dateFormat,
    contextMenu,
    onPrint,
    deprant,
    deWeight,
    isType,
    isShf
  }