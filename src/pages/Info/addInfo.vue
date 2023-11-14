<template>
  <div class="wode">
    <!--管理员-编辑新增-->
    <div class="mbbox">
<!--      <div v-if="pageIndex <=1 && loginUser.type == 0">-->
<!--  -->
<!--        <div class='orinfo'>-->
<!--          <div class='orinfotop'>-->
<!--            添加详细信息-->
<!--          </div>-->
<!--          <div class='orinfoitem'><p>姓名：</p><el-input :autofocus="false" clearable v-model="inputInfo.name"></el-input></div>-->
<!--          <div class='orinfoitem'><p>性别：</p><el-input :autofocus="false" clearable v-model="inputInfo.gender"></el-input></div>-->
<!--          <div class='orinfoitem'><p>真实姓名：</p><el-input :autofocus="false" clearable v-model="inputInfo.realName"></el-input></div>-->
<!--          <div class='orinfoitem'><p>联系电话：</p><el-input :autofocus="false" clearable v-model="inputInfo.phone"></el-input></div>-->
<!--          <div class='orinfoitem'><p>是否有小屋：</p>-->
<!--            <el-select v-model="inputInfo.hasCabin" placeholder="请选择有或无">-->
<!--              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--            </el-select>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class='orinfo'>-->
<!--          <div class='orinfotop2 clearfix'>-->
<!--            公司信息-->
<!--            <span style="font-size: 25px">-->
<!--              <i style="float: right;margin-right: 10px" class="el-icon-circle-plus-outline" @click="addArray(inputInfo.company,defaultCompany)"></i>-->
<!--            </span>-->

<!--          </div>-->
<!--          <el-card style="margin: 5px 5px 5px 5px" v-for="(item,index) in inputInfo.company" :key="item.id">-->
<!--            <div  class="clearfix" style="font-size: 25px;color: rgba(237, 119, 31,1)">-->
<!--              <i style="float: right;margin-right: 5px" class="el-icon-remove-outline" @click="deleteArray(inputInfo.company,index)"></i>-->
<!--            </div>-->

<!--            <div>-->
<!--              <div class='orinfoitem'><p>公司名：</p><el-input :autofocus="false" clearable v-model="item.name"></el-input></div>-->
<!--              <div class='orinfoitem'><p>银行卡：</p><el-input :autofocus="false" clearable v-model="item.bankAccount"></el-input></div>-->
<!--              <div class='orinfoitem'><p>开户行：</p><el-input :autofocus="false" clearable v-model="item.openingBank"></el-input></div>-->
<!--            </div>-->

<!--          </el-card>-->


<!--        </div>-->
<!--        <div class='orinfo'>-->
<!--          <div class='orinfotop2 clearfix'>-->
<!--            家庭信息-->
<!--            <span style="font-size: 25px">-->
<!--              <i style="float: right;margin-right: 10px" class="el-icon-circle-plus-outline" @click="addArray(inputInfo.family,defaultFamily)"></i>-->
<!--            </span>-->
<!--          </div>-->
<!--          <el-card style="margin: 5px 5px 5px 5px" v-for="(item,index) in inputInfo.family" :key="item.id">-->
<!--            <div  class="clearfix" style="font-size: 25px;color: rgba(237, 119, 31,1)">-->
<!--              <i style="float: right;margin-right: 5px" class="el-icon-remove-outline" @click="deleteArray(inputInfo.family,index)"></i>-->
<!--            </div>-->

<!--            <div>-->
<!--              <div class='orinfoitem'><p>姓名：</p><el-input :autofocus="false" clearable v-model="item.name"></el-input></div>-->
<!--              <div class='orinfoitem'><p>性别：</p><el-input :autofocus="false" clearable v-model="item.gender"></el-input></div>-->
<!--              <div class='orinfoitem'><p>关系：</p><el-input :autofocus="false" clearable v-model="item.relation"></el-input></div>-->
<!--              <div class='orinfoitem'><p>身份证：</p><el-input :autofocus="false" clearable v-model="item.idCard"></el-input></div>-->
<!--              <div class='orinfoitem'><p>联系电话：</p><el-input :autofocus="false" clearable v-model="item.phone"></el-input></div>-->
<!--            </div>-->

