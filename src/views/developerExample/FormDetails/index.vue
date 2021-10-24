<template>
  <div class="contianer">

    <div class="item">
      <h1>基本信息</h1>
      <el-row>
        <el-col :span="8">
          <span class="title">姓名：</span>
          <span>sammay</span>
        </el-col>
        <el-col :span="8">
          <span class="title">性别：</span>
          <span>女</span>
        </el-col>
        <el-col :span="8">
          <span class="title">城市：</span>
          <span>广州</span>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="8">
          <span class="title">出生年月日：</span>
          <span>1990-01-01</span>
        </el-col>
        <el-col :span="8">
          <span class="title">邮箱地址：</span>
          <span>sammy@qq.com</span>
        </el-col>
        <el-col :span="8">
          <span class="title">地址：</span>
          <span>广州市天河区天河北路888号</span>
        </el-col>
      </el-row>
    </div>

    
    <div class="item">
      <h1>其它信息</h1>
      <el-row>
        <el-col :span="12">
          <span class="title">姓名：</span>
          <span>sammay</span>
        </el-col>
        <el-col :span="12">
          <span class="title">性别：</span>
          <span>女</span>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="12">
          <span class="title">出生年月日：</span>
          <span>1990-01-01</span>
        </el-col>
        <el-col :span="12">
          <span class="title">地址：</span>
          <span>广州市天河区天河北路888号</span>
        </el-col>
      </el-row>
    </div>

    <div class="item">
      <h1>表格信息</h1>
      <el-row>
        <el-col :span="24">
          <CommonTable ref="table" :th="table.th">
          </CommonTable>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      dataArray:[
        {name:'开发中心',url:'http://localhost/test.html',updateTime:'2020-08-01',createTime:'2020-08-10'},
        {name:'消息服务',url:'http://localhost/test.html',updateTime:'2020-04-12',createTime:'2020-04-10'},
        {name:'资源中心',url:'http://localhost/test.html',updateTime:'2020-12-24',createTime:'2020-12-10'},
        {name:'开发示例',url:'http://localhost/test.html',updateTime:'2020-10-23',createTime:'2020-10-10'},
        {name:'客户中心',url:'http://localhost/test.html',updateTime:'2020-12-24',createTime:'2020-12-10'}
      ],
      table: {
        th: [
          //表头和对应list的key
          {
            label: "名称",
            prop: "name",
            class: "red" // 样式写在 \src\components\CommonTable\index.scss
          },
          {
            label: "访问地址",
            prop: "url"
          },
          {
            label: "修改时间",
            prop: "updateTime",
          },
          {
            width: 200,
            label: "创建时间",
            prop: "createTime"
          }
        ]
      }
    }
  },
  mounted(){

    // 设置数据
    this.$refs.table.setData(this.dataArray,this.dataArray.length);
  }
}
</script>

<style lang="scss" scoped>

.contianer{

  .item{
    padding: 16px 24px;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    border-bottom: 1px solid #F0F0F0;

    h1{
      height: 24px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 16px;
      margin: 0px;
      margin-bottom: 16px;
    }
    .title{
      color: rgba(0, 0, 0, 0.85);
    }
    .el-row{
      margin-top: 16px;
    }
  }
  .item:last-child{
    border-bottom: 0px;
  }
}

</style>