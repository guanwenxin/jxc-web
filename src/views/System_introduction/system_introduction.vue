<template>
  <div class="System_introduction">
    <!-- <div>System_introduction:系统说明</div> -->

    <!-- pdf_vue部分 -->
    <div style="height: 28px">
      <div class="content">
        企业合同： <a-button @click="dialogVisible = true">
          <!-- 查看合同 -->
          {{ $t("msg.hetong") }}
        </a-button>
      </div>
      <a-modal
        title="招纳贤士"
        :visible="dialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <VuePdf></VuePdf>
        <!-- pdf -->
        <span slot="footer" class="dialog-footer">
          <a-button @click="dialogVisible = false">取 消</a-button>
          <a-button type="primary" @click="dialogVisible = false"
            >确 定</a-button
          >
        </span>
      </a-modal>
    </div>
    <hr />

    <!-- ----------------------------- -->
    <div class="home">
      <!--访问数据统计 ----------------->
      <div class="content">
        <div class="time-info" id="box13">
          <div class="title">商品价格折线图</div>
          <div id="charts" style="width: 650px; height: 320px"></div>
        </div>

        <div class="area" id="box1">
          <div class="title">天气预报查询</div>
          <div id="pie" style="width: 430px; height: 320px">
          <!-- 插槽位置 -->
          <tqybslot/>
          </div>
        </div>
      </div>

      <!-- 2. 快捷入口 -->
      <div class="home-footer" >
        <el-card class="box-card">
          <div slot="header" class="clearfix" >
            <span>快捷入口</span>
          </div>
          <div class="text item">
            <el-button type="primary" @click="todingdan">
            <!-- 采购订单提交 -->
            {{ $t("msg.caigoudingdantijiao") }}
            </el-button>
            <el-button type="primary" @click="toruku">
            <!-- 商品入库申请 -->
            {{ $t("msg.shangpinrukushenqing") }}
            </el-button>
            <el-button type="primary" @click="toxiaoshou">
            <!-- 销售订单提交 -->
            {{ $t("msg.xiaoshoudingdantijiao") }}
            </el-button>
          </div>
          <!-- <router-view></router-view> -->
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import VuePdf from "./pdf_vue.vue/pdf_vue.vue";
// 引入echarys
import * as echarts from "echarts";
// 引入插槽
import tqybslot from "./tqyb_slot.vue"

export default {
  data() {
    return{
    }
  },
  components: {
    VuePdf,
    tqybslot
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  created(){
    // this.form();
  },

  methods: {
    handleClose() {
      this.dialogVisible = false;
    },

    // 快捷键--页面跳转
    todingdan () {
      this.$router.push('/buy_order')
    },
    toruku () {
      this.$router.push('/setStroage_check')
    },
    toxiaoshou () {
      this.$router.push('/sale_manger')
    },


    //绘制图表--折线------------------
    line(data, money, total) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("charts"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          //提示框组件
          trigger: "axis",
        },
        legend: {},
        toolbox: {
          feature: {
            // 下载图片
            saveAsImage: {},
          },
        },
        xAxis: {
          //x轴数据
          data: ["大米", "打印纸", "椅子", "办公桌", "黄金万两"],
        },
        yAxis: {
          //y轴会自动创建数据
        },
        series: [
          //图表内容
          {
            name: "销售价格",
            type: "line",
            data: ["50", "5", "50", "100", "500"],
            smooth: true, //是否平滑曲线显示
          },
        ],
      });
    },

  },
  mounted() {
    //最早获取DOM元素的生命周期函数 挂载完毕
    // console.log('mounted-id', document.getElementById('charts'));
    this.line();
  },
};
</script>




<style lang="less" scoped>
.home {
  // margin: 10px;
  // background: #f5f5f5;
}

// 图表

.content {
  margin: 20px;
  display: flex;
  height: 320px;

  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }

  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

//内容

.home-footer {
  display: flex;
  width: 830px;
  padding-left: 20px;
  margin-bottom: 20px;

  .box-card {
    flex: 1;
    margin-right: 30px;

    span {
      font-weight: 600;
    }
  }
  .item {
    text-align: center;
    font-size: 24px;
    color: #333;
    .el-col {
      border-right: 1px solid #eee;
    }
    .el-col:last-child {
      border-right: none;
    }
    .title {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>