const APP_NAME = process.env.VUE_APP_NAME;
import LayoutContent from '@/layout/LayoutContent.vue'
export default [
  {
    path: '/',
    redirect: `/${APP_NAME}/Form`,
    component: LayoutContent,
    children: [
      {
        path: `/${APP_NAME}/Form`,
        name: 'home',
        component: () => import('@/views/developerExample/Form')
      },
      ,
      {
        path: `/${APP_NAME}/FormDetails`,
        name: 'home',
        component: () => import('@/views/developerExample/FormDetails')
      },
      ,
      {
        path: `/${APP_NAME}/ListTable`,
        name: 'home',
        component: () => import('@/views/developerExample/ListTable')
      },
      ,
      {
        path: `/${APP_NAME}/SimpleListTable`,
        name: 'home',
        component: () => import('@/views/developerExample/SimpleListTable')
      },
      ,
      {
        path: `/${APP_NAME}/TreeTable`,
        name: 'home',
        component: () => import('@/views/developerExample/TreeTable')
      },
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true,
  },
];