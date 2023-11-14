<template xmlns="http://www.w3.org/1999/html">
  <div class="list">
    <div class="mbsearch" v-if="searchShow.includes('xlinput')">
      <el-select v-model="selectvalue1" placeholder="请选择搜索选项">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input class="mbsinput" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchInput"></el-input>
    </div>
    <div class="mbsearch mbsearch2" v-if="searchShow.includes('sx')">
        <el-select v-model="selectvalue2" placeholder="请选择绑定情况">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>

    </div>
    <div class="mbbox mbtable">
      <div class="mbbtn" >
        <el-button @click="query()">查询</el-button>
        <el-button v-if="loginUser.type == 0" @click="addInfo()">添加</el-button>
        <el-button v-if="loginUser.type == 1 && pageIndex == 3" @click="addInfo()">添加并绑定客户</el-button>
<!--        <el-button v-if="loginUser.type == 1 && pageIndex == 2" @click="addInfo()">添加下级服务商</el-button>-->
      </div>
      <el-table ref="multipleTable" :data="listdata" tooltip-effect="dark" style="width: 100%" height="320">
        <el-table-column :label="item.label" :prop="item.name" width="120" v-for="(item,index) in listlabel" show-overflow-tooltip  align="center"></el-table-column>
        <el-table-column prop="" label="操作" width="120" align="center" fixed="right">
          <template slot-scope="scope">
<!--            <span class="bdBtn" v-if="btnShow.includes('bj') && loginUser.type == 0" @click="nextInfo('editInfo',scope.row)">编辑</span>-->
<!--            <span class="bdBtn" v-if="btnShow.includes('info')" @click="nextInfo('viewInfo',scope.row)">详细信息</span>-->
<!--            <span class="bdBtn" v-if="btnShow.includes('del') && loginUser.type == 0" @click="delInfo(scope.row)">删除</span>-->
<!--            <span class="bdBtn" v-if="btnShow.includes('khlist')" @click="nextList('CustomList',scope.row,3)" >客户列表</span>-->
<!--            <span class="bdBtn" v-if="btnShow.includes('xjfws')" @click="nextList('ServiceListxj',scope.row,2)">下级服务列表</span>-->
<!--            <span class="bdBtn" v-if="btnShow.includes('xjfws')" @click="nextList('ServiceListdj',scope.row,2)">下级店家列表</span>-->
<!--            <span class="bdBtn" v-if="btnShow.includes('bdfws')" @click="nextInfo('bdInfo',scope.row)">绑定</span>-->
<!--            <span class="bdBtn" v-if="btnShow.includes('bddj') && loginUser.type == 2" @click="nextInfo('bdInfo',scope.row)">绑定</span>-->

<!--            <span class="bdBtn" v-if="btnShow.includes('del2')" @click="delInfo(scope.row)">删除并解绑</span>-->
            <slot name="option" v-bind:row="scope.row">


            </slot>

