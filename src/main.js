import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts';
import ElementUI from 'element-ui'
import './assets/js/element.js'
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/js/rem.js'
import axios from 'axios'
//接口配置
import cindex from '@/config/index'

//axios配置
axios.defaults.baseURL = cindex.baseUrl;
// 添加请求拦截器添加token，保证拥有访问数据的权限
axios.interceptors.request.use((config) => {
  // config.headers = {'content-type': 'application/x-www-form-urlencoded'};
  // config.data = qs.stringify(config.data);
  let token = window.localStorage.getItem('token')
  // config.headers.Authorization = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b3VuZyIsInVzZXJJZCI6NCwibmFtZSI6IueuoeeQhuWRmDEiLCJwaG9uZSI6IjEwMCIsInR5cGUiOjAsInJlZklkIjowLCJpYXQiOjE2OTk2MzU2MzYsImV4cCI6MTcwMTM4ODY2OX0.GeYg8O9KUn-9PuL3JolSx1-GAzDM8IPotGcBIEdJ2uA';
  // console.log(token)
  if (token) {
    config.headers.Authorization = token;
  } else {
    if (config.url != "login") {
      // router.replace('/login');
    }
  }
  return config; // 必须返回config
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
axios.interceptors.response.use(
  (response) => {
    if (response.data.state == 808) {
      router.replace('/login');
    } else if (response.data.state == 200) {
      return response.data;
    } else {
      return response.data;
    }
  },
  (error) => {
    if (axios.isCancel(error)) {
      // console.log(error.message);
    } else {
      // cancleResponseReq(error)
    }
  }
)
// 将axios设置到Vue构造函数原型对象上 全局挂载axios  方便Vue实例对象
// 调用方法：Vue实例.$http.get = axios.get
Vue.prototype.$http = axios;
Vue.prototype.$store = store;
// Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.$ip = cindex.baseUrl

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
