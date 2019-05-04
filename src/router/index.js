import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/* Main */
import Main from "@/components/Main";

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  如果 true, 标签将粘贴在标签视图中
  }
 **/
export const constantRoutes = [{
        path: '/redirect',
        component: Main,
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () => import('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/authredirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/errorPage/401'),
        hidden: true
    },
    {
        path: "/500",
        component: () => import("@/views/errorPage/500"),
        hidden: true
    },

    {
        path: "/",
        name: "Index",
        redirect: "/dashboard",
        component: () => import('@/views/Index/Index'), //首页4个导航栏

        children: [{
                path: '/dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'DataView',
                meta: {
                    title: '首页',
                    icon: 'dashboard',
                    noCache: true,
                    affix: true
                }
            },
            {
                path: '/restaurant',
                component: () => import('@/views/restaurant/index'),
                name: 'Restaurant',
                meta: {
                    title: '餐饮详情',
                    icon: 'restaurant',
                    noCache: true,
                    affix: true
                }
                // hidden: true
            },
             {
                 path: '/hotel',
                 component: () => import('@/views/hotelDashBoard/index'),
                 name: 'Hotel',
                 meta: {
                     title: '餐酒店详情',
                     icon: 'hotel',
                     noCache: true,
                     affix: true
                 }
                 // hidden: true
             },
            // {
            //     path: '/hoteldashboard',
            //     name: 'HotelDashBoard',
            //     component: () => import('@/views/hotelDashBoard/index')
            // },
        ]
    },

    {
        path: '/error',
        component: Main,
        redirect: 'noredirect',
        name: 'ErrorPages',
        meta: {
            title: '错误页面',
            icon: '404'
        },
        hidden: true,
        children: [{
                path: '401',
                component: () => import('@/views/errorPage/401'),
                name: 'Page401',
                meta: {
                    title: 'page401',
                    noCache: true
                },
                hidden: true
            },
            {
                path: '404',
                component: () => import('@/views/errorPage/404'),
                name: 'Page404',
                meta: {
                    title: 'page404',
                    noCache: true
                },
                hidden: true
            }
        ]
    },

    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
];

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
});

export const asyncRoutes = [];