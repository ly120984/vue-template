const requireComponent = require.context(
  // 其组件目录的相对路径
  './views',
  // 是否查询其子目录
  true,
  // 匹配vue后缀文件名的文件
  /\.vue$/
)
const components = {};
requireComponent.keys().forEach(item => {
  const componentConfig = requireComponent(`${item}`)
  item = item.replace('./', './views/')
  // 没有定义name的组件禁止注册
  if (componentConfig.default && componentConfig.default.name) {
    let name = componentConfig.default.name
    components[name] = () => import(`${item}`)
  }
});
export default components
