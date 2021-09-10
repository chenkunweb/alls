<template>
  <div id="app">
      <!-- <el-button class="btn-orange"  @click="clicks">扫一扫</el-button> -->
     
     <el-dialog title="验证" class="yanzheng" :show-close="false" :visible.sync="yanzhengVisible">
      <el-form ref="loginForm" :model="form" :rules="rules" label-width="40px" class="login-box">
            
            <el-form-item label="" class="flex" prop="phone">
                <el-input type="text" maxlength="11" suffix-icon="el-icon-mobile-phone" placeholder="手机号" v-model="form.phone"/>
                <el-button class="btn-orange" :disabled="disabled" @click="getCode">{{valiBtn}}</el-button>
            </el-form-item>
            <el-form-item label="" prop="code">
                  <div class="verify-wrapper">
                      <el-input type="text" :disabled="form.phone==''" maxlength="6" suffix-icon="el-icon-lock" placeholder="验证码" v-model="form.code"/>
                      
                  </div>
            </el-form-item>
           
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="sub">登陆</el-button>
      </span>
    </el-dialog>
    <router-view/>
  </div>
</template>

<script>

import * as getData from './api/getDate';
export default {
  name: 'App',
  data(){
     var checkPhone = (rule, value, callback) => {
              const reg = /^0?(13[0-9]|15[012356789]|18[0-9]|14[578]|16[6]|17[035768]|19[19])[0-9]{8}$/
              if ( reg.test(value) ) {
                      return callback();
               }
               callback('请输入合法的手机号');
               };
    return{
     direction: 'Left',
      yanzhengVisible:false,
      a:'',
      timestamp:'',
      noncestr:'',
      url:'',
      string1:'',
       form: {
              phone: '',
              code: ''
           },
            autoLogin:false,
           rules: {
                 phone: [{validator: checkPhone, required: true, trigger: 'blur' } ],
                 code:[{required: true, message: '请输入验证码', trigger: 'blur' } ]
            },
            dialogVisible: false,     // 对话框显示和隐藏
            valiBtn:'获取验证码',
            disabled:false,
    }
  },
  mounted(){
    // let a = 'http://shdqstest.zanty.net/?a=2-WoBuShiDouHao-4-2'
    //     console.log(a.split('=')[1])
    // 跳转子页面
    // this.$router.push({path: '/index'});
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
    clicks(){
    
    },
    
    async getList () {
      
      let state = this.util.parse_url("a")
      
      console.log(state)
      if(state){
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww4b634cb35b1893b8&redirect_uri=http%3A%2F%2Fshdqstest.zanty.net&response_type=code&scope=snsapi_base&state='+state+'#wechat_redirect'
        window.location.href=url;
      }else{
         console.log(this.$store.state.userid)
         
        if(this.$store.state.userid==undefined){
          let code = this.util.parse_url('code');
          if(code){
            let corpid = 'ww4b634cb35b1893b8'
            // let corpsecret = '5N2oqnhF6jTeO6VVfaUmnNjyAxsnpzCrCfN6cJL98Io'
            let corpsecret = '0xMt20TdwHWgN7H0qkOnnLjcr9EU8qmre-XzDGYzUbE'
            let access_tokenData = {corpid : corpid,corpsecret:corpsecret}
            let access_token = JSON.parse(await this.$api.api.get('/api/weixin',access_tokenData)).access_token
            console.log(access_token)
            let codeData = { access_token:access_token, code:code }
            let userid = JSON.parse(await this.$api.api.get('/api/ACCCODE',codeData)).UserId
            console.log(userid)
            this.noncestr = userid
            if(userid==undefined){
              userid = 'guest'
              this.yanzhengVisible = true
            }else{
              this.$router.push({path: '/index'});
            }
            this.$store.state.userid = userid
            
          }
        }else{
          this.$router.push({path: '/index'});
        }
      }







    },
    getCode(){
      this.$refs['loginForm'].validateField('phone', (err) =>{
          if(err){
              console.log('未通过')
              return;
          }else{
              console.log('已通过')
              this.tackBtn();   //验证码倒数60秒
              console.log(this.form.phone)
              this.$api.post('/api/SendSms',{a1:'+86'+this.form.phone},res=>{
                console.log(res)
              })
              }
          })
    },
    tackBtn(){       //验证码倒数60秒
            let time = 60;
            let timer = setInterval(() => {
                if(time == 0){
                    clearInterval(timer);
                    this.valiBtn = '获取验证码';
                    this.disabled = false;
                }else{
                    this.disabled = true;
                    this.valiBtn = time + '秒后重试';
                    time--;
                }
            }, 1000);
    },
    sub(){
      console.log(this.form)
      this.$api.get('/api/SendSms',{dh:'+86'+this.form.phone,yzm:this.form.code},res=>{
        console.log(JSON.parse(res.data).Table[0])
        if(JSON.parse(res.data).Table!=''){
          this.$store.state.phone = JSON.parse(res.data).Table[0].电话
          this.yanzhengVisible = false

          this.$router.push({path: '/index'});
        }
        
      })
    },
    
   

  
  
  
  
  },
  components: {
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.flex .el-form-item__content{
  display: flex
}
.yanzheng .el-dialog{
  height: 100% !important;
  margin-top:0px !important;
}
.el-dialog{
  width: 100% !important;
 
}
</style>
