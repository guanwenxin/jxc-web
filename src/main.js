import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import JsonExcel from "vue-json-excel";

import less from 'less'

import i18n from './lang'

Vue.prototype.qs =qs
Vue.prototype.axios=axios
Vue.use(Antd);
Vue.use(ElementUI);
Vue.component("downloadExcel", JsonExcel);
Vue.use(less)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
