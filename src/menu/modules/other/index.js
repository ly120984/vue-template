const APP_NAME = 'demo2'
const parentPath = '/children'
export default [{
  path: parentPath,
  meta: { title: '子系统页面', icon: 'icon-shili' },
  children: [
    {
      path: `${parentPath}/list`,
      name: '列表页面',
      meta: { title: '列表页面', icon: 'el-icon-tickets' },
      children: [
        {
          path: `/${APP_NAME}/Form`,
          name: '表单',
          meta: { title: '表单', icon: '', header: parentPath } //header:隶属于某个一级菜单下，和一级菜单的path保持一致
        },
        {
          path: `/${APP_NAME}/FormDetails`,
          name: '表单详情',
          meta: { title: '表单详情', icon: '', header: parentPath }
        },
        {
          path: `/${APP_NAME}/ListTable`,
          name: '表格',
          meta: { title: '表格', icon: '', header: parentPath }
        },
        {
          path: `/${APP_NAME}/SimpleListTable`,
          name: '简单表格',
          meta: { title: '简单表格', icon: '', header: parentPath }
        },
        {
          path: `/${APP_NAME}/TreeTable`,
          name: '树表格',
          meta: { title: '树表格', icon: '', header: parentPath }
        }
      ]
    }
  ]
}]