<template>
  <div class="goods_manger">
    <div id="components-form-demo-advanced-search">
      <a-form
        class="ant-advanced-search-form"
        :form="form"
        @submit="handleSearch"
      >
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="编号">
              <a-input
                v-decorator="[`goods_code`]"
                placeholder="请输入商品编号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="名称">
              <a-input v-decorator="[`name`]" placeholder="请输入商品名称" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="品牌">
              <a-select
                v-decorator="['ppbrand']"
                placeholder="请选择对应的品牌"
              >
                <a-select-option
                  v-for="(item, i) in goodsbrand"
                  :key="i"
                  :value="item.ppbrand"
                >
                  {{ item.ppbrand }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="商品审核人">
              <a-input
                v-decorator="[`verify_account`]"
                placeholder="请选择对应的材质"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit"> 
              <!-- 搜索  -->
              {{ $t("msg.search") }}
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
              <!-- 清空 -->
              {{ $t("msg.clear") }}
            </a-button>

            <!-- excel导出 -->
            <download-excel class="export-excel-wrapper" :data="datasource" :fields="json_fields" :header="title"
          name="xxx公司进销存订单列表.xls">
          <el-button size="small" type="warning">
            <!-- 导出 -->
            {{ $t("msg.export") }}
          </el-button>
        </download-excel>

          </a-col>
        </a-row>
      </a-form>
      <div class="search-result-list">
        <a-table
          :columns="columns"
          :data-source="datasource"
          :rowKey="(record) => record.goods_id"
          :bordered="true"
          :pagination="{ pageSize: 5 }"
        >
          <template slot="action" slot-scope="record">
            <div>
              <a-popconfirm
                title="确定要移除当前商品的信息吗?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="delgoodsinfo(record)"
                @cancel="delcancel"
              >
                <a-button type="link" style="color: red"> 移除 </a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  components:{

  },
  data() {
    return {
      // excel
      formInline: {},
      // tableData: [],//订单列表数据展示
      total: 10,
      pageSize: 1,
      ids: [],//操作id数组集合]
      DetailsForm: [],//需要导出的数据 [{},{}]
      json_fields: {
        //映射字段值
        "商品名称": 'name',
        // "订单编号": 'goods_code',
          //数字处理--防止订单编号太长
          "订单编号":{
          field:"goods_code",
          callback:value=>{
            return '&nbsp;'+value;
          }
        },
        "品牌": 'ppbrand',
        "进价": 'buy_price',
        "售价": 'sale_price',
        "商品描述":'goods_desc',
        "更新时间":'update_time',
      },
      title: 'guan公司进销存管理系统商品信息列表',//



      // dialogVisible:false,


      form: this.$form.createForm(this, { name: "advanced_search" }),
      datasource: [],
      goodsbrand: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
        },
        {
          title: "商品名称",
          dataIndex: "name",
        },
        {
          title: "编号",
          dataIndex: "goods_code",
        },
        // {
        //   title: "材质",
        //   dataIndex: "type",
        // },
        {
          title: "品牌",
          dataIndex: "ppbrand",
        },
        {
          title: "进价",
          dataIndex: "buy_price",
        },
        {
          title: "售价",
          dataIndex: "sale_price",
        },
        {
          title: "商品描述",
          dataIndex: "goods_desc",
        },
        {
          title: "更新时间",
          dataIndex: "update_time",
        },
        {
          title: "操作",
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    },
  },
  updated() {
    console.log("updated");
  },
  methods: {
    // handleClose(){
    //         this.dialogVisible=false
    //     },
    //搜索按钮的请求方法
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        this.getgoods(values);
      });
    },
    //页面重置的方法
    handleReset() {
      this.form.resetFields();
    },
    //删除商品的按钮
    delgoodsinfo(record) {
      this.delgoods(record).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getgoods();
        }else {
        this.$message.info("没有权限");
      }
      });
    },
    delcancel() {
      this.$message.warning("取消成功!!!");
    },
    //拿到商品的 getgoods 接口
    getgoods(params) {
      this.axios
        .post(`/myApi/getgoods`, this.qs.stringify(params))
        .then((res) => {
          // console.log(res);
          this.datasource = res.data.data;
          this.handleReset();
        });
    },
    //删除某一项商品的接口
    delgoods(query) {
      console.log(query);
      return this.axios.get(`/myApi/delgoods?goods_code=${query.goods_code}`);
    },
    //获取所有商品品牌
    getgoodsbrand() {
      this.axios.get("/myApi/getgoodsbrand").then((res) => {
        this.goodsbrand = res.data.data;
        // console.log(this.goodsbrand);
      });
    },
  },
  created() {
    this.getgoods("");
    this.getgoodsbrand();
  },
};
</script>

<style>
.search-result-list {
  padding-top: 20px !important;
}
.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.export-excel-wrapper{
display: inline-block;
margin-left: 10px;
}
</style>