<template>
  <div class="dialog-container">
    <el-form ref="ruleForm"  :model="form" :rules="rules" label-width="100px">
      <el-form-item label="出差事由：" prop="reason">
        <el-input v-model="form.reason" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="合同编号：" prop="no">
        <el-input v-model="form.no" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="出发地址：">
        <el-input v-model="form.startAddress" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" :rows="3" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'add',
  data(){
    return{
      form:{
        reason:'',
        no:'',
        startAddress:'',
        startDate:''
      },
      rules: {
        reason: [
          { required: true, message: '请填写出差事由', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        no:[
          { required: true, message: '请填写合同编号', trigger: 'blur' }
        ]
      },
    }
  },
  methods:{
    
  }
}
</script>

<style lang="scss" socped>
.dialog-container{
  padding: 26px 32px;
}
</style>