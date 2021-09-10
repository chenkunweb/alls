<template>
  <div class="submit">
      
    <header-bom :msg="titles"></header-bom>
    <div class="jilu-link">
        <router-link to="/index">报告</router-link>
        <div class="border"></div>
        <router-link to="/chaxun" >查询</router-link>
        <div class="border"></div>
        <router-link to="/shenhe" >审核</router-link>
    
    </div>
    <div class="block">
    <el-date-picker
      v-model="value2"
      type="daterange"
      @change="aaa"
      unlink-panels
      
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
    <el-select v-model="value" @change="aaa" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </div>
    <div class="lists">
      <div  v-for="(items,index) in result" :key="index" >

        <p>报告时间：{{items.dates}}</p>
        <div class="sub-content">
          <div class="displays">
            <div class="names">
              <div>报告人：{{items.name1}}</div>
              <div>车间：{{items.bumen}}</div>
              <div>类型：{{items.type}}</div>
                <div>工单号：{{items.gongdan}}</div>
                <div>产品型号：{{items.xinghao}}</div>
                <div>生产交期：{{items.jiaoqi}}</div>
                <div>说明情况：{{items.yuanyin}}</div>
            </div>
          </div>
          <div>
            <div v-if="items.id==1">
                <span class="title">已同意</span>
                <el-image  :src="require('../assets/images/yishenhe.png')"></el-image>
            </div>
            <div v-if="items.id==2">
                <span class="title">已拒绝</span>
                <el-image  :src="require('../assets/images/weishenhe.png')"></el-image>
            </div>
            <div v-if="items.id==3">
                <span class="title">审核中</span>
                <el-image  :src="require('../assets/images/shenhezhong.png')"></el-image>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as getData from '../api/getDate';
export default {
    data(){
        return{
          // 赛选
          filters:{dates:'',names:''},
          // 时间快捷
          pickerOptions: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          // 状态
          options: [
            { value: '不限', label: '不限' },
            { value: '已审核', label: '已审核' }, 
            { value: '未审核', label: '未审核' },
            { value: '拒绝', label: '拒绝'  }
          ],
          // 状态值
          value: '',
          // 时间
          value2: '',
          // 数据列表
          result:[],
        }
    },
    created(){
        this.titles={
            a:{name:'应用程序',path:'/pages/index/index'},
            b:{name:'查询',path:'/index'},
        } 
        this.getData()
    },
    methods: {
      // 初始化数据
      async getData(){
        let cdata = {i:1,user:this.$store.state.name}
        let ddata = {i:2,user:this.$store.state.name}
        let data = {i:5,user:''}
        let noLists = JSON.parse(await this.$api.api.get('/api/Planss',cdata)).Table
        let a = JSON.parse(await this.$api.api.get('/api/Planss',data)).Table
        let yesLists = JSON.parse(await this.$api.api.get('/api/Planss',ddata)).Table
        let allLists = []
        noLists.forEach((item)=>{
          allLists.push({
              审核人:item.审核人,
              审核结果:'未审核',
              工单号:item.工单号,
              生产交期:item.生产交期,
              申述人:item.申述人,
              申述原因:item.申述原因,
              申述时间:item.申述时间,
              车间:item.车间,
              记录号:item.记录号,
          })
        })
        allLists = allLists.concat(yesLists)
        let depaments = JSON.parse(await this.$api.api.get('/api/WC','')).Table
        let list_wsh = []
        let list_ty = []
        let list_jj = []
        a.forEach((item)=>{
          let shenhe = item.审核结果==null?'未审核':item.审核结果.replace(/\s+/g, "")
            let depament
              let depamentid
              depaments.forEach((items)=>{
                if(item.车间.replace(/\s+/g, "") ==items.ERP部门代号){
                  depament = items.企业微信部门
                  depamentid = items.ERP部门代号
                  
                }
              })
            if(shenhe=='同意'){
                list_ty.push({
                    name:item.审核人,
                    gongdan:item.工单号,
                    jiaoqi:item.生产交期,
                    name1:item.申述人,
                    yuanyin:item.申述原因,
                    dates:item.申述时间,
                    names:'已审核',
                    id:1,
                    bumen:depament,
                    diama:depamentid,
                    type:item.类型,
                    xinghao:item.产品型号
                    
                })
            }
            if(shenhe=='拒绝'){
                list_jj.push({
                    name:item.审核人,
                    gongdan:item.工单号,
                    jiaoqi:item.生产交期,
                    name1:item.申述人,
                    yuanyin:item.申述原因,
                    dates:item.申述时间,
                    names:'拒绝',
                    id:2,
                    bumen:depament,
                    diama:depamentid,
                    type:item.类型,
                    xinghao:item.产品型号
                    
                })
            }
            if(shenhe=='未审核'){
                list_wsh.push({
                    name:item.审核人,
                    gongdan:item.工单号,
                    jiaoqi:item.生产交期,
                    name1:item.申述人,
                    yuanyin:item.申述原因,
                    names:'未审核',
                    dates:item.申述时间,
                    id:3,
                    bumen:depament,
                    diama:depamentid,
                    type:item.类型,
                    xinghao:item.产品型号
                    
                })
            }
        })
        let list = list_wsh.concat(list_ty).concat(list_jj)
        let beforeYesterday = getData.dateUtils.beforeYesterday({ymrSign:true})
        let today = getData.dateUtils.tomorrow({ymrSign:true})
        let data_list = []
        if(this.$store.state.userid!='YuHui '){
          list.forEach((item)=>{
            if(this.$store.state.name==item.name1.replace(/\s+/g, "")){
              data_list.push(item)
            }
          })
        }else{
          data_list = list
        }
        this.result = data_list
        this.array = data_list
        this.aaa([beforeYesterday,today])
        this.value2 = [beforeYesterday,today]
        
      },
      // 时间查询
      aaa(e){
        let start,end,names
        if(typeof(e)=='object'){
          if(e!=null){
            start = getData.dateUtils.getFormat(e[0])
            end = getData.dateUtils.getFormat(e[1])
            this.filters.dates = [start+'|'+end]
          }else{this.filters.dates = []}
        }else{
          if(e=='不限'){this.filters.names = ''}else{this.filters.names = e}
        }
        let filterDate = {dates:this.filters.dates}
        function dateFilter(array, filters) {
          const filterKeys = Object.keys(filters)
          return array.filter((item) => {
            return filterKeys.every(key => {
              if(!filters[key].length) return true
              return item[key]>=filters[key][0].split('|')[0]&item[key]<=filters[key][0].split('|')[1]
            })
          })
        }
        let dateList = dateFilter(this.array,filterDate)
        let filterName = {names:this.filters.names}
        function nameFilter(array, filters) {
          const filterKeys = Object.keys(filters)
          return array.filter((item) => {
            return filterKeys.every(key => {
              if(!filters[key].length) return true
              return !!~filters[key].indexOf(item[key])  
            })
          })
        }
        let nameList = nameFilter(dateList,filterName)
        this.result = nameList
      }
    
    }
    
}
</script>

