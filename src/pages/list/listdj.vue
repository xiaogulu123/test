<template>
  <div class="fwsBox">
    <div class="tabbox">
      <div class="tabitem"></div>
    </div>
    <list :listdata="tableData" :options="options" :options2="options2" :listlabel="tableLabel" :btnShow="btnShow" :searchShow="searchShow" :pageIndex="pageIndex" :totalCount="totalCount"
          @query="queryFn" @addInfo="addFn" @delInfo="delInfo" @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:option="scope">
        <el-dropdown  trigger="click" v-if="loginUser.type === 0">
          <button class="btn1">
            展开<i class="el-icon-arrow-down el-icon--right"></i>
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" >
              <span class="bdBtn"  @click="nextInfo('editInfo',scope.row)">编辑</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-delete" >
              <span class="bdBtn" @click="delInfo(scope.row)">删除</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-user-solid">
              <span class="bdBtn"  @click="nextList('CustomList',scope.row,3)" >客户列表</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown  trigger="click" v-if="loginUser.type === 1">
          <button class="btn1">
            展开<i class="el-icon-arrow-down el-icon--right"></i>
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" >
              <span class="bdBtn" v-if="btnShow.includes('info')" @click="nextInfo('viewInfo',scope.row)">详细信息</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-user-solid" >
              <span class="bdBtn"  @click="nextList('CustomList',scope.row,3)" >客户列表</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown  trigger="click" v-if="loginUser.type === 2">
          <button class="btn1">
            展开<i class="el-icon-arrow-down el-icon--right"></i>
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" >
              <span class="bdBtn" v-if="btnShow.includes('info')" @click="nextInfo('viewInfo',scope.row)">详细信息</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-user-solid" >
              <span class="bdBtn"  @click="nextList('CustomList',scope.row,3)" >客户列表</span>
            </el-dropdown-item>
            <el-dropdown-item v-if="scope.row.refId===0" icon="el-icon-user-solid" >
              <span class="bdBtn" @click="bind(scope.row.id)">绑定此店家为下级</span>
            </el-dropdown-item>
            <el-dropdown-item v-if="scope.row.refId!==0" icon="el-icon-user-solid" >
              <span class="bdBtn" @click="unbundled(scope.row.id)">解绑</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>

    </list>
  </div>
</template>

<script>
import list from '../../components/list'
export default {
  data() {
    return {
      // tableLabel:['用户名','真实姓名','性别','手机号','身份证号','公司名称','银行卡号','开户行','是否有小屋'],
      tableLabel:[{label:'店家名',name:'name'},{label:'真实姓名',name:'realName'}],
      tableData: [
      ],
      totalCount:0,
      options: [
        {value: 0, label: '店家名'},
        {value: 1, label: '真实姓名'},
        {value: 2, label: '手机号'},
      ],
      options2: [
        {value: null, label: '所有店家'},
        {value: 0, label: '未绑定店家'},
        {value: -1, label: '已绑定店家'},
      ],
      btnShow:['bj','info','del','khlist','bddj'],
      searchShow:['xlinput','sx'],
      pageIndex:0,
      search:{
        page:1,
        pageSize: 10,
        name:'',
        phone:'',
        realName:'',
        refId: null
      },
      loginUser:{}
    }
  },
  created() {
    this.loginUser =  JSON.parse(window.localStorage.getItem('loginUser'))
    if(this.loginUser.type===2){
      this.options2=[
        {value: this.loginUser.userId, label: '下级店家'},
        {value: 0, label: '未绑定店家'}
      ]
    }
  },
  mounted() {

    this.search.refId=this.options2[0].value
    this.getdjlist()
  },
  computed: {

  },
  components: {
    list
  },
  methods: {
    //获取店家列表
    getdjlist(){
      let obj={
        pageSize:this.search.pageSize,
        page:this.search.page,
        name:this.search.name,
        phone:this.search.phone,
        realName:this.search.realName,
        refId:this.search.refId
      }
      this.$http.get('seller', {params: obj}).then(res => {
        this.tableData = res.data.rows
        this.totalCount = res.data.totalCount
      });
    },
    queryFn(e) {
        if(e.selectvalue1 === 0){
          this.search.name = e.searchInput
          this.search.realName = ''
          this.search.phone = ''
        }else if(e.selectvalue1 === 1){
          this.search.realName = e.searchInput
          this.search.name = ''
          this.search.phone = ''
        }else if(e.selectvalue1 === 2){
          this.search.phone = e.searchInput
          this.search.name = ''
          this.search.realName = ''
        }
      this.search.refId = e.selectvalue2
      this.getdjlist()
    },
    addFn(){
      // this.$router.replace('ServiceList');
    },
    handleCurrentChange(e){
      // console.log(e)
      this.search.page = e
      this.getdjlist()
    },
    delInfo(e){
      if(e == 200){
        this.search={
          page:1,
            pageSize: 10,
            name:'',
            phone:'',
            realName:'',
            refId:0
        }
        this.getdjlist()
      }
    },
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

    nextInfo(router,data){
      window.sessionStorage.setItem('nextInfo', JSON.stringify(data))
      this.$router.push({path:router,query:{pageIndex:this.pageIndex}});
    },
    bind(id){
      let obj = {
        bindFromId:this.loginUser.userId,
        bindToId:id,
      }
      this.$http.post('provider/bind',JSON.stringify(obj), {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        if(res.code == 200){
          this.$message({
            message: "绑定成功,请到下级店家列表查看",
            type: 'success'
          });
          this.getdjlist()
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })
    },
    unbundled(id){
      let obj = {
        id:id
      }
      this.$http.post('provider/unbundled',JSON.stringify(obj), {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        if(res.code == 200){
          this.$message({
            message: "解绑成功",
            type: 'success'
          });
          this.getdjlist()
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })
    }
  },

}
</script>

<style lang="scss">
.fwsBox{
  margin-top: 20px;
}
</style>
