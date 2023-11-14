<template>
  <div class="container login">
    <div class="loginBox">
      <div class="loginLogo">
        <img :src="imgList[0].url" >
      </div>
      <div class="loginList">
        <div class="loginItem">
          <div class="ItemL">
            <img :src="imgList[1].url">
          </div>
          <div class="ItemR">
            <el-input type="tel" v-model="phone" maxlength="11" placeholder="请输入手机号码"  placeholder-style="font-size:30px;color:#999999;" />
          </div>
        </div>
        <div class="loginItem">
          <div class="ItemL">
            <img :src="imgList[2].url">
          </div>
          <div class="ItemR">
            <el-input  v-model="yzm" type="text" maxlength="20" placeholder="请输入验证码"  placeholder-style="font-size:30px;color:#999999;" />
          </div>
        </div>
      </div>
      <div class="loginBtn">
        <button class="btn1 btn2" @click="getcode">获取验证码</button>
        <button class="btn1" @click="login">登录</button>`
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        { url: require('../assets/img/logo.jpg')},
        { url: require('../assets/img/LoginIconSjhm.png')},
        { url: require('../assets/img/LoginIconMm.png') },
      ],
      phone:'',
      yzm:'',
    }
  },
  mounted() {

  },
  methods: {
    getcode(){
      let obj = {
        phone:this.phone
      }
      this.$http.post('/auth/sms-send',JSON.stringify(obj), {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        if(res.code == 200){
          this.$message({
            message: '验证码已发送！',
            type: 'success'
          });
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })
    },
    login(){
      // console.log('1111')
      let obj = {
        phone:this.phone,
        code:this.yzm
      }
      this.$http.post('/auth/sms-login',JSON.stringify(obj), {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        if(res.code == 200){
          let loginUser=res.data.user
          // this.$http.post()
          window.localStorage.setItem('loginUser', JSON.stringify(loginUser));
          window.localStorage.setItem('token', res.data.token);
          this.$router.push('ShopList');
          this.$store.commit('setTabname','店家')
          this.$store.commit('setTabact',0)
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })

    },
    login2(){
      let loginUser={
        "userId": 2,
        "name": "顾问1",
        "phone": "101",
        "type": 0,
        "refId": 0
      }
      // this.$http.post()
      window.localStorage.setItem('loginUser', JSON.stringify(loginUser));
      this.$router.push('ShopList');
      this.$store.commit('setTabname','店家')
      this.$store.commit('setTabact',0)
    }
  }
}
</script>

<style lang="scss">
.login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $colorW;
  .loginBox{
    .loginLogo{
      margin-top: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img{
        width: 328px;
        height: 328px;
      }
    }
    .loginList{
      margin-top: 60px;
      width: 100%;
      .loginItem{
        margin: 0 auto 30px;
        width: 620px;
        height: 110px;
        border-radius: 55px;
        background-color: #FFFFFF;
        border:2px solid rgba(225, 225, 225, 1);
        display: flex;
        align-items: center;
        img{
          width: 32px;
          height: 39px;
        }
        .ItemL{
          width: 113px;
          height: 44px;
          border-right: 3px solid #DFDFDF;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ItemR{
          margin-left: 30px;
          width: 460px;
          color: #333333;
          font-size: 30px;
          input{
            border: none;
            height: 44px;
            font-size: 18px;
          }
        }
      }
    }
    .loginCheck{
      //margin: 0 auto;
      width: 620px;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      label{
        color: $fontColor1;
        display: flex;
        align-items: center;
      }
    }
    .loginBtn{
      margin-top: 102px;
      .btn1{
        margin: 20px auto 0;
        width: 620px;
        height: 110px;
        border-radius: 55px;
        background-color: $bgColor;
        box-shadow: 0px 3px 39px 0px $bgColorS;
        border: 1px solid $bgColor;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .btn2{
        border: 1px solid $bgColor;
        box-shadow: none;
        color: $bgColor;
        background-color: #fff;
      }

    }
  }
}
</style>
