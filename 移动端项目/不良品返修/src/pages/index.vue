
<template>
  <div>
    <header-bom :msg="titles"></header-bom>
     
    <div v-for="(item,index) in list" :key="index" style="border:1px solid #ddd;margin: 5px;" @click="btn(index)">
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">部门:{{item.depament}}</div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">工单号:{{item.工单号}}</div></el-col>
      </el-row>
      
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple">型号:{{item.产品型号}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-light">工序:{{item.工序号}}</div></el-col>
      </el-row>
    </div>
   
  </div>
</template>


<script>
  export default {
    data() {
      return {
        admin:0,
        // 数据列表
        list:[],
        // 标题列表
        title:['返修列表','品管审核列表','生产签收列表'],
        // 权限
        i:'',
        // 标题
        titles:''
      };
    },
    created(){
      this.getData()
    },
    methods: {
      // 初始化数据
      async getData(){
        let data = {m1:'移动端授权-应用程序展示-不良品返修记录',m4:this.util.parse_url("userid"),}
        let TSPL = JSON.parse(await this.$api.api.get('/api/TSPL',data)).Table[0]
        let i
        if(TSPL.删*1==1){ i=3 }
        if(TSPL.改*1==1){  i=2  }
        if(TSPL.增*1==1){  i=1 }
        this.i = i
        this.titles={
            a:{name:'应用程序',path:'/pages/index/index'},
            b:{name:this.title[this.i-1],path:'/index'},
        } 
        let list_data = { i:i, userid:this.util.parse_url("userid")  }
        let list = JSON.parse(await this.$api.api.get('/api/FXJL',list_data)).Table
        let departments = JSON.parse(await this.$api.api.get('/api/WC','')).Table
        list.forEach((item)=>{
          let departments_id,depamentList
          departments.some((items)=>{
            if(item.部门.replace(/\s+/g, "")==items.ERP部门代号){
              departments_id = items.ERP部门
              depamentList = items
              return
            }
          })
          item.depament = departments_id
          item.depamentList = depamentList
          item.num = item.数量*1
        })
        this.list = list
      },
      // 跳转
      btn(e){
        this.$router.push({path: '/change',query:{list:this.list[e],i:this.i}});
      }
    }
  };
</script>
<style >

  .el-col {
    border-radius: 4px;
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