<style>
.el-date-range-picker.has-sidebar{
  width: 100% !important
}
.el-picker-panel [slot=sidebar], .el-picker-panel__sidebar{
  width: auto !important;
  display: flex !important;
  position: inherit !important;
}
.el-picker-panel [slot=sidebar]+.el-picker-panel__body, .el-picker-panel__sidebar+.el-picker-panel__body{
  margin-left: 0px !important;
}
.el-date-range-picker .el-picker-panel__body{
  min-width: auto !important;
}
.el-date-range-picker__content{
  padding: 2px !important;
}
.el-picker-panel__icon-btn{
  padding: 1px 3px !important
}
.el-date-range-picker__header div{
      font-size: 14px !important;
          margin-left: 30px !important;
    margin-right: 30px !important;

}
.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
  width: 150% !important;
  padding: 3px 0px !important;
}
.el-date-editor .el-range__icon{
  display: none !important
}
.el-date-editor .el-range-input{
  width: 45% !important
}
.block{
  display: flex !important
}
.submit{
  background: #ddd;
  margin-bottom: 51px;
margin-top: 84px !important
}

.submit .sub-content{
  background:#fff;
  display: flex;
  padding: 10px
}
.submit .displays{
  width: 100%;
  margin-left: 10px;
  overflow: hidden;

}
.el-button+.el-button{
  margin-left: 0px;
  margin-top: 10px
}
.submit .name{
  display: flex;
  justify-content:space-between
  
}
.submit .name div:last-child{
  color: #ccc
}
.submit img{
  width: 50px;
  height: 50px;
}

.submit .names div{
  font-size: 14px;
  text-align: left;

}
.submit p{
  font-size: 14px;
  text-align: left
}
.submit .marker {      
  position: relative;
  width: 10px;      
  top: -30px;
  height: 10px;      
  left: 50px;
  border: 1px solid #088;      
  border-radius: 100px;      
  background-color: #ffffff;      
  opacity: 0.5;
}
.submit .markers {      
  background-color: #088;
  position: relative;
  width: 10px;      
  top: -30px;
  height: 10px;      
  left: 50px;
  border: 1px solid #088;      
  opacity: 0.5;
  border-radius: 100px;       
}
/* .jilu-link{
  display: flex;
  position: fixed;
  top:38px;
  width: 100%;
  border-bottom:1px solid #ddd;
  background: #fff;
  z-index: 1;

} */
.border{
  margin: 10px auto;
  border-left: 1px solid #ddd
}
</style>