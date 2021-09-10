<template>
  <div class="hz">
    <div class="hello"  >
        <div  class="block">
          <div  class="nones" style="display:flex;margin-right: 10px;">
              <el-date-picker v-model="value2" type="daterange" value-format="yyyy-MM-dd" align="right" unlink-panels start-placeholder="开始日期"
                end-placeholder="结束日期"   :picker-options="pickerOptions" @change="pickerChange">
              </el-date-picker>
              <el-select v-model="value"  disabled placeholder="惠州市宗联机电子科技有限公司">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <div class="btns" style="display:flex">
                  <el-button @click="click" >导出</el-button>
              </div>
          </div>
                
        </div>
        <div id="hot-preview" > <HotTable :root="root" ref="testHot"  :settings="hotSettings" ></HotTable> </div>
    </div>
  </div>
</template>
<script>
    import { HotTable } from '@handsontable-pro/vue'
    import '../../node_modules/handsontable-pro/dist/handsontable.full.css'
    import Handsontable from 'handsontable-pro'
    import * as getData from '../api/getDate';
    import enCH from '../api/en-CH';
    Handsontable.languages.registerLanguageDictionary(enCH);   //注册中文字典
    //   vue实例赋值给_this
    var _this = {}
    export default {
        data: function() {
            return {
              pickerOptions: {
                shortcuts: [{
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近两个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
                    picker.$emit('pick', [start, end]);
                  }
                }]
              },
              value2:'',//日期
              value:'',//公司
              root: 'test-hot',//refs
              options:[ {value:'惠州市宗联机电子科技有限公司', label:'惠州市宗联机电子科技有限公司'},],
              hotSettings: {
                  // 数据
                  data: [],
                  colHeaders:['收货公司', '规格型号', '数量','单价', '制单人','制单日期','编号'],
                  // 列属性
                  columns: [
                      {data: "shouhuo", },//工单
                      {data: 'xinghao',},//产品型号
                      {data: 'shuliang'},//数量kg
                      {data: 'danjia'},//单价
                      {data: 'zhidan'}, //数量个数
                      {data: 'riqi',},//加工类型
                      {data: 'bianhao',},//编号
                      
                  ],
                  //隐藏
                  //行列范围
                  startRows: 500,
                  startCols: 8,
                  //最小行列
                  minRows: 500,  
                  minCols: 8,
                  //列留白
                  minSpareCols: 0,
                  //行留白 
                  minSpareRows: 0,
                  // columnHeaderHeight:51,
                  //自动换行
                  autoWrapRow: true, 
                  //开启筛选
                  filters: true,
                  //手动移动列
                  manualColumnMove: true, 
                  //手动移动行
                  manualRowMove: true,   
                  //手工更改列距
                  manualColumnResize: true,
                  //手动更改行距
                  manualRowResize: true,
                  //排序
                  columnSorting: false,
                  rowHeaderWidth: 36,//序号栏宽度
                  rowHeaders: true,//展示序列号
                  //根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
                  stretchH: 'all',
                  allowInsertRow: false,
                  allowInsertColumn:false,
                  //  copyPaste: false,
                  //选中拖拽复制 possible values: true, false, "horizontal", "vertical"
                  fillHandle: true, 
                  // rowHeights: [51,51,51,51,51,51],
                  //右键菜单
                  contextMenu: _this.util.contextMenu(_this,5,1),
                  // 定义某一行的数据格式
                  cells: function(row, col, prop) {
                      var cellProperties = {};
                      cellProperties.readOnly= true;
                      return cellProperties;
                  },
                
                  afterSelectionEnd: function(row, column,row2,column2){this.copyRow = row},
                  
                  // 表格数据发生改变后触发
                  afterChange:  function(changes, source) {
                      _this.a = this
                      
                      
                  },
              },
            };
        },
        beforeCreate(){ _this = this; },
        created(){
            this.hotSettings.colWidths = [80,70,20,20,30,40,30]
            // 赋值路由
            this.$store.state.path = window.location.hash.split('/')[1]
            this.$store.state.name = '汇总统计'
        },
        mounted(){
          //初始化日期
            let thisMonthFirst = getData.dateUtils.thisMonthFirst({ymrSign:true})
            let thisMonthLast = getData.dateUtils.thisMonthLast({ymrSign:true})
            this.value2 = [thisMonthFirst,thisMonthLast]
            this.pickerChange(this.value2)
        },
        methods:{
          selectChange(e){  },
          // 日期查询
          pickerChange(e){
             _this.a.loadData(null)
              function PrefixZero(num, n) { return (Array(n).join(0) + num).slice(-n);}
              let data = { zz:'惠州市宗联机电子科技有限公司', date1:e[0], date2:e[1], }
              this.$api.get('/api/COC',data,res=>{
                  JSON.parse(res.data).Table.forEach((item,index)=>{
                    _this.a.getSourceData()[index].shouhuo = item.收货单位.replace(/\s+/g, "")
                    _this.a.getSourceData()[index].xinghao = item.规格型号.replace(/\s+/g, "")
                    _this.a.getSourceData()[index].shuliang = item.送货数量.replace(/\s+/g, "")
                    _this.a.getSourceData()[index].zhidan = item.制单.replace(/\s+/g, "")
                    _this.a.getSourceData()[index].riqi = item.日期.replace(/\s+/g, "")
                    _this.a.getSourceData()[index].danjia = item.单价==null?'':item.单价*1
                    _this.a.getSourceData()[index].bianhao = PrefixZero(item.编号, 6)
                   
                  })
                  _this.a.render();
                  
              })
          },
          // 下载文件
          click(){
            var button1 = document.getElementById('export-file');
            var exportPlugin1 = _this.a.getPlugin('exportFile');
            exportPlugin1.downloadFile('csv', {
                bom: 'UTF-8',
                columnDelimiter: ',',
                columnHeaders: true,
                exportHiddenColumns: true,
                exportHiddenRows: true,
                fileExtension: 'csv',
                filename: '客户送货通知单',
                mimeType: 'text/csv',
                rowDelimiter: '\r\n',
                rowHeaders: true
            });
          },
        },
        // 注册组件
        components: { HotTable }
    }
</script>

<style >
.hz .block{ display: flex; justify-content:center; height: 40px; }
.hz .el-date-editor.el-input__inner,.hz .el-select{ width: 40% !important;}
.hz{ margin: 0px 20px}
@media screen and (max-width: 1440px){
  .hello{font-size: 12px}
  .hz .htRowHeaders{ height: 780px !important;  overflow: hidden !important; }
}
@media screen and (min-width: 1441px) and (max-width: 1600px){
  .hello{font-size: 13px}
  .hz .htRowHeaders{ height: 656px !important;  overflow: hidden !important; }
}
@media screen and (min-width: 1601px){
  .hello{font-size: 14px}
  .hz .htRowHeaders{ height: 836px !important; overflow: hidden !important; }
}
.hz .ht_master .wtHolder::-webkit-scrollbar { display: none !important;}
.hz .handsontable th,.hz .handsontable td { text-align: center !important;}
.hz .ht_clone_left .wtHolder { width: 40px !important;}
</style>