<!--            <div v-if="type==='client'&&btnShow.includes('del2')">-->
<!--              <span class="bdBtn"  @click="delInfo(scope.row)">删除并解绑</span>-->
<!--            </div>-->
<!--            <div v-if="type!=='client'">-->
<!--              <el-dropdown  trigger="click" v-if="loginUser.type === 0">-->
<!--                <button class="btn1">-->
<!--                  展开<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--                </button>-->
<!--                <el-dropdown-menu slot="dropdown">-->
<!--                  <el-dropdown-item icon="el-icon-setting" v-if="btnShow.includes('bj')">-->
<!--                    <span class="bdBtn"  @click="nextInfo('editInfo',scope.row)">编辑</span>-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item icon="el-icon-delete" v-if="btnShow.includes('del')" >-->
<!--                    <span class="bdBtn" @click="delInfo(scope.row)">删除</span>-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item icon="el-icon-s-cooperation"  v-if="btnShow.includes('xjfws')" >-->
<!--                    <span class="bdBtn" @click="nextList('ServiceListxj',scope.row,2)">下级服务列表</span>-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item icon="el-icon-s-goods" v-if="btnShow.includes('xjfws')">-->
<!--                    <span class="bdBtn"  @click="nextList('ServiceListdj',scope.row,2)">下级店家列表</span>-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item icon="el-icon-user-solid" v-if="btnShow.includes('khlist')">-->
<!--                    <span class="bdBtn"  @click="nextList('CustomList',scope.row,3)" >客户列表</span>-->
<!--                  </el-dropdown-item>-->
<!--                </el-dropdown-menu>-->
<!--              </el-dropdown>-->
<!--              <el-dropdown  trigger="click" v-if="loginUser.type === 1">-->
<!--                <button class="btn1">-->
<!--                  展开<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--                </button>-->
<!--                <el-dropdown-menu slot="dropdown">-->
<!--                  <el-dropdown-item icon="el-icon-setting" v-if="btnShow.includes('info')">-->
<!--                    <span class="bdBtn" v-if="btnShow.includes('info')" @click="nextInfo('viewInfo',scope.row)">详细信息</span>-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item icon="el-icon-s-cooperation"  v-if="btnShow.includes('xjfws')" >-->
<!--                    <span class="bdBtn" @click="nextList('ServiceListxj',scope.row,2)">下级服务列表</span>-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item icon="el-icon-s-goods" v-if="btnShow.includes('xjfws')">-->
<!--                    <span class="bdBtn"  @click="nextList('ServiceListdj',scope.row,2)">下级店家列表</span>-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item icon="el-icon-user-solid" v-if="btnShow.includes('khlist')">-->
<!--                    <span class="bdBtn"  @click="nextList('CustomList',scope.row,3)" >客户列表</span>-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item icon="el-icon-user-solid" v-if="btnShow.includes('bdfws')">-->
<!--                    <span class="bdBtn" v-if="btnShow.includes('bdfws')" @click="nextInfo('bdInfo',scope.row)">绑定</span>-->
<!--                  </el-dropdown-item>-->
<!--                </el-dropdown-menu>-->
<!--              </el-dropdown>-->
<!--              <el-dropdown  trigger="click" v-if="loginUser.type === 2">-->
<!--                <button class="btn1">-->
<!--                  展开<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--                </button>-->
<!--                <el-dropdown-menu slot="dropdown">-->
<!--                  <el-dropdown-item icon="el-icon-setting" v-if="btnShow.includes('info')">-->
<!--                    <span class="bdBtn" v-if="btnShow.includes('info')" @click="nextInfo('viewInfo',scope.row)">详细信息</span>-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item icon="el-icon-s-goods" v-if="btnShow.includes('xjfws')">-->
<!--                    <span class="bdBtn"  @click="nextList('ServiceListdj',scope.row,2)">下级店家列表</span>-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item icon="el-icon-user-solid" v-if="btnShow.includes('khlist')">-->
<!--                    <span class="bdBtn"  @click="nextList('CustomList',scope.row,3)" >客户列表</span>-->
<!--                  </el-dropdown-item>-->
<!--                  <el-dropdown-item icon="el-icon-user-solid" v-if="btnShow.includes('bddj')">-->
<!--                    <span class="bdBtn" @click="nextInfo('bdInfo',scope.row)">绑定</span>-->
<!--                  </el-dropdown-item>-->
<!--                </el-dropdown-menu>-->
<!--              </el-dropdown>-->
<!--            </div>-->

          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="fy" layout="prev, pager, next" :total="totalCount"  @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>

<script>

import login from "@/pages/login.vue";

