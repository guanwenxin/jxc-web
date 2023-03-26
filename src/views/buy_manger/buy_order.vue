<template>
  <div class="buy_order">
    <div id="components-form-demo-advanced-search">
      <a-form
        class="ant-advanced-search-form"
        :form="form"
        @submit="handleSearch"
      >
        <a-row>
          <a-col :span="8">
            <a-form-item :label="`订单或商品编号`">
              <a-input
                v-decorator="[`goods_order_num`]"
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
            <a-button :style="{ marginLeft: '8px' }" @click="handAddorder">
              添加
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
          :pagination="{ pageSize: 3 }"
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
              <a-popconfirm
                title="确定要移除当前仓库的信息吗?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="handOK(record)"
                @cancel="handcancel"
              >
                <a-button type="link" style="color: red"> 移除 </a-button>
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
          v-if="add"
          :form="form1"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-form-item label="商品编号">
            <a-input
              placeholder="请输入商品编号:一般都为四位"
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
                      message: '请输入商品名称',
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
              placeholder="请输入订单号:例如:0000 、F0000"
              v-decorator="[
                'order_num',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入订单号:例如:0000 、F0000',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="数量">
            <a-input
              placeholder="请输入采购数量：例如 0、10、100"
              v-decorator="[
                'count',
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
        <a-form
          v-else
          :form="form1"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-form-item label="商品编号">
            <a-input
              placeholder="请输入商品编号:一般都为四位"
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
                      message: '请输入商品名称;例如: 哈药',
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
              placeholder="请输入订单号:例如:0000 、F0000"
              v-decorator="[
                'order_num',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入订单号:例如:0000 、F0000',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="数量">
            <a-input
              placeholder="请输入采购数量：例如 0、10、100"
              v-decorator="[
                'count',
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
          dataIndex: "production_name",
        },
        {
          title: "订单号",
          align: "center",
          dataIndex: "order_num",
        },
        {
          title: "数量",
          align: "center",
          width: "60px",
          dataIndex: "count",
        },
        {
          title: "单价",
          align: "center",
          width: "60px",
          dataIndex: "one_price",
        },
        {
          title: "总价",
          align: "center",
          width: "90px",
          dataIndex: "all_price",
        },
        {
          title: "订单描述",
          align: "center",
          dataIndex: "order_desc",
        },
        {
          title: "创建时间",
          align: "center",
          dataIndex: "create_time",
        },
        {
          title: "编辑后时间",
          align: "center",
          dataIndex: "update_time",
        },
        {
          title: "创建者",
          align: "center",
          dataIndex: "create_account",
        },
        {
          title: "审核状态",
          align: "center",
          // dataIndex: "verify_state",
          scopedSlots: { customRender: "verify_state" },
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
          this.getbuyorder(values).then((res) => {
            // console.log(res);
            this.datasource = res.data.data;
          });
        }
      });
    },
    //form1 提交的方法
    handleSubmit() {
      this.form1.validateFields((err, values) => {
        if (!err) {
          // console.log("form1的提交信息", values);
          if (this.add) {
            values.create_time = moment().format("YYYY-MM-DD h:mm:ss");
            values.create_account = sessionStorage.getItem("account");
            this.addbuyorder(values).then((res) => {
              if (res.data.code == -1) {
                this.$message.warning("此订单已经存在!!");
              }
              if (res.data.code == 200) {
                this.getbuyorder("").then((res) => {
                  // console.log(res);
                  this.datasource = res.data.data;
                });
                setTimeout(() => {
                  this.$message.success("此订单已经添加成功!!");
                  this.visible = false;
                }, 1000);
              }
            });
          } else {
            values.purchase_id = this.editrecord.purchase_id;
            values.update_time = moment().format("MM-DD h:mm");
            this.editbuyorder(values).then((res) => {
              // console.log(res);
              this.getbuyorder("").then((res) => {
                // console.log(res);
                this.datasource = res.data.data;
              });
              setTimeout(() => {
                this.$message.success("订单编辑成功!!");
                this.visible = false;
              }, 1000);
            });
            console.log("发送请求");
          }
        }
      });
    },

    //添加订单信息
    handAddorder() {
      this.add = true;
      this.visible = true;
      this.text = "添加订单";
    },

    //信息重置方法
    handleReset() {
      this.form.resetFields();
    },
    //编辑仓库row的方法
    edit(record) {
      //将行信息进行传递
      this.text = "订单编辑";
      this.editrecord = record;
      this.add = false;
      this.visible = true;
    },
    //模态框的确认按钮
    handleOkmodal() {
      this.handleSubmit();
    },
    //移除仓库row的方法
    handOK(record) {
      this.delbuyorder(record).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("删除成功!!!");
          this.getbuyorder("").then((res) => {
            // console.log(res);
            this.datasource = res.data.data;
          });
        }
      });
    },
    //取消移除的方法
    handcancel() {
      this.$message.warning("已经取消了");
    },

    //请求信息
    getbuyorder(params) {
      return this.axios.post("/myApi/getbuyorder", this.qs.stringify(params));
    },
    //添加采购订单
    addbuyorder(params) {
      return this.axios.post("/myApi/addbuyorder", this.qs.stringify(params));
    },
    //编辑订单的信息接口
    editbuyorder(params) {
      return this.axios.post("/myApi/editbuyorder", this.qs.stringify(params));
    },
    //删除订单的接口
    delbuyorder(params) {
      return this.axios.post("/myApi/delbuyorder", this.qs.stringify(params));
    },
  },

  created() {
    this.getbuyorder("").then((res) => {
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