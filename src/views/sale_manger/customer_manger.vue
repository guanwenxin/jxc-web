
<template>
  <div class="stock_manger">
    <div id="components-form-demo-advanced-search">
      <a-form
        class="ant-advanced-search-form"
        :form="form"
        @submit="handleSearch"
      >
        <a-row>
          <a-col :span="8">
            <a-form-item :label="`商品编号`">
              <a-input
                v-decorator="[`goods_code`]"
                placeholder="请输入订单或者商品编号"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-button type="primary" html-type="submit"> 
              <!-- 搜索  -->
              {{ $t("msg.search") }}
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
              <!-- 清除 -->
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
          :rowKey="(record) => record.submit_time"
          :bordered="true"
          :pagination="{ pageSize: 6 }"
        >
          <template slot="verify_state" slot-scope="record">
            <a-tag
              v-if="record.verify_state != '通过'"
              :color="record.verify_state === '不通过' ? 'volcano' : 'geekblue'"
            >
              {{ record.verify_state }}
            </a-tag>
            <a-tag v-else :color="record.verify_state ? 'green' : ''">
              {{ record.verify_state }}
            </a-tag>
          </template>

          <template slot="action" slot-scope="record">
            <div>
              <div>
                <a-button type="link" @click="pass(record)"> 通过 </a-button>
                <a-button
                  type="link"
                  style="color: red"
                  @click="Nopass(record)"
                >
                  不通过
                </a-button>
              </div>
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      // excel
      formInline: {},
      // tableData: [],//订单列表数据展示
      total: 10,
      pageSize: 1,
      ids: [],//操作id数组集合]
      DetailsForm: [],//需要导出的数据 [{},{}]
      json_fields: {//映射字段值
        // "订单编号": 'goods_code',
          //数字处理--防止订单编号太长
          "订单编号":{
          field:"goods_code",
          callback:value=>{
            return '&nbsp;'+value;
          }
        },
        "商品名称": 'name',
        "销售数量": 'sale_num',
        "销售价格": 'sale_price',
        "提交时间": 'submit_time',
        "提交人":'submit_account',
        "审批时间":'verify_time',
        "审核状态":'verify_state',
        "审核人":'verify_account',
      },
      title: 'guan公司进销存管理系统商品销售列表',//


      form: this.$form.createForm(this, { name: "advanced_search" }),
      form1: this.$form.createForm(this, { name: "advanced_search" }),
      text: null,
      add: true,
      editrecord: null,
      datasource: [],
      visible: false,
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
        },
        {
          title: "商品编号",
          align: "center",
          dataIndex: "goods_code",
        },
        {
          title: "商品名称",
          align: "center",
          dataIndex: "name",
        },

        {
          title: "销售数量",
          align: "center",
          dataIndex: "sale_num",
        },
        {
          title: "销售价格",
          align: "center",
          dataIndex: "sale_price",
        },
        {
          title: "提交时间",
          align: "center",
          dataIndex: "submit_time",
        },
        {
          title: "提交人",
          align: "center",
          dataIndex: "submit_account",
        },

        {
          title: "审批时间",
          align: "center",
          dataIndex: "veriify_time",
        },

        {
          title: "审核状态",
          align: "center",
          scopedSlots: { customRender: "verify_state" },
        },
        {
          title: "审批人",
          align: "center",
          dataIndex: "verify_account",
        },
        {
          title: "审核状态",
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },

  updated() {
    console.log("updated");
  },
  methods: {
    //form表格提交方法
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("form的提交信息", values);
          this.salesearchinfo(values).then((res) => {
            // console.log(res);
            this.datasource = res.data.data;
          });
        }
      });
    },

    pass(record) {
      // console.log(record, "pass");
      record.verify_account = sessionStorage.getItem("account");
      record.veriify_time = moment().format("YYYY-MM-DD HH:MM");
      record.pass=1;
      this.salepassAndnopass(record).then((res) => {
        if (res.data.code == 200) {
          this.saleallinfo("").then((res) => {
            // console.log(res, 45646);
            this.$message.success("通过该销售订单");
            this.datasource = res.data.data;
          });
        } else {
          this.$message.warning("系统繁忙");
        }
      });
    },
    Nopass(record) {
      // console.log(record, "nopass");
      record.verify_account = sessionStorage.getItem("account");
      record.veriify_time = moment().format("YYYY-MM-DD HH:MM");
      record.pass=0;
      this.salepassAndnopass(record).then((res) => {
        if (res.data.code == 200) {
          this.saleallinfo("").then((res) => {
            // console.log(res, 45646);
            this.$message.success("通过该销售订单");
            this.datasource = res.data.data;
          });
        } else {
          this.$message.warning("系统繁忙");
        }
      });
    },

    //信息重置方法
    handleReset() {
      this.form.resetFields();
    },

    //插入数据 setstocksale
    salesearchinfo(params) {
      return this.axios.post(
        "/myApi/salesearchinfo",
        this.qs.stringify(params)
      );
    },
    //获取sale表中的数据
    saleallinfo(params) {
      return this.axios.post("/myApi/saleallinfo", this.qs.stringify(params));
    },
    //通过和不通过订单接口
    salepassAndnopass(params) {
      return this.axios.post(
        "/myApi/salepassAndnopass",
        this.qs.stringify(params)
      );
    },
  },

  created() {
    this.saleallinfo("").then((res) => {
      console.log(res, 45646);
      this.datasource = res.data.data;
    });
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