<template>
  <div class="wode">
    <!--详细信息-->
    <div class="mbbox" v-if="!qrtype">
      <div class='orinfo' >
        <div class='orinfotop'>
          确认信息-{{info.title}}
        </div>
        <div class='orinfoitem'><p>姓名：</p><span>{{info.data.clientName}}</span></div>
        <div class='orinfoitem'><p>联系电话：</p><span>{{info.data.phone}}</span></div>
        <div class='orinfoitem'><p>信息：</p><span class="message">{{info.data.message}}</span></div>
      </div>
    </div>
    <div class="btnBox" >
      <button v-if="!qrtype" class="btn1" @click="qr()">确认</button>
      <button v-else class="btn1 btn2">已确认</button>
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
      info:{},
      qrtype:false
    }
  },
  mounted() {
    this.loginUser =  JSON.parse(window.localStorage.getItem('loginUser'))
    if(location.href.split('?')[1].includes('-')){
      this.confirm(location.href.split('?')[1].split('-')[0])
    }else {
      this.getqrInfo(location.href.split('?')[1])
    }

  },
  computed: {

  },
  components: {},
  methods: {
    getqrInfo(i){
      this.$http.get('confirm/'+i).then(res=>{
        if(res.code == 200){
          // console.log(res.data)
          this.info = res.data
        }
      })
    },
    qr(){
      // console.log(window.getMetaInfo())
      // window.getMetaInfo()
      // 在调用实人认证服务端发起认证请求时需要传入该MetaInfo值
      let MetaInfo = window.getMetaInfo();
      // console.log(MetaInfo.toString(),JSON.stringify(MetaInfo))
      MetaInfo = JSON.stringify(MetaInfo)
      let obj={
        phone:this.info.data.phone,
        metaInfo:MetaInfo,//前端 window.getMetaInfo()
        returnUrl:location.href+'-confirm=true'
      }
      this.$http.post('auth/face-init',JSON.stringify(obj), {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        if(res.code == 200){
          // console.log(res.data)
          window.location.href = res.data.certifyUrl;
        }
      })
      //
    },
    confirm(i){
      let obj={
        id:i
      }
      this.$http.post('confirm',JSON.stringify(obj), {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        if(res.code == 200){
          // console.log(res.data)
          this.qrtype = true
        }
      })
    }

  },
  beforeDestroy() {
    this.Info = {}
  }
}
</script>

<style lang="scss">

</style>
