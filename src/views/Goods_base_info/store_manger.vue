<template>
  <div class="store_manger">
    <div id="components-form-demo-advanced-search">
      <a-form
        class="ant-advanced-search-form"
        :form="form"
        @submit="handleSearch"
      >
        <a-row>
          <a-col :span="8">
            <a-form-item :label="`仓库编号`">
              <a-input
                v-decorator="[
                  `st_code`,
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入仓库编号',
                      },
                    ],
                  },
                ]"
                placeholder="请输入仓库编号"
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
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
              添加
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="search-result-list">
        <a-table
          :columns="columns"
          :data-source="datasource"
          :rowKey="(record) => record.store_id"
          :bordered="true"
          :pagination="{ pageSize: 3 }"
        >
        
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
        title="仓库管理"
        :visible="visible"
        @ok="handleOkmodal"
        @cancel="visible = false"
      >
        <a-form
          :form="form1"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-form-item label="仓库名">
            <a-input
              placeholder="请输入仓库名"
              v-decorator="[
                'st_name',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入仓库名称',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="仓库编号">
            <a-input
              placeholder="请输入仓库的编号"
              v-decorator="[
                'st_code',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入仓库的编号;例如:C001、C002',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="仓库地址">
            <a-input
              v-decorator="[
                'st_adress',
                {
                  rules: [{ required: true, message: '请输入仓库的地址!!' }],
                },
              ]"
            />
          </a-form-item>
          <a-form-item label="仓库描述">
            <a-select v-decorator="['st_des']" placeholder="请选择对应的品牌">
              <a-select-option value="库存充足"> 库存充足 </a-select-option>
              <a-select-option value="库存良好"> 库存良好 </a-select-option>
              <a-select-option value="需要补仓"> 需要补仓 </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
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
      editrecord: null,
      datasource: [],
      visible: false,
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
        },
        {
          title: "仓库名称",
          dataIndex: "st_name",
        },
        {
          title: "仓库编号",
          dataIndex: "st_code",
        },
        {
          title: "仓库地址",
          dataIndex: "st_adress",
        },
        {
          title: "仓库描述",
          dataIndex: "st_desc",
        },
        {
          title: "更新时间",
          dataIndex: "update_time",
        },
        {
          title: "更新人",
          dataIndex: "account",
        },
        {
          title: "更新别名",
          dataIndex: "user_name",
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
      this.form.validateFields((error, values) => {
        console.log("Received values of form: ", values);
        values.st_code = values.st_code.toUpperCase();
        if (values.st_code) {
          this.getstoreinfo(values).then((res) => {
            this.datasource = res.data.data;
          });
        } else {
          this.getstoreinfo("").then((res) => {
            this.datasource = res.data.data;
          });
        }
      });
    },
    //form1 提交的方法
    handleSubmit() {
      this.form1.validateFields((err, values) => {
        if (!err) {
          values.store_id = this.editrecord.store_id;
          values.update_time = moment().format("YYYY-MM-DD h:mm:ss");
          values.account = sessionStorage.getItem("account");
          values.user_name = sessionStorage.getItem("user_name");
          this.editstoreinfo(values).then((res) => {
            // console.log(res.data.code);
            if (res.data.code == 200) {
              this.$message.success("仓库数据更新成功");
              this.getstoreinfo("").then((res) => {
                // console.log(res.data.data);
                this.datasource = res.data.data;
              });
              setTimeout(() => {
                this.visible = false;
              }, 1500);
            } else {
              this.$message.warn("请稍后重试");
            }
          });
        }
      });
    },
    //编辑仓库的信息接口
    editstoreinfo(params) {
      return this.axios.post("/myApi/editstoreinfo", this.qs.stringify(params));
    },
    //信息重置方法
    handleReset() {
      this.form.resetFields();
    },


    //     //添加订单信息
    //   handAddorder() {
    //   this.add = true;
    //   this.visible = true;
    //   this.text = "添加订单";
    // },

    
    //编辑仓库row的方法
    edit(data) {
      // console.log(data.store_id);
      //将行信息进行传递
      this.editrecord = data;
      this.visible = true;
    },
    //模态框的确认按钮
    handleOkmodal() {
      // console.log("handleOkmodal");
      this.handleSubmit();
    },
    //移除仓库row的方法
    handOK(data) {
      // console.log(data.store_id);
      if (sessionStorage.getItem("account") == "admin") {
        this.$message.success("有权限");
      } else {
        this.$message.info("没有权限");
      }
    },

    //取消移除的方法
    handcancel(data) {
      this.$message.warning("取消成功!!");
    },

    //请求信息
    getstoreinfo(params) {
      return this.axios.post("/myApi/getstoreinfo", this.qs.stringify(params));
    },
  },

  created() {
    this.getstoreinfo("").then((res) => {
      // console.log(res.data.data);
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