<!--          </el-card>-->
<!--        </div>-->
<!--        -->
<!--      </div>-->

      <el-form  v-if="pageIndex <=1 && loginUser.type === 0" :model="inputInfo"  ref="ruleForm"  label-position="left" label-width="50px"  label-suffix=":" class="demo-ruleForm">

        <div class='orinfo'>
          <div class='orinfotop'>
            添加详细信息
          </div>
          <el-form-item required prop="name" label="名称" class="orinfoitem">
              <el-input :autofocus="false" clearable v-model="inputInfo.name"></el-input>
          </el-form-item>
          <el-form-item required prop="gender" label="性别" class="orinfoitem">
            <el-select v-model="inputInfo.gender" placeholder="请选择">
              <el-option   label="男" value="男"></el-option>
              <el-option   label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item required prop="realName" label="实体人姓名" class="orinfoitem">
            <el-input :autofocus="false" clearable v-model="inputInfo.realName"></el-input>
          </el-form-item>
          <el-form-item required prop="phone" label="联系电话" class="orinfoitem">
            <el-input :autofocus="false" clearable v-model="inputInfo.phone"></el-input>
          </el-form-item>
          <el-form-item prop="hasCabin" label="是否有小屋" class="orinfoitem">
            <el-select v-model="inputInfo.hasCabin" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

