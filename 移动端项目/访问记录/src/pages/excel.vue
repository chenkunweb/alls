<template>
<div>
  <header-bom :msg="titles"></header-bom>
  <div class="page-line-chart"  style="margin-top:60px" >
    <div class="jilu-link">
        <router-link to="/index">线形统计</router-link>
        <div class="border"></div>
        <router-link to="/excel" >表格统计</router-link>
    
    </div>
    <el-table
    :data="tableData"
    ref="table"
    style="width: 100%"
    :height="height"
    :cell-style="changeCellStyle"
    :header-cell-style="changeHeaderStyle" @header-click="click"
    show-summary
    row-key="id"
    border
    @row-click="clck"
    :default-sort = "{prop: 'nums', order: 'descending'}"
   >
    <el-table-column type="index" :fixed="fixed['序号']" label="序号" > </el-table-column>
    <el-table-column prop="bumen" :fixed="fixed['部门']"  label="部门" > </el-table-column>
    <el-table-column prop="name" :fixed="fixed['姓名']"  label="姓名" > </el-table-column>
    <el-table-column prop="mokuailes" sortable label="模块数"> </el-table-column>
    <el-table-column prop="nums" sortable label="总次数"> </el-table-column>
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
      endtime:''
    };
  },
  updated(){
    // 数据更新
    this.$nextTick(() => {
      this.$refs['table'].doLayout();
    })  
  },
  created(){
    this.height = document.documentElement.clientHeight - 60
    this.titles={
            a:{name:'应用程序',path:'/pages/index/index'},
            b:{name:'电镀达成率',path:'/excel'},
        } 
    this.getDate()


  },
  mounted(){
    // 动态宽度变化赋值
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
        // 初始化数据
    async getDate(e){
       let data = {corpid:'ww4b634cb35b1893b8',corpsecret:'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U'}
       let access_token = JSON.parse(await this.$api.api.get('/api/weixin',data)).access_token
       let datas = { access_token:access_token, department_id:1, fetch_child:1, }
       let userlist = JSON.parse(await this.$api.api.get('/api/userlist',datas)).userlist
      userlist.forEach(async(item,index)=>{
        let all = JSON.parse(await this.$api.api.get('/api/FWJL',{user:item.name})).Table
        if(all!=''){
          let mokuailes = all.length
          let nums = 0
          let bumen
          if(item.address){
            bumen = item.address.split('/')[1]
          }else{
            bumen = item.position
          }
          all.forEach((items=>{
            nums +=items.次数
           
          }))
          let data = {
            id:index,
            mokuailes:mokuailes,
            nums:nums,
            bumen:bumen,
            name:item.name,
            hasChildren: true
          }
          this.tableData.push(data)

        }
      })
    },
    // 点击跳转
    clck(row, column, event){
      console.log(row)
      console.log(column)
      this.$router.push({  //核心语句
        path:'/child',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          name:row.name, 
        }
      })
    }
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
