<template>
  <div class="setStroage_check">
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
              <a-button type="link" @click="setstockgoods(record)">
                提交
              </a-button>
              <a-button
                type="link"
                style="color: red"
                @click="removestockgoods(record)"
              >
                撤销
              </a-button>
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
      form: this.$form.createForm(this, { name: "advanced_search" }),
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
          title: "通过时间",
          align: "center",
          dataIndex: "mount_time",
        },

        // {
        //   title: "审核状态",
        //   align: "center",
        //   // dataIndex: "verify_state",
        //   scopedSlots: { customRender: "verify_state" },
        // },

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
            this.datasource = res.data.data;
          });
        }
      });
    },

    //信息重置方法
    handleReset() {
      this.form.resetFields();
    },

    //请求订单数据信息
    getbuyorder(params) {
      return this.axios.post(
        "/myApi/getpassbutorder",
        this.qs.stringify(params)
      );
    },
    //入库信息插入
    setstockgoods(params) {
      params.account = sessionStorage.getItem("account");
      params.goin_time = moment().format("YYYY-MM-DD HH:mm");
      this.axios
        .post("/myApi/setstockgoods", this.qs.stringify(params))
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
          } else {
            this.$message.warning(res.data.msg);
          }
        });
    },
    removestockgoods(params) {
      console.log(params);
      this.axios.post("/myApi/removestockgoods",this.qs.stringify(params)).then(res=>{
       if(res.data.code==200){
         this.$message.success(res.data.msg)
       }else{
         this.$message.warning(res.data.msg)
       }
      })
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