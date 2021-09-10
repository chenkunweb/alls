<template>
  <div id="app">
    <!-- router-l -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  date(){
    return{
      // datas:''
    }
  },
  mounted(){
    // this.$router.push({path: '/shouye'});
    var parames = this.util.parse_url();
     if(parames.userid){
       this.$store.state.userid = parames.userid
       console.log(parames)
     }

  },
  created(){
  if (sessionStorage.getItem('userinfo')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('userinfo'))));
        }

        //在页面刷新时,将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('userinfo', JSON.stringify(this.$store.state));
        });
 
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
  /* overflow-y: hidden */
}
html,body{
  overflow-x:hidden;
  /* overflow-y:hidden; */
}

</style>
