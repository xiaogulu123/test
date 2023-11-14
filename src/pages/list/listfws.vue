<template>
  <div class="fwsBox">
    <div class="tabbox">
      <div class="tabitem"></div>
    </div>
    <list :listdata="tableData" :options="options" :options2="options2" :listlabel="tableLabel" :btnShow="btnShow"
          :searchShow="searchShow" :pageIndex="pageIndex" :totalCount="totalCount"
          @query="queryFn" @addInfo="addFn" @handleCurrentChange="handleCurrentChange" @delInfo="delInfo"
    >
      <template v-slot:option="scope">
        <el-dropdown trigger="click" v-if="loginUser.type === 0">
          <button class="btn1">
            展开<i class="el-icon-arrow-down el-icon--right"></i>
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">
              <span class="bdBtn" @click="nextInfo('editInfo',scope.row)">编辑</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-delete">
              <span class="bdBtn" @click="delInfo(scope.row)">删除</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-cooperation">
              <span class="bdBtn" @click="nextList('ServiceListxj',scope.row,0)">下级服务商列表</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-goods">
              <span class="bdBtn" @click="nextList('ServiceListdj',scope.row,0)">下级店家列表</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" v-if="loginUser.type === 1">
          <button class="btn1">
            展开<i class="el-icon-arrow-down el-icon--right"></i>
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">
              <span class="bdBtn" @click="nextInfo('viewInfo',scope.row)">详细信息</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-cooperation">
              <span class="bdBtn" @click="nextList('ServiceListxj',scope.row,0)">下级服务商列表</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-goods">
              <span class="bdBtn" @click="nextList('ServiceListdj',scope.row,0)">下级店家列表</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-user-solid">
              <span class="bdBtn" @click="nextList('ServiceListxj',scope.row,1)">绑定新的下级服务商</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" v-if="loginUser.type === 2">
          <button class="btn1">
            展开<i class="el-icon-arrow-down el-icon--right"></i>
          </button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">
              <span class="bdBtn" @click="nextInfo('viewInfo',scope.row)">详细信息</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-goods">
              <span class="bdBtn" @click="nextList('ServiceListdj',scope.row,0)">下级店家列表</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-cooperation">
              <span class="bdBtn" @click="nextList('ServiceListxj',scope.row,0)">下级服务商列表</span>
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
      tableLabel: [{label: '服务商名', name: 'name'}, {label: '真实姓名', name: 'realName'}],
      tableData: [],
      totalCount: 0,
      options: [
        {value: 0, label: '服务商名'},
        {value: 1, label: '真实姓名'},
        {value: 2, label: '手机号'},
      ],
      options2: [
        {value: null, label: '所有服务商'},
        {value: 0, label: '未绑定服务商'},
        {value: -1, label: '已绑定服务商'},
      ],
      btnShow: ['bj', 'bdfws', 'info', 'del', 'xjfws'],
      searchShow: ['xlinput', 'sx'],
      pageIndex: 1,
      search: {
        page: 1,
        pageSize: 10,
        name: '',
        phone: '',
        realName: '',
        refId: 0
      },
      loginUser: {}
    }
  },
  created() {
    this.loginUser = JSON.parse(window.localStorage.getItem('loginUser'))
    if (this.loginUser.type === 2) {
      this.options2 = [
        {value: this.loginUser.userId, label: '下级服务商'},
        // {value: 0, label: '未绑定服务商'}
      ]
    }

  },
  mounted() {
    this.search.refId = this.options2[0].value
    this.getfwslist()
  },
  computed: {},
  components: {
    list
  },
  methods: {
    //获取服务商列表
    getfwslist() {
      let obj = {
        pageSize: this.search.pageSize,
        page: this.search.page,
        name: this.search.name,
        phone: this.search.phone,
        realName: this.search.realName,
        refId: this.search.refId
      }
      this.$http.get('provider', {params: obj}).then(res => {
        this.tableData = res.data.rows
        this.totalCount = res.data.totalCount
      });
    },
    queryFn(e) {
      // console.log(e)
      if (e.selectvalue1 !== '') {
        if (e.selectvalue1 === 0) {
          this.search.name = e.searchInput
          this.search.realName = ''
          this.search.phone = ''
        } else if (e.selectvalue1 === 1) {
          this.search.realName = e.searchInput
          this.search.name = ''
          this.search.phone = ''
        } else if (e.selectvalue1 === 2) {
          this.search.phone = e.searchInput
          this.search.name = ''
          this.search.realName = ''
        }
      } else {
        this.$message({
          message: '请先选择筛选条件',
          type: 'warning'
        });
      }
      this.search.refId = e.selectvalue2
      this.getfwslist()
    },
    addFn() {
      // this.$router.replace('ServiceList');
    },
    handleCurrentChange(e) {
      // console.log(e)
      this.search.page = e
      this.getfwslist()
    },
    delInfo(e) {
      if (e == 200) {
        this.search = {
          page: 1,
          pageSize: 10,
          name: '',
          phone: '',
          realName: '',
          refId: 0
        }
        this.getfwslist()
      }
    },
    nextList(router, data, pageIndex) {
      // console.log(data)
      this.$router.push({path: router, query: {pageIndex: pageIndex}})
      window.sessionStorage.setItem('nextInfo', JSON.stringify(data))
      if (router === 'CustomList') {
        window.sessionStorage.setItem('tabName', '客户')
        window.sessionStorage.setItem('tabIndex', 0)
        this.$store.commit('setTabname', '客户')
        this.$store.commit('setTabact', 0)
      } else if (router === 'ServiceListxj') {
        window.sessionStorage.setItem('tabName', data.name + '-下级服务商')
        window.sessionStorage.setItem('tabIndex', 1)
        this.$store.commit('setTabname', data.name + '-下级服务商')
        this.$store.commit('setTabact', 1)
      } else if (router === 'ServiceListdj') {
        window.sessionStorage.setItem('tabName', data.name + '-下级店家')
        window.sessionStorage.setItem('tabIndex', 1)
        this.$store.commit('setTabname', data.name + '-下级店家')
        this.$store.commit('setTabact', 1)
      }
    },

    nextInfo(router, data) {
      window.sessionStorage.setItem('nextInfo', JSON.stringify(data))
      this.$router.push({path: router, query: {pageIndex: this.pageIndex}});
    }
  }
}
</script>

<style lang="scss">
.fwsBox {
  margin-top: 20px;
}
</style>
