<template>
  <div id="app">
    <div class="systemAll" v-if="code == 200">
      <!-- 这个是顶部的导航栏 --start -->
      <el-header class="el_header" style="text-align: right">
        <div class="el_header_left">企业进销存管理系统</div>
        <div class="el_header_right">
          <el-dropdown>
            <i
              class="el-icon-setting"
              style="margin-right: 15px; font-size: 18px"
            ></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="font-size: 18px"
                >个人信息</el-dropdown-item
              >
              <el-dropdown-item style="font-size: 18px"
                >使用申请</el-dropdown-item
              >
              <el-dropdown-item style="font-size: 18px"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ this.user_name }}</span>
        </div>
      </el-header>
      <!-- 这个是顶部的导航栏 --end -->
      <!-- 下方的主体部分 --start -->
      <el-container style="height: 100%; border: 1px solid #eee">
        <!-- 侧边栏部分--start -->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <!-- 默认打开的侧边栏配置 :default-openeds="['1', '3'] -->
          <el-menu
            :default-openeds="key_Path"
            @open="handleOpen"
            :unique-opened="true"
            :router="true"
          >
            <el-submenu index="4">
              <template slot="title"
                ><i class="el-icon-menu"></i>基础信息管理</template
              >
              <el-menu-item-group>
                <el-menu-item index="/goods_manger">商品信息</el-menu-item>
                <el-menu-item index="/store_manger">仓库信息</el-menu-item>
                <el-menu-item index="/persion_manger">员工信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-menu"></i>采购管理</template
              >
              <el-menu-item-group>
                <el-menu-item index="/buy_order">采购订单提交</el-menu-item>
                <el-menu-item index="/supplier_manger"
                  >采购订单审核</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"
                ><i class="el-icon-menu"></i>库存管理</template
              >
              <el-menu-item-group>
                <el-menu-item index="setStroage_check"
                  >商品入库申请</el-menu-item
                >
                <el-menu-item index="stock_manger">商品入库审核</el-menu-item>

                <el-menu-item index="getStroage_check"
                  >商品出库信息</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-menu"></i>销售管理</template
              >
              <el-menu-item-group>
                <el-menu-item index="sale_manger">销售订单提交</el-menu-item>
                <el-menu-item index="customer_manger"
                  >销售订单审核</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title"
                ><i class="el-icon-user"></i>个人信息</template
              >
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item index="/update_user">修改信息</el-menu-item>
                <el-menu-item @click="loginOut">退出登录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"
                ><i class="el-icon-setting"></i>关于系统</template
              >
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item index="/system_introduction"
                  >系统说明</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 侧边栏部分--end -->
        <!-- 主体部分(主要是展示router-view) --start -->
        <el-main class="main_css">
          <div class="router_css"><router-view></router-view></div>
        </el-main>
        <!-- 主体部分(主要是展示router-view) --end -->
      </el-container>
      <!-- 下方的主体部分 --end -->
    </div>
  </div>
</template>
<script>
import BaseLayout from "./layout/Base_layout.vue";
export default {
  name: "App",
  components: {
    BaseLayout,
  },
  data() {
    return {
      key_Path: ["6"],
      code: "",
      user_name: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      this.key_Path = keyPath;
    },
    loginOut() {
      alert("退出登录！！！");
      sessionStorage.removeItem("code");
      window.location.href = "http://localhost:3000";
    },
  },
  created() {
    if (!this.$route.query.account) {
      this.code = sessionStorage.getItem("code");
      this.user_name = sessionStorage.getItem("user_name");
      this.account = sessionStorage.getItem("account");
    } else {
      this.axios(`/myApi/re?account=${this.$route.query.account}`).then(
        (res) => {
          let user_name = res.data.data[0].user_name;
          sessionStorage.setItem("account", this.$route.query.account);
          sessionStorage.setItem("user_name", user_name);
          sessionStorage.setItem("code", res.data.code);
          if (!user_name) {
            this.user_name = "";
            this.code = res.data.code;
            alert("请先完善信息!!!");
            this.$router.push("/update_user");
          } else {
            this.code = res.data.code;
            this.user_name = user_name;
          }
        }
      );
    }
  },
  // },
};
</script>

<style>
html {
  height: 90%;
}
body {
  height: 100%;
}
#app {
  height: 100%;
}

.el_header {
  display: flex;
  justify-content: space-between;
  font-size: 20px !important;
  font-weight: 600;
  font-family: "Courier New", Courier, monospace;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.main_css {
  background: #faf4f4;
  max-height: 720px;
}
.router_css {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
}
</style>