<!--          <div class='orinfoitem'><p>性别：</p><el-input :autofocus="false" clearable v-model="inputInfo.gender"></el-input></div>-->
<!--          <div class='orinfoitem'><p>真实姓名：</p><el-input :autofocus="false" clearable v-model="inputInfo.realName"></el-input></div>-->
<!--          <div class='orinfoitem'><p>联系电话：</p><el-input :autofocus="false" clearable v-model="inputInfo.phone"></el-input></div>-->
<!--          <div class='orinfoitem'><p>是否有小屋：</p>-->
<!--            <el-select v-model="inputInfo.hasCabin" placeholder="请选择有或无">-->
<!--              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--            </el-select>-->
<!--          </div>-->
        </div>
        <div class='orinfo'>
          <div class='orinfotop2 clearfix'>
            公司信息
            <span style="font-size: 25px">
              <i style="float: right;margin-right: 10px" class="el-icon-circle-plus-outline" @click="addArray(inputInfo.company,defaultCompany)"></i>
            </span>

          </div>
          <el-card style="margin: 5px 5px 5px 5px" v-for="(item,index) in inputInfo.company" :key="item.id">
            <div  class="clearfix" style="font-size: 25px;color: rgba(237, 119, 31,1)">
              <i style="float: right;margin-right: 5px" class="el-icon-remove-outline" @click="deleteArray(inputInfo.company,index)"></i>
            </div>

            <div>
              <el-form-item required :prop="`company[${index}].name`" label="公司名" class="orinfoitem">
                <el-input :autofocus="false" clearable v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item :prop="`company[${index}].bankAccount`" label="银行卡" class="orinfoitem">
                <el-input :autofocus="false" clearable v-model="item.bankAccount"></el-input>
              </el-form-item>
              <el-form-item  :prop="`company[${index}].openingBank`" label="开户行" class="orinfoitem">
                <el-input :autofocus="false" clearable v-model="item.openingBank"></el-input>
              </el-form-item>
            </div>

          </el-card>


        </div>
        <div class='orinfo'>
          <div class='orinfotop2 clearfix'>
            家庭信息
            <span style="font-size: 25px">
              <i style="float: right;margin-right: 10px" class="el-icon-circle-plus-outline" @click="addArray(inputInfo.family,defaultFamily)"></i>
            </span>
          </div>
          <el-card style="margin: 5px 5px 5px 5px" v-for="(item,index) in inputInfo.family" :key="item.id">
            <div  class="clearfix" style="font-size: 25px;color: rgba(237, 119, 31,1)">
              <i style="float: right;margin-right: 5px" class="el-icon-remove-outline" @click="deleteArray(inputInfo.family,index)"></i>
            </div>

            <div>
              <el-form-item required :prop="`family[${index}].name`" label="姓名" class="orinfoitem">
                <el-input :autofocus="false" clearable v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item required :prop="`family[${index}].name`" label="性别" class="orinfoitem">
                <el-select v-model="item.gender" placeholder="请选择">
                  <el-option   label="男" value="男"></el-option>
                  <el-option   label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item required :prop="`family[${index}].name`" label="联系电话" class="orinfoitem">
                <el-input :autofocus="false" clearable v-model="item.phone"></el-input>
              </el-form-item>
              <el-form-item  :prop="`family[${index}].name`" label="关系" class="orinfoitem">
                <el-input :autofocus="false" clearable v-model="item.relation"></el-input>
              </el-form-item>
              <el-form-item  :prop="`family[${index}].name`" label="身份证" class="orinfoitem">
                <el-input :autofocus="false" clearable v-model="item.idCard"></el-input>
              </el-form-item>
            </div>

          </el-card>
        </div>

      </el-form>


      <div class='orinfo' v-if="pageIndex == 3 && loginUser.type <= 1">
        <div class='orinfotop'>
          绑定/新增客户
        </div>
        <div class='orinfoitem'><p>姓名：</p><el-input :autofocus="false" clearable class="oinput" placeholder="请输入姓名" v-model="inputInfo.name"></el-input></div>
        <div class='orinfoitem'><p>联系电话：</p><el-input :autofocus="false" clearable class="oinput" placeholder="请输入联系电话"  v-model="inputInfo.phone"></el-input></div>
      </div>
    </div>
    <div class="btnBox">
      <button class="btn1" v-if="pageIndex == 0 && loginUser.type == 0" @click="updatadj()">提交</button>
      <button class="btn1" v-if="pageIndex == 1 && loginUser.type == 0" @click="updatafws()">提交</button>
      <button class="btn1" v-if="pageIndex == 3 && loginUser.type <= 1" @click="updatakh()">提交</button>
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
      Info:{},
      options: [
        {value: true, label: '有'},
        {value: false, label: '无'},
      ],
      inputInfo:{
        name:'',
        phone:'', //⼿机号
        realName:'', //主体⼈姓名
        idCard:'',
        gender:'男',
        hasCabin:'', //是否有⼩屋
        company:[
          {
            name:'',
            bankAccount:'',
            openingBank:'' //开⼾⾏
          }
        ],
        family:[
          {
            name:'',
            phone:'', //⼿机号
            idCard:'',
            gender:'',
            relation:''
          }
        ]
      },
      defaultCompany:{
        name:'',
        bankAccount:'',
        openingBank:''
      },
      defaultFamily:{
        name:'',
        phone:'',
        idCard:'',
        gender:'',
        relation:''
      },
      rules: {}
    }
  },
  mounted() {
    this.loginUser =  JSON.parse(window.localStorage.getItem('loginUser'))
    this.nextInfo =  JSON.parse(window.sessionStorage.getItem('nextInfo'))
    // console.log(this.$route.query)
    this.pageIndex =  this.$route.query.pageIndex
    // console.log(this.loginUser)
  },
  computed: {

  },
  components: {},
  methods: {
    updatadj(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let obj = this.inputInfo
          this.$http.post('seller',JSON.stringify(obj), {
            "headers": {
              "Content-Type": "application/json"
            }
          }).then(res=>{
            // console.log(res.code)
            if(res.code == 200){
              // console.log('1233')
              if(this.pageIndex == 0){
                // console.log('11')
                this.$router.push({path:'ShopList',query:{pageIndex:this.pageIndex}});
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
        } else {
          this.$message({
            message: "填写错误，请检查",
            type: 'warning'
          });
          return false;
        }
      });
    },
    deleteArray(array,index){
      array.splice(index,1)
    },
    addArray(array,data){
      array.push(data)
    },

    updatafws(){

      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let obj = this.inputInfo
          this.$http.post('provider',JSON.stringify(obj), {
            "headers": {
              "Content-Type": "application/json"
            }
          }).then(res=>{
            // console.log(res.code)
            if(res.code == 200){
              // console.log('1233')
              if(this.pageIndex == 1){
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
        } else {
          this.$message({
            message: "填写错误，请检查",
            type: 'warning'
          });
          return false;
        }
      });


    },
    updatakh(){
      let obj = {
      name:this.inputInfo.name,
      phone:this.inputInfo.phone,
      refId:this.nextInfo.id
    }
      this.$http.post('client/bind',JSON.stringify(obj), {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        // console.log(res.code)
        if(res.code == 200){
          // console.log('1233')
          if(this.pageIndex == 3){
            // console.log('11')
            this.$router.push({path:'CustomList',query:{pageIndex:this.pageIndex}});
            window.sessionStorage.setItem('tabName','客户')
            window.sessionStorage.setItem('tabIndex',0)
            this.$store.commit('setTabname','客户')
            this.$store.commit('setTabact',0)
          }
        }else {
          this.$message({
            message: res.message,
            type: 'warning'
          });
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


.orinfoitem .el-form-item__label {
  font-size: 32px;
}
</style>
