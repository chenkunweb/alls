<template>
     <div >
         <van-tabs @click="click" v-model="activeName" id="aaa">
            <van-tab  v-for="(item,index) in label" :title="item.name" :name="item.part" :key="index" id="aaa">
            </van-tab>
        </van-tabs>
        <router-view></router-view>
     </div>
</template>
<script>
    export default {
        data(){
            return{
                label:[],
                activeName:'',
                list:[
                { name:'客户送货单', part:'/kh', },
                { name:'送货单', part:'/rkd'},
                { name:'汇总统计', part:'/huizong'},
               
            ],
            }
        },
        created(){
            this.getData()  
        },
        methods:{
            async getData(){
                let access_token_data = { corpid : 'ww4b634cb35b1893b8',  corpsecret:'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U' }
                let access_token = JSON.parse(await this.$api.api.get('/api/weixin',access_token_data)).access_token
                let userlist_data={access_token:access_token,department_id:1,fetch_child:1,}
                // 获取通讯录
                let userlist = JSON.parse(await this.$api.api.get('/api/userlist',userlist_data)).userlist
                this.$store.state.userList = userlist
                this.$store.state.access_token = access_token
                //获取模块
                let mouse = JSON.parse(await this.$api.api.get('/api/MOUSER','')).Table
                let list = []
                let tequan = []
                mouse.forEach((item)=>{
                    if(this.util.parse_url('userid') ==item.用户ID.replace(/\s+/g, "")){
                        
                        this.list.forEach((items)=>{
                            if(item.模板ID.split('-')[2]){
                                
                                if(items.name == item.模板ID.split('-')[2].replace(/\s+/g, "")&&item.查看*1!=0){
                                    console.log(item)
                                    list.push({
                                        name:items.name,
                                        part:items.part,
                                        增加:item.增加.replace(/\s+/g, "")*1,
                                        删除:item.删除.replace(/\s+/g, "")*1,
                                        修改:item.修改.replace(/\s+/g, "")*1,
                                        查看:item.查看.replace(/\s+/g, "")*1,
                                        特权:item.特权.replace(/\s+/g, "")*1,
                                    })
                                    tequan.push({
                                        name:items.name,
                                        tequan:item.特权.replace(/\s+/g, "")
                                    })
                                }
                            }
                        })
                    }
                })
                this.$store.state.tequan = tequan
                var obj = {};
                list = list.reduce(function (item, next) {
                obj[next.name] ? '' : obj[next.name] = true && item.push(next);
                return item;
                }, []);
                this.label = list
                this.$store.state.label = list
                let lk = []
                userlist.forEach((item,index)=>{
                    if(item.userid ==this.util.parse_url('userid')){
                        this.$store.state.username = item.name
                        this.$store.state.userid = item.userid
                        if(this.$store.state.path == undefined){
                            this.$router.push({path:this.label[0].part})
                            this.activeName = this.label[0].part
                        }else{
                            this.$router.push({path:'/'+this.$store.state.path})
                            this.activeName = '/'+this.$store.state.path
                        }
                    }else{
                        lk.push(index)
                        if(lk.length==userlist.length){
                            console.log(lk.length)
                            this.$router.push({path:'/rkd'})
                            this.activeName = '/rkd'
                        }
                        
                    }
                })
            },
        // 页面跳转
        click(name,title){  this.$router.push({path:name}) },
        
        }
    }

</script>
<style>
.van-tabs{
    padding: 0;
    position: relative;
    margin: 0 0 15px;
    
}
.van-tab{
    font-size: 20px !important
}
.van-tabs__nav{
    white-space: nowrap;
    position: relative;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
    float: left;
    z-index: 2;
}
.van-tabs__wrap--scrollable .van-tab{
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
}
.van-tabs__nav--line{
    background: none !important;
     background: #f5f5f5;
}
.van-tabs__line{
    position: absolute;
    bottom: 15px;
    left: 0;
    height: 2px;
    background-color: #409EFF;
    z-index: 1;
    -webkit-transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    transition: transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    list-style: none;
}



  .title{
    width: 100vw;
    height: 50px;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
  }
  .handsontable td.htInvalid{
    background-color: #fff !important;
    line-height: 21px !important;

  }

.handsontable tr .listbox{
    line-height:25px !important;
    text-align: left !important;
    color: inherit !important;
    font-size: inherit !important;

}
  #hot-display-license-info{
    display: none
  }

  .hello{
    position: relative;
  }

  .handsontable textarea {
     min-width: 400px !important;
     /* max-width: 300px !important; */
 }
  .block{
      display: flex;
      justify-content:left;
      height: 40px;
  }
  .el-dropdown{
    position: absolute;
    right: 0;
    top: 0;
  }
  .handsontable tr td.htInvalid {
    background-color: #fff !important;
}
.ht_clone_left .wtHolder {
    width: 40px !important;
}

  
.handsontable th, .handsontable td{
    border-right: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    /* display: table-cell !important; */
    vertical-align: middle !important;
    font-weight: bold !important;
    
}


.handsontable tr:first-child th, .handsontable tr:first-child td{
    border-top: 1px solid #000 !important;
}
.handsontable th:first-child, .handsontable th:nth-child(2), .handsontable td:first-of-type, .handsontable .htNoFrame + th, .handsontable .htNoFrame + td{
    border-left: 1px solid #000 !important;
}
#qrCode,.aaa {
    margin: 10px 
}
/*  */
.handsontable .htDimmed{
       color: #000 !important;
   }
   
   .el-input--suffix .el-input__inner{
       padding-right: 0px !important;
   }
  
</style>