import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
// 路由懒加载
const login = () => import('@/pages/login.vue');// 登录
const listdj = () => import('@/pages/list/listdj.vue');
const listfws = () => import('@/pages/list/listfws.vue');
const listfwsxj = () => import('@/pages/list/listfwsxj.vue');
const listfwsdj = () => import('@/pages/list/listfwsdj.vue');
const listkh = () => import('@/pages/list/listkh.vue');
const myInfo = () => import('@/pages/myInfo.vue');
const addInfo = () => import('@/pages/Info/addInfo.vue');
const editInfo = () => import('@/pages/Info/editInfo.vue');
const viewInfo = () => import('@/pages/Info/viewInfo.vue');
const bdInfo = () => import('@/pages/Info/bdInfo.vue');
const quren = () => import('@/pages/Info/quren.vue');


Vue.use(Router)

// 创建路由实例对象 定义规则
// meta:{keepAlive: true}
const router = new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {name: 'login', path: '/login', component: login},
    {name:'clientList',path:'/client',component:listkh},
    {name: 'ShopList', path: '/ShopList', component: listdj},
    {name: 'ServiceList', path: '/ServiceList', component: listfws},
    {name: 'ServiceListxj', path: '/ServiceListxj', component: listfwsxj},
    {name: 'ServiceListdj', path: '/ServiceListdj', component: listfwsdj},
    {name: 'CustomList', path: '/CustomList', component: listkh},
    {name: 'MyInfo', path: '/MyInfo', component: myInfo},
    {name: 'addInfo', path: '/addInfo', component: addInfo},
    {name: 'editInfo', path: '/editInfo', component: editInfo},
    {name: 'viewInfo', path: '/viewInfo', component: viewInfo},
    {name: 'bdInfo', path: '/bdInfo', component: bdInfo},
    {name: 'confirm', path: '/confirm', component: quren},
  ]
});


export default router;
