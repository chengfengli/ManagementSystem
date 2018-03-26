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
      	/*个人通知*/
        {
            path: '/notice',
            component: resolve => require(['../components/page/Notice.vue'], resolve)
        },
        /*公告*/
        {
            path: '/announcement',
            component: resolve => require(['../components/page/announcement/Announcement.vue'], resolve)
        },
        {
            path: '/announcementMana',
            component: resolve => require(['../components/page/announcement/AnnouncementMana.vue'], resolve)
        },
        /*员工管理*/
        {
            path: '/personManage',
            component: resolve => require(['../components/page/person/PersonManage.vue'], resolve)
        },
        /*事件中心*/
        {
            path: '/eventCenter',
            component: resolve => require(['../components/page/eventCenter/eventCenter.vue'], resolve)
        },
        /* 事件处理 */
        {
          path: '/eventProcessing',
          component: resolve => require(['../components/page/eventProcessing/eventProcessing.vue'], resolve)
        },
        /* 事件列表 */
        {
          path: '/eventList',
          component: resolve => require(['../components/page/eventProcessing/eventList.vue'], resolve)
        },
    ]
})
