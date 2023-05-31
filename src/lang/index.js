import Eli18nen from 'element-ui/lib/locale/lang/en'
import Eli18nzh from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale/index'

// 引入i18n
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// {{ $t("message.hello") }}
const messages = {
    // 中文
    zh: {
        msg: {
            // home:'首页'

            name: '企业进销存管理系统',
            // 菜单部分
            base: '基础信息管理',
            shangpin: '商品信息',
            cangku: '仓库信息',
            yuangong: '员工信息',
            caigou: '采购管理',
            caigoudingdantijiao: '采购订单提交',
            caigoudingdanshenhe: '采购订单审核',
            kucun: '库存管理',
            shangpinrukushenqing: '商品入库申请',
            shangpinrukushenhe: '商品入库审核',
            shangpinchukuxinxi: '商品出库信息',
            xiaoshou: '销售管理',
            xiaoshoudingdantijiao: '销售订单提交',
            xiaoshoudingdanshenhe: '销售订单审核',
            geren: '个人管理',
            xiugaixinxi: '修改信息',
            tuichudenglu: '退出登录',
            xitong: '关于系统',
            xitingshuoming: '系统说明',

            // 按钮
            search: '搜索',
            clear: '清空',
            export: '导出',
            add: '添加',
            mm: '密码',
            qrmm: '确认密码',
            up: '提交',
            hetong: '查看合同',

            // 系统说明部分
            qiyehetong: '企业合同',
            lc: '商品价格折线图',
            WeatherForecast: '天气预报查询',
            entry: '快捷入口',
            sale: '销售价格',
            rice: '大米',
            paper: '打印纸',
            chair: '椅子',
            table: '办公桌',
            gold: '黄金万两',
        }

    },
    //english
    en: {
        msg: {
            // home:'home'
            name: 'Enterprise invoicing and inventory management system',
            // 菜单部分
            base: 'basic manage',
            shangpin: 'Product',
            cangku: 'Warehouse',
            yuangong: 'Employee',
            caigou: 'Procurement manage',
            caigoudingdantijiao: 'caigou submission',
            caigoudingdanshenhe: 'caigou approval',
            kucun: 'Inventory manage',
            shangpinrukushenqing: 'Inbound application',
            shangpinrukushenhe: 'Inbound audit',
            shangpinchukuxinxi: 'Outbound information',
            xiaoshou: 'Sales manage',
            xiaoshoudingdantijiao: 'xiaoshou submission',
            xiaoshoudingdanshenhe: 'xiaoshou approval',
            geren: 'preson',
            xiugaixinxi: 'edit',
            tuichudenglu: 'out',
            xitong: 'system',
            xitingshuoming: 'illustrate',


            // 按钮
            search: 'search',
            clear: 'clear',
            export: 'export',
            add: 'add',
            mm: 'mm',
            qrmm: 'qrmm',
            up: 'up',
            hetong: 'hetong',

            // 系统说明部分
            qiyehetong: 'qiye',
            lc: 'linechart',
            WeatherForecast: ' WeatherForecast',
            entry: 'Quick entry',
            sale: 'sale',
            rice: 'rice',
            paper: 'paper',
            chair: 'chair',
            table: 'table',
            gold: 'gold',
        },
        ...Eli18nen,
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
})



// 按需引入
ElementLocale.i18n((key, value) => i18n.t(key, value))
// 通过 `i18n` 选项创建 Vue 实例
//   new Vue({ i18n }).$mount('#app')
export default i18n

