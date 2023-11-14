<template>
  <div class="topbox" >
<!--    <div class="tit">列表</div>-->
    <div class="toptit">
<!--      <img v-if="RouterTo!='ShopList' && RouterTo !='ServiceList' && RouterTo!='MyInfo'" class="toptarrow" src="../assets/img/arrow.png" @click="nextPage()">-->
      <div class="toptname">{{tabName}}<span></span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topBar",
  computed: {
    tabName() {
      return this.$store.state.tabName
    },
  },
  props: {
    RouterTo:{
      type:String,
      default:''
    },
    RouterFrom:{
      type:String,
      default:''
    },
  },
  data(){
    return{

    }
  },
  methods:{
    nextPage(){
      // console.log(this.RouterFrom,this.RouterTo)
      // this.$router.push({path:this.RouterFrom})
      let router = window.sessionStorage.getItem('navRouter')
      let tabIndex = window.sessionStorage.getItem('tabIndex')
      if(router === 'CustomList'){
        this.$router.push({path:'ShopList',query:{pageIndex:0}})
        window.sessionStorage.setItem('tabName','店家')
        window.sessionStorage.setItem('tabIndex',0)
        this.$store.commit('setTabname','店家')
        this.$store.commit('setTabact',0)
      }else if(router === 'ServiceListxj' || router === 'ServiceListdj'){
        this.$router.push({path:'ServiceList',query:{pageIndex:1}})
        window.sessionStorage.setItem('tabName','服务商')
        window.sessionStorage.setItem('tabIndex',1)
        this.$store.commit('setTabname','服务商')
        this.$store.commit('setTabact',1)
      }else if(router === 'viewInfo' || router === 'addInfo'){
        if(tabIndex == 0){
          this.$router.push({path:'ShopList',query:{pageIndex:0}})
          window.sessionStorage.setItem('tabName','店家')
          window.sessionStorage.setItem('tabIndex',0)
          this.$store.commit('setTabname','店家')
          this.$store.commit('setTabact',0)
        }else if(tabIndex == 1){
          this.$router.push({path:'ServiceList',query:{pageIndex:1}})
          window.sessionStorage.setItem('tabName','服务商')
          window.sessionStorage.setItem('tabIndex',1)
          this.$store.commit('setTabname','服务商')
          this.$store.commit('setTabact',1)
        }
      }
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">

</style>
