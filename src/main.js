import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import { Application } from 'face-code3.0/core'
import 'face-code3.0/lib/facecode.css'
import "@/styles/index.scss"
import menus from '@/menu'
import routes from '@/router';
import components from '@/components.js';
import store from '@/store';
import moduleComponents from '../config/module-components';
Application.addModules(window.GLOBAL.loadModules || [], moduleComponents) // 添加子模块  参数1为模块集合 参数2为需要注册的子组件 名称和子组件导出的名称一致
// 注册实例  routes:路由必传, menus：菜单, store：store, components：需要导出的组件
let index = Application.regist({ routes, menus, store, components }, ({ Vue, router, faceCode }) => {
    // 注册完后的回调
    console.log(Vue, router, faceCode, '模块注册完毕')
})
// 必须导出实例
export default index