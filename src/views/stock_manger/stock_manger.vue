
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
            <a-button type="primary" html-type="submit"> 搜索 </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
              清除
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="search-result-list">
        <a-table
          :columns="columns"
          :data-source="datasource"
          :rowKey="(record) => record.goods_code"
          :bordered="true"
          :pagination="{ pageSize: 5}"
        >
          <template slot="verify_state" slot-scope="record">
            <a-tag
              :color="record.verify_state === '审核中' ? 'geekblue' : 'green'"
            >
              {{ record.verify_state }}
            </a-tag>
          </template>

          <template slot="action" slot-scope="record">
            <div>
              <a-popconfirm
                title="确定同意该产品入库吗?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="handOK(record)"
                @cancel="handcancel"
              >
                <a-button type="link"> 同意入库 </a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
      </div>

      <a-modal
        :title="text"
        :visible="visible"
        cancelText="取消"
        okText="确定"
        @ok="handleOkmodal"
        @cancel="visible = false"
      >
        <a-form
          :form="form1"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-form-item label="商品编号">
            <a-input
              placeholder="请输入商品编号:例如1234"
              v-decorator="[
                'goods_code',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入商品编号!!',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="商品名称">
            <a-input
              placeholder="请输入商品名称"
              v-decorator="[
                'name',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入商品名称;例如xxx',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="供应商">
            <a-input
              placeholder="请输入品牌名"
              v-decorator="[
                'production_name',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入供应商',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="订单号">
            <a-input
              placeholder="请输入订单号:例如1234"
              v-decorator="[
                'order_num',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入订单号:例如1234',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="数量">
            <a-input
              placeholder="请输入采购数量：例如1234"
              v-decorator="[
                'count',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入采购数量：例如1234',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="单价">
            <a-input
              placeholder="输入单件上品的价格"
              v-decorator="[
                'one_price',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入单件商品的价格',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="总价">
            <a-input
              placeholder="请输入总价格"
              v-decorator="[
                'all_price',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入总价格',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="订单描述">
            <a-input
              placeholder="对本次订单商品进行描述"
              v-decorator="[
                'order_desc',
                {
                  rules: [
                    {
                      required: true,
                      message: '对本次订单商品进行描述',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-form>
        <!-- 编辑 -->
      </a-modal>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
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
          title: "供应商",
          align: "center",
          dataIndex: "ppbrand",
        },

        {
          title: "数量",
          align: "center",
          width: "60px",
          dataIndex: "goods_num",
        },
        {
          title: "单价",
          align: "center",
          width: "60px",
          dataIndex: "buy_price",
        },
        {
          title: "库存成本",
          align: "center",
          width: "90px",
          dataIndex: "goods_allprice",
        },
        {
          title: "入库时间",
          align: "center",
          dataIndex: "goin_time",
        },
        {
          title: "发起人",
          align: "center",
          dataIndex: "account",
        },
        {
          title: "审核状态",
          align: "center",
          scopedSlots: { customRender: "verify_state" },
        },
        {
          title: "审核人",
          align: "center",
          dataIndex: "verify_account",
        },
        {
          title: "操作",
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
          this.getstocksalldata(values).then((res) => {
            if (res.data.code == 200) {
              this.datasource = res.data.data;
            }
          });
        }
      });
    },
    //form1 提交的方法
    handleSubmit() {
      this.form1.validateFields((err, values) => {
        if (!err) {
          console.log("form1的提交信息", values);
        }
      });
    },

    //添加订单信息
    handAddorder() {},

    //信息重置方法
    handleReset() {
      this.form.resetFields();
    },

    //模态框的确认按钮
    handleOkmodal() {},
    //添加信息的操作
    handOK(record) {
      record.gofin_time = moment().format("YYYY-MM-DD HH:MM:ss");
      record.verify_account = sessionStorage.getItem("account");
      this.agreestock(record).then((res) => {
        // console.log(res);
        this.addgoods(record);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getstocksalldata("").then((res) => {
            // console.log(res);
            this.datasource = res.data.data;
          });
        } else {
          this.$message.success(res.data.msg);
        }
      });
    },
    //取消框
    handcancel() {
      this.$message.warning("已经取消该操作!!!");
    },
    //获取stock表中的数据
    getstocksalldata(params) {
      return this.axios.post(
        "/myApi/getstocksalldata",
        this.qs.stringify(params)
      );
    },
    //同意入库
    agreestock(params) {
      return this.axios.post("/myApi//agreestock", this.qs.stringify(params));
    },
    //更新goods信息
    addgoods(params) {
      this.axios
        .post("/myApi/addgoods", this.qs.stringify(params))
        .then((res) => {
          console.log(res);
        });
    },
  },

  created() {
    this.getstocksalldata("").then((res) => {
      // console.log(res);
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
</style>