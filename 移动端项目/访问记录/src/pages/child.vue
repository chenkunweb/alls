<template>
<div>
  <header-bom :msg="titles"></header-bom>
  <div class="page-line-chart" style="margin-top:30px">
    
    <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    :height="height"
    :cell-style="changeCellStyle"
    :header-cell-style="changeHeaderStyle" @header-click="click"
    border
    :default-sort = "{prop: '访问时间', order: 'descending'}"
    >
    <el-table-column type="index" :fixed="fixed['序号']" label="序号" > </el-table-column>
    <el-table-column prop="部门" :fixed="fixed['部门']" :filters="bumen" :filter-method="filterHandler"  label="部门" > </el-table-column>
    <el-table-column prop="访问用户" :fixed="fixed['姓名']" label="姓名" > </el-table-column>
    <el-table-column prop="模块名" :fixed="fixed['模块名']" :filters="mokuai" :filter-method="filterHandler" :width="this.util.flexColumnWidth('模块名',tableData)"  label="模块名"> </el-table-column>
    <el-table-column prop="访问时间" :fixed="fixed['访问时间']" :filters="time" :width="this.util.flexColumnWidth('访问时间',tableData)" :filter-method="filterHandlers" sortable label="访问时间"> </el-table-column>
  </el-table>
    
    
  </div>
</div>
  
</template>

<script>
import * as getData from '../api/getDate';
import _ from "underscore"
export default {
  data() {
    // 统计表配置
    this.chartSettings = { }
    return {
      // 固定列
      fixed:{序号:false,部门:false,姓名:false,},
      // 源数据
      tableData: [],
      //昨访
      yelenght:0,
      // 今访
      tolenght:0,
      // 总访
      alllenght:0,
      // 最高
      maxlenght:0,
      // 高度
      height:'',
       // 动态宽度
      width:document.documentElement.clientWidth*0.85 + 'px',
      // 区分日周月年
      isActive:0,
      // 标题
      value:'访问用户',
      // 标题列表
      options:[
        {value:'访问时间',label:'访问时间'},
        {value:'访问用户',label:'访问用户'},
        {value:'部门',label:'部门'},
        {value:'模块名',label:'模块名'},
      ],
      // 数据
      chartData: {
        columns: ["日期", "访问次数"],
        rows: [
          
        ]
      },
      // 开始时间
      startime:'',
      // 结束时间
      endtime:'',
      // 部门列表
      bumen:[],
      // 模块列表
      mokuai:[],
      // 时间列表
      time:[],
    };
  },
  created(){
    this.height = document.documentElement.clientHeight - 30
    this.titles={
            a:{name:'应用程序',path:'/pages/index/index'},
            b:{name:'电镀达成率',path:'/excel'},
            c:{name:'电镀达成率',path:'/child'},
        } 
    this.getDate(this.$route.query.name)


  },
  mounted(){
    // / 动态宽度变化赋值
    window.onresize = () => {
      return (() => {
        this.width = document.documentElement.clientWidth*0.85 + 'px'
      })()
    }
    
  },
  methods:{
    // 标题头颜色
    changeHeaderStyle(row, column, rowIndex, columnIndex){
        if(row.column.fixed === true){
                return 'color: #1296DB'  // 修改的样式
            }else{
                return ''
            }
          
      },
      // 身体颜色
      changeCellStyle (row, column, rowIndex, columnIndex) {
       if(row.column.fixed === true){
                return 'color: #1296DB'  // 修改的样式
            }else{
                return ''
            }
          },
          // 固定列
        click(column, event){
            
            if(column.fixed ==false){
                this.fixed[column.label] = true
            }else{
                this.fixed[column.label] = false
            }
        },
        // 赛选
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      // 赛选
      filterHandlers(value, row, column) {
        const property = column['property'];
        return row[property].indexOf(value.replace(/(\s*$)/g, ""))!=-1;
      },
      // 初始化数据
    async getDate(e){
       let all = JSON.parse(await this.$api.api.get('/api/FWJL','')).Table
       let list = []
      let bumen = []
      let mokuai = []
      let time = []
       all.forEach((item)=>{
         if(item.访问用户.replace(/(\s*$)/g, "") ==e){
          bumen.push(item.部门)
          mokuai.push(item.模块名)
          time.push(item.访问时间.split(' ')[0])
           list.push({
             模块名:item.模块名.replace(/(\s*$)/g, ""),
             访问时间:item.访问时间,
             访问用户:item.访问用户,
             部门:item.部门,
           })
         }
       })
      this.bumen = Array.from(new Set(bumen)).map(item=>{
        let list = {
          text:item,
          value:item,
        }
        return list
      })
      this.mokuai = Array.from(new Set(mokuai)).map(item=>{
        let list = {
          text:item,
          value:item,
        }
        return list
      })
      this.time = Array.from(new Set(time)).map(item=>{
        let list = {
          text:item,
          value:item,
        }
        return list
      })
      this.tableData = list
      
     
      
    },
  },
  components: { VeLine },
  watch:{
    width: {
     immediate: true,
     handler(newValue) {
      console.log(newValue)
     }
   }
  }
};
</script>
<style >
  .avarats {
    color: #409EFF !important;
    border-color: #c6e2ff !important;
    background-color: #ecf5ff !important;
}
</style>
