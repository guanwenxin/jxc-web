<template>
  <div class="update_user">
    <h2>&nbsp;&nbsp;&nbsp;&nbsp;完善信息:</h2>

    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="密码">
        <a-input
          type="password"
          placeholder="请输入密码"
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '请输入密码!' }] },
          ]"
        />
      </a-form-item>
      <a-form-item label="确认密码">
        <a-input
          type="password"
          placeholder="请输入密码"
          v-decorator="[
            'qrpassword',
            { rules: [{ required: true, message: '请输入密码!' }] },
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit"> 
          <!-- 提交  -->
          {{ $t("msg.up") }}
        </a-button>
                   <!-- 清空  -->
        <a-button type="primary" html-type="reset">
           {{ $t("msg.clear") }}
          </a-button>
      </a-form-item>
    </a-form>

    <a-modal
      title="填写信息"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="visible = false"
    >
      <a-form :form="form1">
        <a-form-item
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          label="别名"
        >
          <a-input
            v-decorator="[
              'user_name',
              {
                rules: [{ required: true, message: '请输入你的用户名' }],
              },
            ]"
            placeholder="请输入你的用户名"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          label="phone"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [{ required: true, message: '请输入你的手机号' }],
              },
            ]"
            placeholder="请输入你的手机号"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          label="年龄"
        >
          <a-input
            v-decorator="[
              'age',
              {
                rules: [{ required: true, message: '请输入你的年龄' }],
              },
            ]"
            placeholder="请输入你的年龄"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          label="公司角色"
        >
          <a-select
            v-decorator="[
              'role_name',
              {
                rules: [{ required: true, message: '请选择你的角色名称' }],
              },
            ]"
            placeholder="请选择你的角色名称"
          >
            <a-select-option value="采购管理员"> 采购管理员 </a-select-option>
            <a-select-option value="销售管理员"> 销售管理员 </a-select-option>
            <a-select-option value="库存管理员"> 库存管理员 </a-select-option>
            <a-select-option value="管理员"> 管理员 </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          label="入职时间"
        >
          <!-- <a-input
            v-decorator="[
              'update_time',
              {
                rules: [{ required: true, message: '请输入职时间' }],
              },
            ]"
            placeholder="请输入职时间"
          /> -->

          <a-date-picker
            v-decorator="['update_time']"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- //退出框 -->
    <a-modal title="Tips" :visible="showmodal">
      <template slot="footer">
        <a-button key="back"> 关闭 </a-button>
      </template>
      <p>即将退出本界面,请重新登录</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      form1: this.$form.createForm(this, { name: "modelform1" }),
      password: "",
      qrpassword: "",
      //模态框
      confirmLoading: false,
      visible: false,
      showmodal: false,
      //更新的信息
      // user_name: "",
      // phone: "",
      // age: "",
      // role_name: "",
      // update_time: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          let data = {
            account: sessionStorage.getItem("account"),
            password: values.password,
          };
          this.axios
            .post("/myApi/login", this.qs.stringify(data))
            .then((res) => {
              // console.log(res);
              if (res.data.code == 200) {
                this.$message.success("登录成功");
                values = "";
                setTimeout(() => {
                  this.form = this.$form.createForm(this, {
                    name: "coordinated",
                  });
                  this.visible = true;
                }, 1000);
              } else {
                this.$message.warning("密码错误,请重新输入密码");
              }
            });
        }
      });
    },
    handleOk() {
      this.confirmLoading = true;
      this.form1.validateFields((err, values) => {
        // console.log(values);
        let valuesarr = [];
        for (let i in values) {
          valuesarr.push(values[i]);
        }

        let falg = valuesarr.every((item) => {
          return item;
        });
        if (falg) {
           var d =new Date(values.update_time)
           var da= d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()>=10?d.getDate():'0'+d.getDate() + ' ' + d.getHours()>=10?d.getHours():'0'+d.getHours() + ':' + d.getMinutes()>=10?d.getMinutes():'0'+d.getMinutes() + ':' + d.getSeconds();
          let params = {
            account: sessionStorage.getItem("account"),
            age: `'${values.age}'`,
            phone: `'${values.phone}'`,
            role_name: `'${values.role_name}'`,
            update_time: `'${da}'`,
            user_name: `'${values.user_name}'`,
          };
          
          this.axios
            .post("/myApi/updateuser", this.qs.stringify(params))
            .then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message.success("信息更新成功");
                this.showmodal = true;
                setTimeout(() => {
                  location.replace("http://localhost:3000/");
                }, 2500);
              } else {
                this.$message.warning(res.data.msg);
              }
            });
          setTimeout(() => {
            this.confirmLoading = false;
            this.visible = false;
          }, 2000);
        } else {
          setTimeout(() => {
            this.confirmLoading = false;
          }, 1500);
        }
      });
    },
  },
};
</script>

<style >
</style>