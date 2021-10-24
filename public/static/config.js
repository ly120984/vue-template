window.GLOBAL = {
  debug: false,
  title: 'TEMPLATE',
  logoUrl: "./static/img/logo.png",
  loginUrl: 'http://10.201.62.28:9080/auth-platform/login', // 统一认证登录页面地址
  appId: '70431454996365312', // 登录appId
  clientId: 'face_code', // clientId
  deviceType: '1', // 登录类型
  loadRouter: false, // 是否加载动态路由
  loadDict: false, // 是否加载数据字典
  tokenMode: false, // 使用本地登录页面 token登录模式
  layoutMode: 1,  // 有效值  1(上下布局)、2(左右布局)、3(无左侧菜单布局)
  // ws: { // websokect配置
  //   server: '10.201.62.28', // IP地址
  //   port: 8591, // 端口号
  //   msgCode: 'YY91378154393796608'  // 唯一应用编号
  // },
  loadModules: ['demo2'], //是否要子模块 ['模块名称'] ||  默认false不加载
  // loadModulesMenu: ['app-auth', 'app-gateway'], //是否要加载子模块的菜单 ['模块名称'] || true  数组指定模块加载 ，true 全加载 默认false不加载
}

var apiOpt = {
  /* 站内消息接口*/
  'url_wsMsgList': '/chery-driver/dealer/znx/get/znx_detail/list', /* 获取消息列表 */
  'url_wsReadMsg': '/chery-driver/dealer/znx/set_read_status', /* 设置消息为已读 */
  'url_wsSendMsg': '/chery-driver/dealer/test/send', /* 发送模拟消息 */
  'url_wsPushMsgList': '/chery-driver/dealer/znx/get/znx_detail/push/list', /* 获取弹窗消息 */
  'url_wsBrokerToken': '/chery-driver/dealer/znx/get_broker_token', /* 获取websokect的token */
  /** 用户接口 */
  'url_role_menu': '/client/index/role_menu', /* 动态路由地址 角色菜单 */
  'url_user_name': '/client/index/user_name', /* 获取用户信息 */
  'url_logout': '/client/oauth_login/logout', /* 注销 */
}
window.APIConfig = apiOpt;
