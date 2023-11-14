<template>
  <div class="wode">
    <div class="mbbox">
      <div class='orinfo'>
        <div class='orinfotop'>
<!--          查看详细信息-->
        </div>
        <div class='orinfoitem'><p>名称：</p><span>{{info.name}}</span></div>
        <div v-if="info.gender" class='orinfoitem'><p>性别：</p><span>{{info.gender}}</span></div>
        <div class='orinfoitem'><p>真实姓名：</p><span>{{info.realName}}</span></div>
        <div class='orinfoitem'><p>联系电话：</p><span>{{info.phone}}</span></div>
        <div v-if="info.hasCabin" class='orinfoitem'><p>是否有小屋：</p>
          <span v-if="info.hasCabin == false">否</span>
          <span v-if="info.hasCabin == true">是</span>
        </div>
        <div class='orinfoitem' v-if="loginUser.type == 2"><p>上级服务商：</p><span>{{info.refProviderName}}</span></div>
        <div class='orinfoitem' v-if="loginUser.type == 3"><p>所属服务商：</p><span>{{info.refProviderName}}</span></div>
        <div class='orinfoitem' v-if="loginUser.type == 3"><p>上级服务商：</p><span>{{info.topProviderName}}</span></div>
      </div>
      <div class='orinfo'  v-if="info.company">
        <div class='orinfotop'>
          银行卡信息
        </div>
        <el-card style="margin: 5px 5px 5px 5px" v-for="(item,index) in info.company" :key="index">
          <div class='orinfoitem'><p>公司名：</p><span>{{item.name}}</span></div>
          <div class='orinfoitem'><p>银行卡：</p><span>{{item.bankAccount}}</span></div>
          <div class='orinfoitem'><p>开户行：</p><span>{{item.openingBank}}</span></div>
        </el-card>
      </div>
      <div class='orinfo'  v-if="info.family">
        <div class='orinfotop'>
          家庭信息
        </div>
        <el-card style="margin: 5px 5px 5px 5px" v-for="(item,index) in info.family" :key="index">
          <div class='orinfoitem'><p>姓名：</p><span>{{item.name}}</span></div>
          <div class='orinfoitem'><p>性别：</p><span>{{item.gender}}</span></div>
          <div class='orinfoitem'><p>关系：</p><span>{{item.relation}}</span></div>
          <div class='orinfoitem'><p>身份证：</p><span>{{item.idCard}}</span></div>
          <div class='orinfoitem'><p>联系电话：</p><span>{{item.phone}}</span></div>
        </el-card>
      </div>
    </div>
    <div class="btnBox" >
      <button class="btn1" @click="nextPage()">退出登录</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loginUser:{},
      info:{}
    }
  },
  mounted() {
    this.loginUser =  JSON.parse(window.localStorage.getItem('loginUser'))
    // console.log(this.loginUser)
    this.getInfo()
  },
  computed: {

  },
  components: {},
  methods: {
    getInfo(){
      if(this.loginUser.type == 0){
      this.$http.get('admin/'+this.loginUser.userId, {}).then(res => {
        // console.log(res)
        this.info = res.data
      });
    }else if(this.loginUser.type == 1){
      this.$http.get('consultant/'+this.loginUser.userId, {}).then(res => {
        // console.log(res)
        this.info = res.data
      });
    }else if(this.loginUser.type == 2){
      this.$http.get('provider/'+this.loginUser.userId, {}).then(res => {
        // console.log(res)
        this.info = res.data
      });
    }else if(this.loginUser.type == 3){
      this.$http.get('seller/'+this.loginUser.userId, {}).then(res => {
        // console.log(res)
        this.info = res.data
      });
    }

    },
    nextPage(){
      this.$router.push('login')
      // window.sessionStorage.removeItem('next')
    }
  }
}
</script>

<style lang="scss">

</style>
