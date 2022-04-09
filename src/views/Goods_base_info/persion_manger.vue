<template>
  <div class="persion_manger">
    <a-table
          :columns="columns"
          :data-source="datasource"
          :rowKey="(record) => record.account"
          :bordered="true"
          :pagination="{ pageSize: 5 }"
        ></a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datasource:[],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
        },
        {
          title: "用户名称",
          dataIndex: "user_name",
        },
        {
          title: "角色名称",
          dataIndex: "role_name",
        },
        {
          title: "年龄",
          dataIndex: "age",
        },
        {
          title: "联系方式",
          dataIndex: "phone",
        },
        {
          title: "入职时间",
          dataIndex: "update_time",
        },
      ],
    };
  },
  methods:{
      //获取所有员工信息
      getalluserinfo(params){
        return this.axios.post(`/myApi/getallpersion`,this.qs.stringify(params))
      }
  },
  created() {
    this.getalluserinfo('').then(res=>{
      // console.log(res.data.data);
      this.datasource=res.data.data
    })
  },
};
</script>

<style>
</style>