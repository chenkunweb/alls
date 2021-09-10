<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
     
    }
  },

  mounted(){
    //vuex刷新页面本地缓存
     if (sessionStorage.getItem('userinfo')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('userinfo'))));
        }

        //在页面刷新时,将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('userinfo', JSON.stringify(this.$store.state));
        });
     this.getList()
    
    
    
  },
  created(){
  },
  methods:{
    async getList () {
      
      let parames = this.util.parse_url('code');
      let userid = this.util.parse_url('userid');
      this.codes = parames
      this.userid = parames
      if(parames){
        let corpid = 'ww4b634cb35b1893b8'
        let corpsecret = 'WdYwLPdQKm9hjGTtoGM7YqxtTDVNCVE3h8qrJO-HsuU'
        let access_tokenData = {corpid : corpid,corpsecret:corpsecret}
        let access_token = JSON.parse(await this.$api.api.get('/api/weixin',access_tokenData)).access_token
        let codeData = { access_token:access_token, code:parames }
        let code = JSON.parse(await this.$api.api.get('/api/ACCCODE',codeData)).UserId
      
        if(code){ this.$store.state.userid = code }
        this.$router.push({path: '/index'});
        this.code = this.$store.state.userid
      }
      if(userid){
        this.$router.push({path: '/index'});
         this.$store.state.userid = userid
      }
      this.$router.push({path: '/index'});
      

    }
  }
}
</script>

<style>
body{
  background: #ddd;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  /* margin-top: 60px; */
  height: 100%;
}

</style>
