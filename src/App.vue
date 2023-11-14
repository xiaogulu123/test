<template>
  <div id="app">
    <div class="box">
      <topBar class="topBar"  v-if="logintype && RouterTo!='confirm'" :RouterTo="RouterTo" :RouterFrom="RouterFrom"></topBar>
      <div class="centre">
        <div class="changeBox">
          <router-view/>
        </div>
      </div>
      <footBar v-if="logintype && RouterTo!='confirm'" ></footBar>
    </div>
  </div>
</template>

<script>
import footBar from '@/components/footer.vue'
import topBar from '@/components/topbar.vue'
export default {
  data () {
    return {
      //判断导航是否存在条件
      logintype:false,
      RouterTo: '',
      RouterFrom: '',
    }
  },
  watch:{
    $route(to, from) {
      // console.log('from', from);//从哪来
      // console.log('to', to);//到哪去
      window.sessionStorage.setItem('navRouter',to.name)
      this.RouterTo = to.name
      this.RouterFrom = from.name
      if(to.name != 'login'){
        let loginState = window.localStorage.getItem('loginState')
        if(loginState == 'false'){
          // console.log('未登录')
          this.$router.push({
            name: 'login'
          })
        }else {
          this.logintype = true
        }
      }else {
        this.logintype = false
      }
    },
  },
  components:{
    footBar,
    topBar
  },
  mounted() {
    let navRouter = window.sessionStorage.getItem('navRouter')
    // console.log(navRouter)
    if(navRouter !='login'&& navRouter !='dp' && navRouter != null){
      this.logintype = true
    }else {
      this.logintype = false
    }
  }
}
</script>

<style lang="scss">
@import "assets/css/common.css";
//1.App样式
//顶部导航
.topbox{
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 20;
  background-color: $colorW;
  display: flex;
  align-items: center;
  justify-content: center;
  .toptarrow{
    position: absolute;
    top: 18px;
    left: 10px;
    width: 24px;
    height: 38px;
    transform: rotate(180deg);
  }
  .toptit{
    height: 88px;
    padding: 0 30px;
    color: rgba(0, 0, 0, 1);
    font-size: 32px;
    //box-shadow: 0px 1px 0px 0px #D7D7D7;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .toptname{
      position: relative;
      span{
        position: absolute;
        left: 0;
        top: 20px;
        width: 114px;
        height: 22px;
        background: linear-gradient(270deg, rgba(83,218,173,0) 0%, $bgColor 100%);
        opacity: 0.3;
      }
    }
  }
}
//中心
.centre{
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 100px;
  height: 1050px;
  overflow: auto;
  .changeBox{
    //height:1050px;
    //overflow: auto;
  }
}
//footer
.footbox{
  position: fixed;
  bottom: 0;
  width: calc(100% - 210px);
  height: 140px;
  background-color: $colorW;
}
//标题文字
.tit{
  font-size: $fontSize1;
}

//2.element样式
//input
.el-input__inner:focus {
  border-color: #dcdfe6 !important;
}
//check高亮颜色
//聚焦
.is-focus{
  .el-checkbox__inner{
    border-color: $checkColor !important;
  }
}
//选中
.is-checked{
  .el-checkbox__label{
    color: $checkColor !important;
  }
  .el-checkbox__inner{
    background-color: $checkColor !important;
    border-color: $checkColor !important;
  }
}
//下拉选中
.el-select-dropdown__item.selected{
  color: $bgColor !important;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color: $bgColorS2 !important;
}
.el-range-editor.is-active, .el-range-editor.is-active:hover, .el-select .el-input.is-focus .el-input__inner{
  border-color: $bgColor !important;
}
.el-select-dropdown__item{
  height: 45px !important;
  font-size: 18px !important;
  line-height: 45px !important;
}
.el-select-dropdown__list{
  padding: 0 !important;
}
//3.自定义样式
//btn
.btn{
  //width: 56px;
  padding: 2px 8px;
  margin-right: 5px;
  height: 24px;
  border-radius: 4px;
  background-color: $checkColor;
  border: 1px solid $colorW;
  color: $colorW;
}
//mask 蒙版
.mask{
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(256,256,256,0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $bgColor;
  font-size: $fontSize1;
  .mInfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    i{
      font-size: 50px;
      margin-bottom: 10px;
    }
  }
  .mClose{
    cursor: pointer;
    position: absolute;
    top:180px;
    right: 80px;
    font-size: 32px;
    color: $bgColor;
  }
}
.mbbox{
  margin: 20px auto;
  width: 708px;
  background-color: $colorW;
  border-radius: 20px;
}
//信息页面
.wode{
  .mbbox{
    height: 900px;
    overflow: auto;
  }
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
    .orinfotop2{
      padding: 20px;
      font-size: 32px;
      font-weight: bold;
      color: $bgColor;
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
        display: block;
        white-space: break-spaces;
        width: calc(100% - 210px);
      }
      .el-input{
        width: 400px;
        input{
          width: 400px;
          height: 60px;
          border-radius: 10px;
          font-size: 20px;
        }
      }
    }
  }
  .btnBox{
    .btn1{
      margin: 20px auto 0;
      width: 300px;
      height: 60px;
      border-radius: 55px;
      background-color: #fff;
      box-shadow: 0px 1px 10px 0px $bgColorS;
      border: 1px solid $bgColor;
      color: $bgColor;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn2{
      margin: 20px auto 0;
      width: 300px;
      height: 60px;
      border-radius: 55px;
      background-color: #fff;
      box-shadow: 0px 1px 10px 0px $bgColorS;
      border: 1px solid $bgColor;
      color: $bgColor;

    }
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
}
</style>
