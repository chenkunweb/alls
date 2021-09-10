<template>
  <div>
    <header-bom :msg="titles"></header-bom>
    <div class="jilu-link">
        <router-link to="/index">日达成率</router-link>
        <div class="border"></div>
        <router-link to="/month" >月达成率</router-link>
    
    </div>
    <el-form ref="form" style="display:flex"   >
        <el-form-item>
          <span>交期：</span>
          <el-date-picker
            v-model="time"
            type="date"
            @change="onSubmit"
            :editable="false"
            value-format="yyyy-MM-dd"
            :placeholder="time">
          </el-date-picker>
       </el-form-item>
        
     
    </el-form>
    <el-table :data="tableData" :height="height" border @row-click="click"  :cell-style="changeCellStyle"
    :header-cell-style="changeHeaderStyle" @header-click="clicks"  style=" width: 100%">
      <el-table-column prop="部门" :fixed="fixed['部门']" label="部门" > </el-table-column>
      <el-table-column prop="list[0].刚性日达成率" :fixed="fixed['刚性']" label="刚性" ></el-table-column>
      <el-table-column prop="list[0].柔性日达成率" :fixed="fixed['柔性']" label="柔性" ></el-table-column>
      <el-table-column prop="list[0].品质日达成率" :fixed="fixed['品管审核']" label="品管审核" ></el-table-column>
      <el-table-column prop="list[0].仓库日达成率" :fixed="fixed['仓库审核']" label="仓库审核" ></el-table-column>
      <el-table-column prop="list[0].刚性日绩效分" :fixed="fixed['刚性绩效分']" label="刚性绩效分" ></el-table-column>
      <el-table-column prop="list[0].柔性日绩效分" :fixed="fixed['柔性绩效分']" label="柔性绩效分" ></el-table-column>
      
    </el-table>
    
  
  </div>
  
</template>

<script>
import * as getData from '../api/getDate';
import wx from 'weixin-js-sdk'
export default {
  data(){
    return{
      fixed:{部门:false,"刚性":false,"柔性":false,'品管审核':false,'仓库审核':false,'刚性绩效分':false,'柔性绩效分':false},//固定列
      time:getData.dateUtils.yesterday({ymrSign:true}),//时间
      tableData: [],//数据
      index:0,
      num:[],
      datass:[],
      bianji:0,
      deslab:false,
      thdcl:[],
      height:'',//高度
      
    }
  },

    created(){
      this.height = document.documentElement.clientHeight - 122
      if(this.$store.state.indexdate!=undefined){
        this.time = this.$store.state.indexdate
      }
      this.titles={
          a:{name:'应用程序',path:'/pages/index/index'},
          b:{name:'日达成率汇总',path:'/index'},
      }
      
    },
    mounted(){
     this.onSubmit()
    },

    methods:{
      // 固定列头部颜色
      changeHeaderStyle(row, column, rowIndex, columnIndex){
        if(row.column.fixed === true){
                return 'color: #1296DB'  // 修改的样式
            }else{
                return ''
            }
          
      },
      // 固定列身体颜色
      changeCellStyle (row, column, rowIndex, columnIndex) {
       if(row.column.fixed === true){
                return 'color: #1296DB'  // 修改的样式
            }else{
                return ''
            }
          },
          // 固定列
        clicks(column, event){
            console.log(column)
            if(column.fixed ==false){
                this.fixed[column.label] = true
            }else{
                this.fixed[column.label] = false
            }
        },
     
     
   
     
      // 跳转
      click(row, column, event){
        console.log(this.tableData)
          console.log(1)
          this.$store.state.department.forEach((item)=>{
            if(item.name ==row.部门){
              let date = this.time
              this.$store.state.date =  this.time
              let huizong = item.src
              let username = this.$store.state.username
              let address = this.$store.state.address
              let userid = this.$store.state.userid
              let link = item.link
              // let link = 'http://localhost:8081'
              window.location = link+"?huizong="+huizong+'&date='+date+'&type=日达成率'+'&username='+username+'&address='+address+'&userid='+userid
              
              
            }
          })
        
      },
      // 查询
      async onSubmit(e){
        this.thdcl = []
        this.tableData = []
        console.log(this.thdcl.names)
        this.$store.state.indexdate =  this.time
        this.datass = []
        let yesterday = getData.dateUtils.yesterday({ymrSign:true})
        let department = JSON.parse(await this.$api.api.get('/api/WC','')).Table
        this.util.dcl(department,this.time,this.time,this)
        console.log(this.tableData)
        
      },
     
     
    },
    watch: {
      
    }
}
</script>

<style>

.readyonly .el-input__inner{
  padding: 0;
  border: 0;
  background: transparent;
}


  </style>