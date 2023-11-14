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
              <span class="bdBtn"  @click="turnInfo('viewInfo',scope.row)">详细信息</span>
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown  trigger="click" v-if="loginUser.type === 1">
          <button class="btn1">
            展开<i class="el-icon-arrow-down el-icon--right"></i>
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" >
              <span class="bdBtn" @click="turnInfo('viewInfo',scope.row)">详细信息</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown  trigger="click" v-if="loginUser.type === 2">
          <button class="btn1">
            展开<i class="el-icon-arrow-down el-icon--right"></i>
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" >
              <span class="bdBtn" @click="turnInfo('viewInfo',scope.row)">详细信息</span>
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
      tableLabel:[{label:'店家名',name:'name'},{label:'真实姓名',name:'realName'},{label:'手机号',name:'phone'}],
      tableData: [
      ],
      totalCount:0,
      options: [
        {value: 0, label: '店家名'},
        {value: 1, label: '真实姓名'},
        {value: 2, label: '手机号'},
      ],
      options2: [
        {value: 0, label: '否'},
        {value: 1, label: '是'},
      ],
      btnShow:[],
      searchShow:['xlinput'],
      pageIndex:0,
      search:{
        page:1,
        pageSize: 10,
        name:'',
        phone:'',
        realName:'',
        refId:0
      },
      nextInfo:{},
      loginUser:{},
    }
  },
  created() {},
  mounted() {
    this.loginUser =  JSON.parse(window.localStorage.getItem('loginUser'))
    this.nextInfo =  JSON.parse(window.sessionStorage.getItem('nextInfo'))
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
        refId:this.nextInfo.id
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
    turnInfo(router,data){
      window.sessionStorage.setItem('nextInfo', JSON.stringify(data))
      this.$router.push({path:router,query:{pageIndex:0}});
    },
  }
}
</script>

<style lang="scss">
.fwsBox{
  margin-top: 20px;
}
</style>