export default {
  props: {
    totalCount:{
      type:Number,
      default:0
    },
    listdata: {
      type: Array,
      default: []
    },
    listlabel: {
      type: Array,
      default: []
    },
    options: {
      type: Array,
      default: []
    },
    options2: {
      type: Array,
      default: []
    },
    btnShow:{
      type: Array,
      default: []
    },
    searchShow:{
      type:Array,
      default:[]
    },
    pageIndex:{
      type:Number,
      default:0
    },
    type: ''
  },
  data() {
    return {
      loginUser:{},
      multipleSelection: [],
      searchInput:'',
      selectvalue1: '',
      selectvalue2: '',
      navRouter:''
    }
  },
  created() {},
  mounted() {
    this.loginUser =  JSON.parse(window.localStorage.getItem('loginUser'))
    this.navRouter = window.sessionStorage.getItem('navRouter')
    this.selectvalue1=this.options[0].value
    this.selectvalue2=this.options2[0].value
  },
  computed: {
    login() {
      return login
    }

  },
  components: {},
  methods: {
    //查询
    query(){
      // console.log(this.searchInput,this.selectvalue1,this.selectvalue2)
      let searchInfo = {
        searchInput:this.searchInput,
        selectvalue1:this.selectvalue1,
        selectvalue2:this.selectvalue2
      }
      this.$emit('query',searchInfo)
    },
    //分页
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange',val)
    },
    //添加
    addInfo(){
      this.$router.push({path:'addInfo',query:{pageIndex:this.pageIndex}});
    },
    //删除
    delInfo(data){
      if(this.pageIndex == 0){
        // console.log(1111)
        this.$http.delete('seller/'+data.id).then(res => {
          // console.log(res)
          this.$emit('delInfo',res.code)
        });
      }else if(this.pageIndex == 1){
        // console.log(1111)
        this.$http.delete('provider/'+data.id).then(res => {
          // console.log(res)
          this.$emit('delInfo',res.code)
        });
      } else if(this.pageIndex == 3){
        // console.log(1111)
        this.$http.delete('client/unbundled/'+data.id).then(res => {
          // console.log(res)
          this.$emit('delInfo',res.code)
        });
      }
    },
    // 下一个列表
    nextList(router,data,pageIndex){
      // console.log(data)
      this.$router.push({path:router,query:{pageIndex:pageIndex}})
      window.sessionStorage.setItem('nextInfo', JSON.stringify(data))
      if(router === 'CustomList'){
        window.sessionStorage.setItem('tabName','客户')
        window.sessionStorage.setItem('tabIndex',0)
        this.$store.commit('setTabname','客户')
        this.$store.commit('setTabact',0)
      }else if(router === 'ServiceListxj'){
        window.sessionStorage.setItem('tabName',data.name+'-下级服务商')
        window.sessionStorage.setItem('tabIndex',1)
        this.$store.commit('setTabname',data.name+'-下级服务商')
        this.$store.commit('setTabact',1)
      }else if(router === 'ServiceListdj'){
        window.sessionStorage.setItem('tabName',data.name+'-下级店家')
        window.sessionStorage.setItem('tabIndex',1)
        this.$store.commit('setTabname',data.name+'-下级店家')
        this.$store.commit('setTabact',1)
      }
    },
    // 下一个信息
    nextInfo(router,data){
      window.sessionStorage.setItem('nextInfo', JSON.stringify(data))
      this.$router.push({path:router,query:{pageIndex:this.pageIndex}});
      // if(router === 'CustomList'){
      //   window.sessionStorage.setItem('tabName','客户')
      //   window.sessionStorage.setItem('tabIndex',0)
      //   this.$store.commit('setTabname','客户')
      //   this.$store.commit('setTabact',0)
      // }else if(router === 'ServiceListxj'){
      //   window.sessionStorage.setItem('tabName','下级服务商')
      //   window.sessionStorage.setItem('tabIndex',1)
      //   this.$store.commit('setTabname','下级服务商')
      //   this.$store.commit('setTabact',1)
      // }
    },
    bindFace(){

    }
  }
}
</script>

<style lang="scss">
.list{
  margin-top: 20px;
  .mbsearch{
    display: flex;
    align-items: center;
    justify-content: center;
    .el-select{
      margin-right: 20px;
      input{
        width: 200px;
        height: 60px;
        border-radius: 10px;
      }
    }
    .mbsinput{
      width: 488px;
      input{
        width: 488px;
        height: 60px;
        border-radius: 10px;
      }
    }
  }
  .mbsearch2{
    margin-top: 20px;
    .el-select{
      margin-right: 0;
      input{
        width: 708px;
        height: 60px;
        border-radius: 10px;
      }
    }
  }
  .mbbtn{
    padding: 30px 18px ;
    display: flex;
    justify-content: flex-end;
    button{
      background-color: $bgColor;
      color: $colorW;
      border-radius: 8px;
    }
  }
  .mbtable{
    .el-table{
      table{
        width: 100%;
      }
      thead{
        width: 642px;
        height: 76px;
        background: linear-gradient(90deg, rgba(236,240,246,0.72) 0%, #FFFFFF 100%);
        box-shadow: inset 0px 0px 0px 3px #FFFFFF;
        border-radius: 6px;
        border: 1px solid #DFDFDF;
        th {
          background-color: rgba(248, 248, 249, 1);
          height: 46px;
          font-size: 18px;
          font-weight: 500;
          color: rgba(47, 51, 53, 1);
          //border: 1px solid rgba(229, 229, 229, 1);
          &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
          }
          &:last-child {
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
          }
        }
      }
      tbody{
        tr {
          height: 80px;
          font-size: 18px;
        }
      }
      .el-table__cell {
        padding: 0;
      }
    }
    .el-checkbox__inner{
      width: 30px;
      height: 30px;
      &:after{
        left: 8.8px;
        width: 6px;
        height: 18px;
        border-width: 6px;
      }
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
      height: 8px;
      top: 10px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: $bgColor;
      border-color: $bgColor;
    }
    .fy{
      margin-top: 30px;
      padding-bottom: 30px;
      display: flex;
      justify-content: flex-end;
      .el-pager li.active{
        color: $bgColor;
      }
    }
    .bdBtn{
      padding: 4px 8px;
      color: $bgColor;
      //border: 2px solid $bgColor;
      white-space:nowrap;
    }
  }
  .btn1{
    margin: 5px 5px 5px 5px;
    width: 120px;
    height: 50px;
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
}
</style>
