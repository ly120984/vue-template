<template>
  <div class="app-container demo padding">
  
    <el-form :inline="true" class="clearfix full">
      
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item>
            <el-input placeholder="姓名/地址" suffix-icon="el-icon-search"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-select v-model="select" placeholder="状态">
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14" style="text-align:right;">
          <el-form-item class="opration">
            <el-button type="primary" @click="add"><IconFont icon="icon-xinzeng" />新增</el-button>
            <el-button @click="onExport"><IconFont icon="el-icon-upload2" />导出</el-button>
            <el-button @click="onDownLoad">下载</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <CommonTable
      ref="table"
      :th="table.th"
      :hasSelect="true"
      :drag="true"
      :exportMax="6000"
      v-on:handleCurrentChange="handleCurrentChange"
      v-on:handleSelectionChange="handleSelectionChange"
      v-on:onSortChange="onSortChange"
    >
      <template slot-scope="scope" slot="code">
        <div>{{scope.row.code}}</div>
      </template>
      <template slot-scope="scope" slot="name">
        <el-tag>{{scope.row.name}}</el-tag>
      </template>
      <template slot-scope="scope" slot="url">
        <el-link :href="scope.row.url">{{scope.row.url}}</el-link>
      </template>
    </CommonTable>

    <el-dialog
      title="标题"
      :visible.sync="dialogVisible"
      width="600px"
      :append-to-body="true"
      center>
      <div class="body">
        <Add ref="addDialog"></Add>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Add from './add'
export default {
  watch: {},
  name: "table2",
  components: {Add},
  props: {},
  data() {
    return {
      showForm: false,
      dialogVisible: false,
      select:'1',
      table: {
        th: [
          //表头和对应list的key
          {
            width: 200,
            label: "编码",
            prop: "code",
            slot: "code",
            sortable: true,
            show:()=>{
              if(this.select==1){
                return true
              }else{
                return false
              }
            }
          },
          {
            width: 200,
            label: "打开方式",
            prop: "openType",
            sortable: true,
            filter: function(value) {
              if (value == 1) {
                return "默认方式";
              } else {
                return "内嵌方式";
              }
            },
            filters: [
              { text: "内嵌方式", value: 1 },
              { text: "默认方式", value: 3 }
            ],
            filterMethod: (value, row, column) => {
              console.log(value, row, column, "filters");
              return row.type === value;
            }
          },
          {
            sortable: true,
            label: "Id",
            prop: "id"
          },
          {
            label: "修改时间",
            prop: "updateTime"
          },
          {
            width: 200,
            label: "创建时间",
            prop: "createTime"
          },
          {
            label: "操作",
            width: 200,
            type: "operation", //操作列一定要加
            buttons: [
              {
                label: "编辑",
                Fun: (index, row, item) => {
                  console.log(index, row, item);
                  alert("编辑");
                },
                class: ""
              },
              {
                label: "删除",
                Fun: (index, row, item) => {
                  console.log(index, row, item);
                  alert("删除");
                },
                filter: scope => {
                  if (scope.row.name === "ElementAdmin") {
                    return false;
                  } else {
                    return true;
                  }
                },
                class: "cancel" //样式写在\src\components\CommonTable\index.scss
              },
              {
                label: "详情",
                Fun: (index, row, item) => {
                  console.log(index, row, item);
                  alert("详情");
                }
              }
            ],
            mores: [
              //更多按钮
              {
                label: "编辑",
                Fun: (index, row, item) => {
                  console.log(index, row, item);
                  alert("更多编辑");
                },
                class: ""
              },
              {
                label: "删除",
                Fun: (index, row, item) => {
                  console.log(index, row, item);
                  alert("更多删除");
                },
                class: "cancel" //样式写在\src\components\CommonTable\index.scss
              },
              {
                label: "详情",
                Fun: (index, row, item) => {
                  console.log(index, row, item);
                  alert("更多详情");
                }
              }
            ]
          }
        ],

        data: []
      }
    };
  },
  computed: {},
  methods: {
    hanDetail(index, row, item) {
      console.log(index, row, item, "详情");
    },
    hanDel(index, row, item) {
      console.log(index, row, item, "删除");
    },
    hanEdit(index, row, item) {
      console.log(index, row, item, "编辑");
    },
    handleCurrentChange(currpage, pagesize) {
      console.log(currpage, pagesize, "页数改变，重新加载数据");
      this.getData(currpage, pagesize);
    },
    handleSelectionChange(e) {
      console.log(e, "多选框改变状态");
    },
    onSortChange(column, prop, order) {
      console.log(column, prop, order, "排序改变事件");
    },
    onDownLoad(){
      window.open('./static/SimpleListTable.zip')
    },
    onExport() {
      this.$refs.table.onExport(
        "commonTable",
        function(filterVal, jsonData) {
          //自定义字段过滤器
          return jsonData.map(item =>
            filterVal.map(prop => {
              if (prop == "age") {
                item[prop] = item[prop] + "岁";
              }
              if (prop == "sex") {
                item[prop] = item[prop] + "生";
              }
              return item;
            })
          );
        },
        async function(count) {
          console.log(count, "async--async");
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          var obj = {
            page: 1,
            pageSize: count
          };
          var res = await this.$api.get("/client-platform/permission/menu/list", obj);
          loading.close();
          if (res.status == 1) {
            var listtable = res.data.rows;
            console.log(listtable, "async--async");
            return listtable;
          } else {
            console.log(res.errorCode);
          }
        }
      );
    },
    async getData(page = 1, rows = 10) {
      console.log(this.$zloading, "loadingsdfs");
      this.$zloading.show(this.$refs.table.$el);
      setTimeout(() => {
        this.$zloading.close();
      }, 1000);
      var obj = {
        page,
        rows
      };
      var res = await this.$api.get("/client-platform/permission/menu/list", obj);
      if (res.status == 1) {
        var listtable = res.data.rows;
        var total = res.data.total * 1;
        this.$refs.table.setData(listtable, total);
        console.log(listtable, "async--async");
        //return listtable;
      } else {
        console.log(res.errorCode);
      }
    },

    // 新建
    add(){
      this.dialogVisible = true;
    },
    // 提交
    submit(){
      
      // 调用 add页面的校验方法
      this.$refs.addDialog.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created() {},
  mounted() {
    //初始化表格数据
    // this.getData();
  }
};
</script>
<style lang="scss" scoped>

.opration{
  text-align: right;
}

</style>
