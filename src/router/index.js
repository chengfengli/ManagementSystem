import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/index',
            component: resolve => require(['../components/page/Index.vue'], resolve),
            children:[
//              {
//                  path: '/',
//                  component: resolve => require(['../components/page/Readme.vue'], resolve)
//              }
            ]
        },
      /* 系统设置 */
      {
        path: '/systemSet',
        component: resolve => require(['../components/page/systemSetup/systemSet.vue'], resolve)
      },
        {
            path: '/notice',
            component: resolve => require(['../components/page/Notice.vue'], resolve)
        },
        {
            path: '/announcement',
            component: resolve => require(['../components/page/Announcement.vue'], resolve)
        },
        {
            path: '/announcementMana',
            component: resolve => require(['../components/page/AnnouncementMana.vue'], resolve)
        },
        {
            path: '/personManage',
            component: resolve => require(['../components/page/PersonManage.vue'], resolve)
        },
    ]
})
