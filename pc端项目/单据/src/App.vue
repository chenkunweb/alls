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
   
  },
  created(){
                    
                    
      if (sessionStorage.getItem('userinfo')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('userinfo'))));
        }

        //在页面刷新时,将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('userinfo', JSON.stringify(this.$store.state));
        });
      
    },
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
  }
  body{
      overflow: scroll;
      background: #E6E8EB;
      /* text-align: center; */
  }
  body::-webkit-scrollbar{
    display: none
  }
  td{
    text-align: center;
  }
#app {
  font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #000;
  font-weight: bold;
  margin-top: 40px;
  /* font-size: 12px */
  /* font-size: 12px */
  /* line-height: 60px */
  
  
}
</style>
