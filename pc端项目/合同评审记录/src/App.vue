<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    if (sessionStorage.getItem('userinfo')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('userinfo'))));
        }

        //在页面刷新时,将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('userinfo', JSON.stringify(this.$store.state));
        });
        this.getData()
  },
  methods:{
    async getData(){
      let corpid = 'ww4b634cb35b1893b8'
      let corpsecret = 'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U'
      let access_tokenData = {corpid : corpid,corpsecret:corpsecret}
      let access_token = JSON.parse(await this.$api.api.get('/api/weixin',access_tokenData)).access_token
      let userData = {
        access_token:access_token,
        department_id:1,
        fetch_child:1,
      }
      let ljdmValue = JSON.parse(await this.$api.api.get('/api/HTPS','')).Table
      console.log(ljdmValue)
      let list = JSON.parse(await this.$api.api.get('/api/HTPS',{start:'',i:4})).Table
      console.log(list)
      this.$store.state.userlist = JSON.parse(await this.$api.api.get('/api/userlist',userData)).userlist
      
      this.$store.state.options = ljdmValue.map((item)=>{
          return {
              label:item.co_num.replace(/\s+/g, ""),
              value:item.co_num.replace(/\s+/g, ""),
          }
      })
      this.$store.state.optionss = list.map((item)=>{
          return {
              label:item.合同评审号,
              value:item.合同评审号,
          }
      })
      
      this.$router.push({path: '/index'});
    }
  }
    
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  width: 1000px;margin: 0px auto
}
</style>
