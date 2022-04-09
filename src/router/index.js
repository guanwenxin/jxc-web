import Vue from 'vue'
import VueRouter from 'vue-router'
import System_introduction from "../views/System_introduction/system_introduction"

import route_goodsBase from './goods_base_info/goods_base_info.js'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/system_introduction'
  },
  {
    path:'/update_user',
    name:'UpdateUser',
    component:()=> import ('../views/update_user/update_user.vue')
  },
  //关于系统
  {
    path: '/system_introduction',
    name: 'SystemIntroduction',
    component: System_introduction
  },
  //基础信息管理
  ...route_goodsBase,
  //采购管理
  {
    path: '/supplier_manger',
    name: 'SupplierManger',
    component: ()=>import ("../views/buy_manger/supplier_manger.vue")
  },
  {
    path: '/buy_order',
    name: 'BuyOrder',
    component: ()=>import ("../views/buy_manger/buy_order.vue")
  },
  //销售管理
  {
    path:'/sale_manger',
    name:'SaleManger',
    component:()=>import ("../views/sale_manger/sale_manger.vue")
  },
  {
    path:'/customer_manger',
    name:'CustomerManger',
    component:()=>import ("../views/sale_manger/customer_manger.vue")
  },
  //库存管理
  {
    path:'/stock_manger',
    name:'StockManger',
    component:()=>import('../views/stock_manger/stock_manger.vue')
  },
  {
    path:'/setStroage_check',
    name:'SetStroageCheck',
    component:()=>import('../views/stock_manger/setStroage_check.vue')
  },
  {
    path:'/getStroage_check',
    name:'GetStroageCheck',
    component:()=>import('../views/stock_manger/getStroage_check.vue')
  },
  
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
