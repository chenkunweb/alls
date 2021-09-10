<template>
    <div>
        <el-select v-model="value" @change="selectChange" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <span>生产看板</span>
        <div v-if="tableData!=''">
            <el-row >
                <el-col :span="2"><div class="grid-content bg-purple">1</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">2</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">3</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">4</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">5</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">6</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">7</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">生产日期</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">{{time}}</div></el-col>
            </el-row>
            <el-row >
                <el-col :span="2"><div class="grid-content bg-purple">工单号</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[0].gongdan}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">工单号</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[1].gongdan}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">工单号</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[2].gongdan}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">工单号</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[3].gongdan}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">工单号</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple-light">{{tableData[4].gongdan}}</div></el-col>
            </el-row>
            <el-row >
                <el-col :span="2"><div class="grid-content bg-purple">型号</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[0].xinghao}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">型号</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[1].xinghao}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">型号</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[2].xinghao}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">型号</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[3].xinghao}}</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple">型号</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[4].xinghao}}</div></el-col>
            </el-row>
            <el-row >
                <el-col :span="2"><div class="grid-content bg-purple">工单计划</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[0].jihua}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">工单计划</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[1].jihua}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">工单计划</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[2].jihua}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">工单计划</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[3].jihua}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">工单计划</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple-light">{{tableData[4].jihua}}</div></el-col>
            </el-row>
            <el-row v-for="(item,index) in 30" :key="index" >
                <el-col :span="2"><div class="grid-content bg-purple">{{tableData[0]['工序'+(index+1)]}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[0]['产量'+(index+1)]}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">{{tableData[1]['工序'+(index+1)]}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[1]['产量'+(index+1)]}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">{{tableData[2]['工序'+(index+1)]}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[2]['产量'+(index+1)]}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">{{tableData[3]['工序'+(index+1)]}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light">{{tableData[3]['产量'+(index+1)]}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">{{tableData[4]['工序'+(index+1)]}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple-light">{{tableData[4]['产量'+(index+1)]}}</div></el-col>
            </el-row>
        </div>
        <div v-else>
            <el-row v-for="(item,index) in 30" :key="index" >
                <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
        </div>
        
    </div>
</template>
<script>
import * as getData from '../api/getDate';
export default {
    data(){
        return{
            options: [],//部门列表
            value: '',//部门
            list:[],
           tableData:[],//列表数据
           currentPage:0,//第几页
           pagesize:5,//每页多少条数据
           timer:null, //定时器名称
           timers:null, //定时器名称
        }
    },
    beforeDestroy(){
   clearInterval(this.timer);        
   this.timer = null;
   clearInterval(this.timers);        
   this.timers = null;
},
  mounted(){
    this.timer = setInterval(() => {
        setTimeout(this.dataTimes(this.dataTimes_list), 0)
    }, 1000*20)
    this.timers = setInterval(() => {
        setTimeout(location.reload(), 0)
    }, 1000*5*60)
    
    

   
    
  },
    created(){
        this.getdata()
    },
    methods:{
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        // 初始化数据
        async getdata(){
            let departments = JSON.parse(await this.$api.api.get('/api/WC','')).Table
            console.log(departments)
            this.departments = departments
            departments.forEach((item)=>{
                if(item.ERP部门!=''){
                    this.options.push({
                        label:item.ERP部门,
                        value:item.ERP部门,
                    })
                }
            })
            
            let time = getData.dateUtils.today({ymrSign:true})
            let beforeTwoMonthFirst = getData.dateUtils.beforeTwoMonthFirst({ymrSign:true})
            let list = JSON.parse(await this.$api.api.get('/api/SCKB1',{date:time})).Table
            let list1 = JSON.parse(await this.$api.api.get('/api/SCKB2','')).Table
            let maxvalue = JSON.parse(await this.$api.api.get('/api/job',{date:beforeTwoMonthFirst})).Table
            this.maxvalue = maxvalue
            console.log(maxvalue)
            let all_list = []
            list1.forEach((item)=>{
                if(item.日期.replace(/\s+/g, "")==time){
                    all_list.push(item)
                }
            })
            let objs = {};
            all_list.concat(list).forEach((item, index) => {
              let jiaoqi = item.订单号.replace(/\s+/g, "")
                if (!objs[jiaoqi]) {
                    objs[jiaoqi] = []
                }
                objs[jiaoqi].push(item);
            });
            let all_lists = Object.values(objs)//日达成率数据
            all_lists.forEach((item)=>{
                
                item.forEach((items,index)=>{
                    // console.log(items)
                    item['工序'+(index+1)] = items.工序名.replace(/\s+/g, "")
                    item['产量'+(index+1)] = items.当日产量和*1+"%"+items.累计产量和*1
                    
                })
                this.maxvalue.forEach((items)=>{
                    if(item.工单号=='58020'){
                        console.log(item)
                    }
                    if(items.工单号==item[0].订单号.replace(/\s+/g, "")){
                        item.jihua = items.计划数量
                    }
                })
                item.gongdan = item[0].订单号.replace(/\s+/g, "")
                item.xinghao = item[0].零件名称.replace(/\s+/g, "")
                item.wc = item[0].部门.replace(/\s+/g, "")
            })
            
            // this.list = all_lists
            console.log(all_lists)
            this.$store.state.list = all_lists
            if(this.$store.state.departments!=undefined){
                this.selectChange(this.$store.state.departments)
                this.value = this.$store.state.departments
            }
            // 
        },
        // 部门选择
        selectChange(e){
            this.$store.state.departments = e
            let departments
             this.departments.forEach((item)=>{
                if(item.ERP部门==e){
                    departments = item.计件工资部门
                }
            })
            
            let list = []
            this.$store.state.list.forEach((item)=>{
                if(item.wc==departments){
                    list.push(item)
                }
            })
            console.log(list)
           this.dataTimes(list)
           this.dataTimes_list = list
            
            
        },
        // 自动翻页
        dataTimes(list){
            let currentPage = this.currentPage+1
            this.currentPage = this.currentPage+1
            console.log(currentPage)
            let pagesize = this.pagesize
            let leg = currentPage*pagesize-list.length
            if(leg>0){
                for(var i=0;i<leg;i++){
                    console.log(i)
                    let a = {
                        gongdan:'',
                        xinghao:'',
                        jihua:'',
                    
                    }
                    list = list.concat(a)
                    this.currentPage = 0
                }
                
                // list = list.concat(a)
            }
            this.tableData = list.slice((currentPage-1)*pagesize,currentPage*pagesize)
        }
    }
}
</script>
<style >

  .el-col {
    border-radius: 4px;
  }

  .bg-purple {
    background: #d3dce6;
    border-bottom: 1px solid
  }
  .bg-purple-light {
    background: #e5e9f2;
   border-bottom: 1px solid
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>