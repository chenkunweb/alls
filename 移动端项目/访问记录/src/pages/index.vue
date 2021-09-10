<template>
<div>
  <header-bom :msg="titles"></header-bom>
  <div class="page-line-chart" style="margin-top:70px">
    <div class="jilu-link">
        <router-link to="/index">线形统计</router-link>
        <div class="border"></div>
        <router-link to="/excel" >表格统计</router-link>
    
    </div>
    
    <div style="position: fixed;
    display: flex;
    z-index: 2;
    background: #fff;
    width: 100%;">
      <el-select v-model="value" @change = "changeType" placeholder="请选择">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        
        :label="item.label"
        :value="item.value">
      </el-option>
      </el-select>
      <el-button :class="{'avarats':isActive==1}" @click="changeType1">日</el-button>
      <el-button :class="{'avarats':isActive==2}" @click="changeType2">周</el-button>
      <el-button :class="{'avarats':isActive==3}" @click="changeType3">月</el-button>
      <el-button :class="{'avarats':isActive==4}" @click="changeType4">年</el-button>
    </div>
    <VeLine :data="chartData"  width="100%" :height="height" :legend-visible="false" :settings="chartSettings"></VeLine>
    <div class="footer">
      <p style="color:#08d695;padding: 0 5px;">今访:{{tolenght}}</p>
      <p style="color:#409eff;padding: 0 5px;">昨访:{{yelenght}}</p>
      <p style="color:red;padding: 0 5px;">最高:{{maxlenght}}</p>
      <p style="color:#67c23a;padding: 0 5px;">总访:{{alllenght}}</p>
    </div>
  </div>
</div>
  
</template>

<script>
import * as getData from '../api/getDate';
export default {
  data() {
    // 统计图设置项
    this.chartSettings = { }
    return {
      //昨访
      yelenght:0,
      // 今访
      tolenght:0,
      // 总访
      alllenght:0,
      // 最高
      maxlenght:0,
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
        rows: [  ]
      },
      // 开始时间
      startime:'',
      // 结束时间
      endtime:'',
      // 高度
      height:''
    };
  },
  created(){
    this.height = document.documentElement.clientHeight - 30+ 'px'
    this.titles={
            a:{name:'应用程序',path:'/pages/index/index'},
            b:{name:'访问记录',path:'/index'},
        } 
    this.startime = getData.dateUtils.today({ymrSign:true})+' 00:00:00'
    this.endtime = getData.dateUtils.today({ymrSign:true})+' 23:59:59'
    this.changeType1()


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
    // 时间处理函数
     isTimes(newdate, startdate, enddate) {
        var newdate = new Date(newdate);
        var startdate = new Date(startdate);
        var enddate = new Date(enddate);
        var a = newdate.getTime() - startdate.getTime();
        var b = newdate.getTime() - enddate.getTime();
        if (a < 0 || b > 0) {
            return 0;
        } else {
            return 1;
        }
    },
    // 日
    changeType1(){
      this.isActive = 1
      this.startime = getData.dateUtils.today({ymrSign:true})+' 00:00:00'
      this.endtime = getData.dateUtils.today({ymrSign:true})+' 23:59:59'
      this.changeType(this.value)
    },
    // 周
    changeType2(){
      this.startime = getData.dateUtils.thisWeekFirst({ymrSign:true})+' 00:00:00'
      this.endtime = getData.dateUtils.thisWeekLast({ymrSign:true})+' 23:59:59'
      this.changeType(this.value)
      this.isActive = 2
    },
    // 月
    changeType3(){
      this.startime = getData.dateUtils.thisMonthFirst({ymrSign:true})+' 00:00:00'
      this.endtime = getData.dateUtils.thisMonthLast({ymrSign:true})+' 23:59:59'
      this.changeType(this.value)
      this.isActive = 3
    },
    // 年
    changeType4(){
      let time = getData.dateUtils.today({ymrSign:true})
      time = time.split('-')
      this.startime = time[0]*1-1+'-'+time[1]+'-'+time[2]+' 00:00:00'
      this.endtime = getData.dateUtils.today({ymrSign:true})+' 23:59:59'
      this.changeType(this.value)
      this.isActive = 4
    },
    // 图表处理函数
    get(rows,ks){
      let tempArr = [];
      let afterData = []
      for (let i = 0; i < rows.length; i++) {
        if(rows[i][ks]!=undefined&rows[i][ks]!=''&rows[i][ks]!=null){
          if(rows[i][ks].replace(/(\s*$)/g, "") != ''){
            if (tempArr.indexOf(rows[i][ks].replace(/(\s*$)/g, "")) === -1) {
              afterData.push({
                name: rows[i][ks].replace(/(\s*$)/g, ""),
                origin: [rows[i]]
              });
              tempArr.push(rows[i][ks].replace(/(\s*$)/g, ""));
            } else {
              for (let j = 0; j < afterData.length; j++) {
                if (afterData[j].name == rows[i][ks].replace(/(\s*$)/g, "")) {
                  afterData[j].origin.push(rows[i]);
                  break;
                }
              }
            }
          }
          
          
        }
      }
      return afterData
    },
    // 访问类型
    async changeType(e){
      let all = JSON.parse(await this.$api.api.get('/api/FWJL','')).Table
      this.alllenght = all.length
      let startime = this.startime
      let endtime = this.endtime
      let rows = []
      let rowsye = []
      let rowsto = []
      let startimes = getData.dateUtils.today({ymrSign:true})+' 00:00:00'
      let endtimes = getData.dateUtils.today({ymrSign:true})+' 23:59:59'
      let starye = getData.dateUtils.yesterday({ymrSign:true})+' 00:00:00'
      let endye = getData.dateUtils.yesterday({ymrSign:true})+' 23:59:59'
      let tempArr = [], newArr = []
     
      for (let i = 0; i < all.length; i++) {
        if (tempArr.indexOf(all[i].访问时间.split(' ')[0]) === -1) {
          newArr.push({
            id: all[i].访问时间.split(' ')[0],
            list: [all[i]]
          })
          tempArr.push(all[i].访问时间.split(' ')[0]);
        } else {
          for (let j = 0; j < newArr.length; j++) {
            if (newArr[j].id == all[i].访问时间.split(' ')[0]) {
              newArr[j].list.push(all[i])
            }
          }
        }
      }
      this.maxlenght = Math.max.apply(Math,newArr.map(item => { return item.list.length }))
      
      all.forEach((item,index)=>{
        let time = item.访问时间.replace(/(\s*$)/g, "")
        
        if(this.isTimes(time,startime,endtime)==1){
         rows.push({
           模块名:item.模块名,
           访问时间:item.访问时间.split(' ')[0],
           访问用户:item.访问用户,
           部门:item.部门
         })
        }
        if(this.isTimes(time,startimes,endtimes)==1){
         rowsto.push(item)
        }
        if(this.isTimes(time,starye,endye)==1){
         rowsye.push(item)
        }
      })
      this.yelenght = rowsye.length
      this.tolenght = rowsto.length
      // console.log(rows)
     
      let list = []
      this.get(rows,e).forEach((items)=>{
        list.push({
          日期:items.name,
          访问次数:items.origin.length
        })
      })
      
      this.chartData.rows = list
      console.log(this.chartData)
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
