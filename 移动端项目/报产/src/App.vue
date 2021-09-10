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
      name:''
    }
  },
  mounted(){
     if (sessionStorage.getItem('userinfo')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('userinfo'))));
        }

        //在页面刷新时,将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('userinfo', JSON.stringify(this.$store.state));
        });
    this.getList()
  },
  methods:{
    async getList () {
    
      let state = this.util.parse_url("a")
      console.log(state)
      if(state){
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww4b634cb35b1893b8&redirect_uri=https%3A%2F%2Fwww.zanty.net%3A8133&response_type=code&scope=snsapi_base&state='+state+'#wechat_redirect'
        window.location.href=url;
      }else{
         console.log(this.$store.state.userid)
         
        if(this.$store.state.userid==undefined){
          let code = this.util.parse_url('code');
          if(code){
            let corpid = 'ww4b634cb35b1893b8'
            // let corpsecret = '5N2oqnhF6jTeO6VVfaUmnNjyAxsnpzCrCfN6cJL98Io'
            let corpsecret = '1udn6iwYkjMLTm8xGdyMsMj5Iu2rfrSbsM7Cj5nhtrc'
            let access_tokenData = {corpid : corpid,corpsecret:corpsecret}
            let access_token = JSON.parse(await this.$api.api.get('/api/weixin',access_tokenData)).access_token
            console.log(access_token)
            let codeData = { access_token:access_token, code:code }
            let userid = JSON.parse(await this.$api.api.get('/api/ACCCODE',codeData)).UserId
            console.log(userid)
            if(userid==undefined){
              this.$message.error('请用企业微信扫码进入');
            }else{
              this.$store.state.userid = userid
              this.$router.push({path: '/index'});
            }
            
            
            this.name = userid
            
          }
        }else{
          this.$router.push({path: '/index'});
        }
      }
    },
  }
}
</script>

<style>
html,body{
  margin: 0px;
  padding:0px
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin: 0px 10px
}
</style>
