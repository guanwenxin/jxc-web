
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
          </a-col>
        </a-row>
      </a-form>
      <div class="search-result-list">
        <a-table
         
          :columns="columns"
          :data-source="datasource"
          :rowKey="(record) => record.goods_code"
          :bordered="true"
          :pagination="{ pageSize: 5 }"
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
              <div>
                <a-button type="link" @click="edit(record)"> 修改 </a-button>
             
                <a-button type="link" @click="handsubmit(record)">
                  <!-- 提交 -->
                  {{ $t("msg.up") }}
                </a-button>
              </div>
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
          <a-form-item label="数量">
            <a-input
              placeholder="请输入采购数量：例如 0、10、100"
              v-decorator="[
                'sale_num',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入采购数量：例如 0、10、100',
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
                'sale_price',
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
          title: "订单总计",
          align: "center",
          dataIndex: "goos_cost",
        },
        {
          title: "发起人",
          align: "center",
          dataIndex: "sale_account",
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
          this.editrecord.goout_time = moment().format("YYYY-MM-DD HH:MM:ss");
          this.editrecord.sale_account = sessionStorage.getItem("account");
          this.editrecord.sale_price = values.sale_price;
          this.editrecord.sale_num = values.sale_num;
          console.log("form1的提交信息", this.editrecord);
          this.setstocksale(this.editrecord);
          this.getstocksalldata("").then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.datasource = res.data.data;
              this.$message.success("修改成功!!");
              setTimeout(() => {
                this.visible = false;
              }, 1000);
            }
          });
        }
      });
    },
    //编辑的方法
    edit(record) {
      this.visible = true;
      this.editrecord = record;
    },
    //提交的方法
    handsubmit(record) {
      console.log(record);
      if (!record.sale_num && !record.sale_price) {
        this.$message.warning("请先点击修改完善销售信息!!!");
      } else {
        record.submit_account = sessionStorage.getItem("account");
        record.submit_time = moment().format("YYYY-MM-DD HH:MM:ss");
        this.updategoodsAndsale(record).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
          } else {
            this.$message.warning(res.data.msg);
          }
        });
      }
    },

    //信息重置方法
    handleReset() {
      this.form.resetFields();
    },

    //模态框的确认按钮
    handleOkmodal() {
      this.handleSubmit();
    },

    //获取stock表中的数据
    getstocksalldata(params) {
      return this.axios.post(
        "/myApi/getstocksalldata",
        this.qs.stringify(params)
      );
    },
    //插入数据 setstocksale
    setstocksale(params) {
      return this.axios.post("/myApi/setstocksale", this.qs.stringify(params));
    },
    //更新数据
    updategoodsAndsale(params) {
      return this.axios.post(
        "/myApi/updategoodsAndsale",
        this.qs.stringify(params)
      );
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

<style scoped>

</style>

<style>
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