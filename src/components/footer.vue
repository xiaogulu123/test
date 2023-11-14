<template>
  <div class="footbox" >
    <div class="footItem" v-for="(item,index) in tablist[loginIndex]" :key="index" @click="nextPage(item,index)">
      <img v-if="tabAct == index " :src="item.url2">
      <img v-else :src="item.url1">
      <div class="footItemwz" :class="{'footItemwzA':tabAct == index}">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footBar",
  computed: {
    tabAct() {
      return this.$store.state.tabAct
    }
  },
  data () {
    return {
      tablist:[
        [
          { url1: require('../assets/img/dp1.png'),url2: require('../assets/img/dp2.png'),name:'店家管理',router:'ShopList',tabname:'店家'},
          { url1: require('../assets/img/fws1.png'),url2: require('../assets/img/fws2.png'),name:'服务商管理',router:'ServiceList',tabname:'服务商'},
          { url1: require('../assets/img/grzx1.png'),url2: require('../assets/img/grzx2.png'),name:'个人中心',router:'MyInfo',tabname:'我的'},
        ],
        [
          { url1: require('../assets/img/dp1.png'),url2: require('../assets/img/dp2.png'),name:'店家管理',router:'ShopList',tabname:'店家'},
          { url1: require('../assets/img/fws1.png'),url2: require('../assets/img/fws2.png'),name:'服务商管理',router:'ServiceList',tabname:'服务商'},
          { url1: require('../assets/img/grzx1.png'),url2: require('../assets/img/grzx2.png'),name:'个人中心',router:'MyInfo',tabname:'我的'},
        ],
        [
          { url1: require('../assets/img/dp1.png'),url2: require('../assets/img/dp2.png'),name:'下级店家',router:'ShopList',tabname:'店家'},
          { url1: require('../assets/img/fws1.png'),url2: require('../assets/img/fws2.png'),name:'下级服务商',router:'ServiceList',tabname:'服务商'},
          { url1: require('../assets/img/grzx1.png'),url2: require('../assets/img/grzx2.png'),name:'个人中心',router:'MyInfo',tabname:'我的'},
        ],
        [
          { url1: require('../assets/img/dp1.png'),url2: require('../assets/img/dp2.png'),name:'客户列表',router:'client',tabname:'客户'},
          { url1: require('../assets/img/grzx1.png'),url2: require('../assets/img/grzx2.png'),name:'个人中心',router:'MyInfo',tabname:'我的'},
        ],
      ],
      loginUser:{},
      loginIndex:0
    }
  },
  methods:{
    nextPage(data,index){
      this.$router.push(data.router);
      this.$store.commit('setTabname',data.tabname)
      this.$store.commit('setTabact',index)
      window.sessionStorage.setItem('tabName',data.tabname)
      window.sessionStorage.setItem('tabIndex',index)
    }
  },
  mounted() {
    this.loginUser =  JSON.parse(window.localStorage.getItem('loginUser'))
    this.loginIndex = this.loginUser.type
    // if(this.loginUser.type === 'consultant'){
    //   this.loginIndex = 0
    // }else if(this.loginUser.type === 'provider'){
    //   this.loginIndex = 1
    // }else if(this.loginUser.type === 'seller'){
    //   this.loginIndex = 2
    // }
  }
}
</script>

<style lang="scss">
.footbox{
  padding: 0 105px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .footItem{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 40px;
      height: 40px;
    }
    .footItemwz{
      margin-top: 10px;
      font-size: 20px;
      color: $fontColor2;
    }
    .footItemwzA{
      color: $bgColor;
    }
    //&:nth-child(2){
    //  margin-top: -20px;
    //  img{
    //    width: 80px;
    //    height: 80px;
    //  }
    //}
  }
}
</style>
