<template>
  <div class="container">
    <div>
      <img src="@/assets/404_images/404.png"/>
    </div>
    <div class="info">
      <div class="status">404</div>
      <div class="content">抱歉，你访问的页面不存在</div>
      <el-button @click="goHome" type="primary">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    goHome(){
      this.$router.replace('/')
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 250px;
    height: 233px;
  }
  .info {
    margin-left: 87px;
    .status {
      color: rgba(0, 0, 0, 0.85);
      font-size: 60px;
    }
    .content {
      color: rgba(0, 0, 0, 0.65);
      font-size: 20px;
      margin: 24px 0;
    }
  }
}
</style>
