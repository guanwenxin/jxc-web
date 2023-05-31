<template>
    <div>
      <div class="downcontainer">
        <div class="containerHeader">
          <el-input v-model="city" style="height: 38px;"/>
          <el-button @click="getWeather" style="height: 38px;">
            <!-- 查询 -->
            <!-- search -->
            {{ $t("msg.search") }}
          </el-button>
        </div>
        <el-table stripe :data="tableData">
          <el-table-column prop="name" label="Weather entries"></el-table-column>
          <el-table-column prop="property" label="key"></el-table-column>
          <el-table-column prop="value" label="status quo">
            <template v-slot:default="scope">
              <!-- 设置图片显示 -->
              <img
                :src="imgFormat(scope.row.value)"
                v-if="scope.row.property === 'img'"
              />
              <div v-else>{{ scope.row.value }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </template>
  
  <script>
  import { http } from "@/utils/http";
  const keyMap = {
    city: "城市",
    date: "日期",
    temp: "温度",
    humidity: "湿度",
    pressure:"气压",
    winddirect:"风向",
    img: "天气图片",
  };
  
  export default {
    name: "aqtcSlot",
    data: function () {
      return {
        tableData: [],
        city: "",
      };
    },
    methods: {
  
      imgFormat(imgNum) {
        // 如果以变量的形式传递路径，并且路径在src/assets下，需要将路径用require包裹
        return require(`@/assets/weather-img/${imgNum}.png`);
      },
      async getWeather() {
        // 白名单
        const removeKey = ["index", "aqi", "daily", "hourly", "week", "cityid", "citycode", "temphigh", "templow", "windspeed","windpower","updatetime","weather"];
        const { data } = await http.get("/weather/query", {
          params: { city: this.city },
        });
        console.log(data.result);
        //   更新表格，不会在下面接着push
        const tmp = [];
        Object.entries(data.result).forEach(([key, value]) => {
          console.log(key, value);
          if (!removeKey.includes(key)) {
            tmp.push({ property: key, value, name: keyMap[key] || "待完成" });
          }
        });
        this.tableData = tmp;
      },
    },
  };
  </script>
  
  <style lang="less" scoped>

  .downcontainer {
    .containerHeader {
      display: flex;
    }
  }
  </style>