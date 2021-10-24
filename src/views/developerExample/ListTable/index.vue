<template>
  <div class="app-container demo padding">
    <el-tabs v-model="activeName" style="margin-top:-15px;">
      <el-tab-pane label="用户管理" name="first"></el-tab-pane>
      <el-tab-pane label="配置管理" name="second"></el-tab-pane>
      <el-tab-pane label="角色管理" name="third"></el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
    </el-tabs>
    <el-form :inline="true" class="clearfix full">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item>
            <el-input placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input placeholder="请输入" />
          </el-form-item>
        </el-col>

        <div v-if="showForm">
          <el-col :span="4">
            <el-form-item>
              <el-input placeholder="请输入" />
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item>
              <el-input placeholder="请输入" />
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item>
              <el-select v-model="select" placeholder="请选择">
                <el-option label="选项一" value="1" />
                <el-option label="选项二" value="2" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item>
              <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </div>

        <el-col :span="8" class="qurey">
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
            <ExpandForm v-model="showForm" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="24">
        <el-form :inline="true" class="clearfix">
          <el-form-item>
            <el-button type="primary" @click="add">
              <IconFont icon="icon-xinzeng" />新增
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button>次按钮</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="onExport">导出</el-button>
            <el-button @click="onDownLoad">下载</el-button>
          </el-form-item>
          <el-form-item>
            <el-dropdown trigger="click">
              <el-button>
                更多
                <IconFont icon="el-icon-arrow-down" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>对比</el-dropdown-item>
                <el-dropdown-item>历史版本</el-dropdown-item>
                <el-dropdown-item>发布</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

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
  </div>
</template>

<script>
export default {
  watch: {},
  name: "table2",
  components: {},
  props: {},
  data() {
    return {
      activeName: "first",
      showForm: false,
      select: "",
      table: {
        th: [
          //表头和对应list的key
          {
            width: 200,
            label: "状态",
            prop: "aaa"
          },
          {
            width: 200,
            label: "编码",
            prop: "code",
            slot: "code",
            sortable: true
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
    onDownLoad() {
      window.open("./static/ListTable.zip");
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

    // 新增
    add(){
      
      // 解析路由配置
      let routeData = this.$router.resolve('/devExample/form/complex/open');
      // 新窗口打开路由地址
      window.open(routeData.href, '_blank')
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
.el-form {
  .qurey {
    float: right;
    text-align: right;
  }
}
</style>
