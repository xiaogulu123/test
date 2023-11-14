<template>
  <div class="fwsBox">
    <div class="tabbox">
      <div class="tabitem"></div>
    </div>
    <list :listdata="tableData" :options="options" :options2="options2" :listlabel="tableLabel" :btnShow="btnShow" :searchShow="searchShow" :pageIndex="pageIndex" :totalCount="totalCount" type="client"
          @query="queryFn" @addInfo="addFn" @handleCurrentChange="handleCurrentChange" @delInfo="delInfo"
    ></list>
  </div>
</template>

<script>
import list from '../../components/list'
export default {
  data() {
    return {
      // tableLabel:['用户名','真实姓名','性别','手机号','身份证号','公司名称','银行卡号','开户行','是否有小屋'],
      tableLabel:[{label:'姓名',name:'name'},{label:'手机号',name:'phone'}],
      tableData: [
      ],
      totalCount:0,
      options: [
        {value: 0, label: '姓名'},
        {value: 2, label: '手机号'},
      ],
      options2: [
        {value: 0, label: '否'},
        {value: 1, label: '是'},
      ],
      btnShow:[],
      searchShow:['xlinput'],
      pageIndex:3,
      search:{
        page:1,
        pageSize: 10,
        name:'',
        phone:'',
        realName:'',
        refId:0
      },
      nextInfo:{}
    }
  },
  created() {},
  mounted() {
    let loginUser =  JSON.parse(window.localStorage.getItem('loginUser'))
    if(loginUser.type===1){
      this.btnShow.push('del2')
    }
    this.nextInfo =  JSON.parse(window.sessionStorage.getItem('nextInfo'))
    if(!this.nextInfo){
      this.nextInfo={
        id:loginUser.userId
      }
    }

    this.getkhlist()
  },
  computed: {

  },
  components: {
    list
  },
  methods: {
    //获取客户列表
    getkhlist(){
      let obj={
        pageSize:this.search.pageSize,
        page:this.search.page,
        name:this.search.name,
        phone:this.search.phone,
        refId:this.nextInfo.id
      }

      this.$http.get('client', {params: obj}).then(res => {
        this.tableData = res.data.rows
        this.totalCount = res.data.totalCount
      });
    },
    queryFn(e) {
      console.log(e)
      if(e.selectvalue1 !== ''){
        if(e.selectvalue1 === 0){
          this.search.name = e.searchInput
          this.search.realName = ''
          this.search.phone = ''
        }else if(e.selectvalue1 === 2){
          this.search.phone = e.searchInput
          this.search.name = ''
          this.search.realName = ''
        }
      }else {
        this.$message({
          message: '请先选择筛选条件',
          type: 'warning'
        });
      }

      // this.search.refld = e.selectvalue2
      this.getkhlist()
    },
    addFn(){
      // this.$router.replace('ServiceList');
    },
    handleCurrentChange(e){
      // console.log(e)
      this.search.page = e
      this.getkhlist()
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
        this.getkhlist()
      }
    }
  }
}
</script>

<style lang="scss">
.fwsBox{
  margin-top: 20px;
}
</style>
