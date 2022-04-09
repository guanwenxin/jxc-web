export default [
    //基础信息管理
  {
    path: '/goods_manger',
    name: 'Goods_manger',
    component: ()=>import ("../../views/Goods_base_info/goods_manger")
  },
  {
    path: '/store_manger',
    name: 'Store_manger',
    component: ()=>import ("../../views/Goods_base_info/store_manger.vue")
  },
  {
    path: '/persion_manger',
    name: 'Persion_manger',
    component: ()=>import ("../../views/Goods_base_info/persion_manger.vue")
  },
  {
    path: '/role_manger',
    name: 'Role_manger',
    component: ()=>import ("../../views/Goods_base_info/role_manger.vue")
  },
]