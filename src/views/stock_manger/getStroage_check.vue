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
                <a-button type="link" @click="edit(record)"> 修改 </a-button>
              </div>

              <div>
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
              placeholder="请输入采购数量："
              v-decorator="[
                'sale_num',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入采购数量：',
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
          title: "审批通过时间",
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
      ],
    };
  },

  updated() {
    console.log("updated");
  },
  methods: {
    handleOkmodal() {
      console.log("这样才定义了");
    },
    //form表格提交方法
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("form的提交信息", values);
          this.salesearchinfo(values).then((res) => {
            this.datasource = res.data.data;
          });
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
  },

  created() {
    this.saleallinfo("").then((res) => {
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