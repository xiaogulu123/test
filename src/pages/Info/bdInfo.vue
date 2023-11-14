<template>
  <div class="wode">
    <div class="mbbox" >
      <div class='orinfo' v-if="loginUser.type <= 1">
        <div class='orinfotop'>
          绑定服务商
        </div>
        <div class='orinfoitem'><p>当前服务商：</p><span>{{nextInfo.name}}</span></div>
        <div class='orinfoitem'><p>需绑定服务商：</p>
          <el-select v-model="fwsvalue" placeholder="请选择服务商">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class='orinfo' v-if="loginUser.type == 2">
        <div class='orinfotop'>
          绑定店家
        </div>
        <div class='orinfoitem'><p>当前店家：</p><span>{{nextInfo.name}}</span></div>
        <div class='orinfoitem'><p>需绑定服务商：</p>
          <el-select v-model="fwsvalue" placeholder="请选择服务商">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="btnBox" >
      <button class="btn1" @click="bd()" v-if="loginUser.type <=1">绑定</button>
      <button class="btn1" @click="bddj()" v-if="loginUser.type == 2">绑定</button>
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
      fwsvalue:'',
      options:[]
    }
  },
  mounted() {
    this.loginUser =  JSON.parse(window.localStorage.getItem('loginUser'))
    this.nextInfo =  JSON.parse(window.sessionStorage.getItem('nextInfo'))
    this.pageIndex =  this.$route.query.pageIndex
    this.getfwslist()
  },
  computed: {

  },
  components: {},
  methods: {
    getfwslist(){
      let obj={
        pageSize:10000,
        page:1,
      }
      this.$http.get('provider', {params: obj}).then(res => {
        if(res.code === 200){
          res.data.rows.forEach(item=>{
            // console.log(item)
            let a={
              value:item.id,
              label:item.name
            }
            this.options.push(a)
          })
        }
      });
    },
    bd(){
      // console.log(this.nextInfo.id,this.fwsvalue)
      let obj = {
        bindFromId:this.nextInfo.id,
        bindToId:this.fwsvalue,
      }
      this.$http.post('provider/bind',JSON.stringify(obj), {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        // console.log(res.code)
        if(res.code == 200){
          // console.log('1233')
          if(this.pageIndex == 1){
            // console.log('11')
            this.$router.push({path:'ServiceList',query:{pageIndex:this.pageIndex}});
            window.sessionStorage.setItem('tabName','服务商')
            window.sessionStorage.setItem('tabIndex',1)
            this.$store.commit('setTabname','服务商')
            this.$store.commit('setTabact',1)
          }
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })
    },
    bddj(){
      // console.log(this.nextInfo.id,this.fwsvalue)
      let obj = {
        bindToId:this.nextInfo.id,
        bindFromId:this.fwsvalue,
      }
      this.$http.post('seller/bind',JSON.stringify(obj), {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        // console.log(res.code)
        if(res.code == 200){
          // console.log('1233')
          if(this.pageIndex == 0){
            // console.log('11')
            this.$router.push({path:'ServiceList',query:{pageIndex:this.pageIndex}});
            window.sessionStorage.setItem('tabName','店家')
            window.sessionStorage.setItem('tabIndex',0)
            this.$store.commit('setTabname','店家')
            this.$store.commit('setTabact',0)
          }
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })
    },
  }
}
</script>

<style lang="scss">
.wode{
  .orinfo{
    font-size: 28px;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
    .orinfotop{
      padding: 20px;
      font-size: 32px;
      font-weight: bold;
      color: $bgColor;
      display: flex;
      align-items: center;
      image{
        margin-left: 10px;
        width: 80px;
        height: 36px;
      }
    }
    .orinfoitem{
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      white-space: nowrap;
      p{
        //text-align: center;
        width: 200px;
      }
      span{
        color: $bgColor;
      }
      .el-input{
        width: 400px;
        input{
          width: 400px;
        }
      }
    }
  }
}
</style>
