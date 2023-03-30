<template>
  <div>
    <button @click="printHandle">print</button>
    <hr />
    <!-- 1. 默认获取第一张pdf  可以是单个的pdf图片 -->
    <!-- <pdf ref="myPdfComponent" src="/static/ygkj.pdf"></pdf> -->
    <!-- 2. 分页展示pdf -->
    <!-- 分页器 -->
    <Pagination
      :total="total"
      :pageSize="pageSize"
      @CurrentChange="CurrentChange"
    ></Pagination>
    <pdf :src="src" :page="page" ref="myPdfComponent"></pdf>
  </div>
</template>
  
  <script>
import pdf from "vue-pdf";
import Pagination from "./Pagination.vue";
// 通过方法加载
var loadingTask = pdf.createLoadingTask("/static/jxc.pdf");
export default {
  data() {
    return {
      currentPage: 0, //当前的页码
      pageCount: 0, //总页码
      src: loadingTask, //src pdf路径地址
      numPages: undefined, //总页码
      page: 1,
      total: 1, //总页码
      pageSize: 1, //页码条数
    };
  },
  components: {
    pdf,
    Pagination,
  },
  mounted() {
    this.src.promise.then((pdf) => {
      //获取总的页码数
      this.numPages = pdf.numPages;
      this.total = pdf.numPages;
    });
  },
  methods: {
    //分页--------------
    CurrentChange(page) {
      this.page = page;
    },
    //打印PDF
    printHandle() {
      this.$refs.myPdfComponent.print();
      // console.log(this.$refs.myPdfComponent)
    },
  },
};
</script>

  <style>
</style>