<template>
  <div class="wode">
    <!--详细信息-->
    <div class="mbbox">
      <div class='orinfo'>
        <div class='orinfotop'>
          查看详细信息
        </div>
        <div class='orinfoitem'><p>名称：</p><span>{{info.name}}</span></div>
        <div class='orinfoitem'><p>性别：</p><span>{{info.gender}}</span></div>
        <div class='orinfoitem'><p>实体人姓名：</p><span>{{info.realName}}</span></div>
        <div class='orinfoitem'><p>联系电话：</p><span>{{info.phone}}</span></div>
        <div class='orinfoitem'><p>是否有小屋：</p>
          <span v-if="info.hasCabin == false">否</span>
          <span v-if="info.hasCabin == true">是</span>
        </div>
        <div class='orinfoitem' v-if="pageIndex==1"><p>上级服务商：</p><span>{{info.refProviderName}}</span></div>
        <div class='orinfoitem' v-if="pageIndex==0"><p>所属服务商：</p><span>{{info.refProviderName}}</span></div>
        <div class='orinfoitem' v-if="pageIndex==0"><p>上级服务商：</p><span>{{info.topProviderName}}</span></div>
      </div>
      <div class='orinfo' v-if="loginUser.type <2">
        <div class='orinfotop'>
          公司信息
        </div>
        <el-card style="margin: 5px 5px 5px 5px" v-for="(item,index) in info.company" :key="index">
          <div class='orinfoitem'><p>公司名：</p><span>{{item.name}}</span></div>
          <div class='orinfoitem'><p>银行卡：</p><span>{{item.bankAccount}}</span></div>
          <div class='orinfoitem'><p>开户行：</p><span>{{item.openingBank}}</span></div>
        </el-card>
      </div>
      <div class='orinfo' v-if="loginUser.type <2">
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
    <div class="btnBox" v-if="loginUser.type == 0">
      <button class="btn1" @click="nextPage()">编辑信息</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loginUser:{},
      nextInfo:{},
      type:0,
      pageIndex:0,
      info:{}
    }
  },
  mounted() {
    this.loginUser =  JSON.parse(window.localStorage.getItem('loginUser'))
    this.nextInfo =  JSON.parse(window.sessionStorage.getItem('nextInfo'))
    this.pageIndex =  this.$route.query.pageIndex
    if(this.pageIndex == 0){
      this.getdjInfo()
    }else if(this.pageIndex == 1){
      this.getfwsInfo()
    }

  },
  computed: {

  },
  components: {},
  methods: {
    getdjInfo(){
      this.$http.get('seller/'+this.nextInfo.id).then(res=>{
        if(res.code == 200){
          // console.log(res.data)
          this.info = res.data
        }
      })
    },
    getfwsInfo(){
      this.$http.get('provider/'+this.nextInfo.id).then(res=>{
        if(res.code == 200){
          // console.log(res.data)
          this.info = res.data
        }
      })
    },
    nextPage(){
      this.$router.push('addInfo')
      if(this.pageIndex === 0){
        window.sessionStorage.setItem('tabName','店家')
        this.$store.commit('setTabname','店家')
        this.$store.commit('setTabact',0)
      }else if(this.pageIndex === 1){
        window.sessionStorage.setItem('tabName','服务商')
        this.$store.commit('setTabname','服务商')
        this.$store.commit('setTabact',1)
      }
    }
  },
  beforeDestroy() {
    this.Info = {}
  }
}
</script>

<style lang="scss">

</style>
