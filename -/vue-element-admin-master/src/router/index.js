import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path(.*)',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        meta: {
            title: '首页',
            icon: 'component',
        },
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: { title: '首页', affix: true }
        }, {
            path: 'index2',
            component: () =>
                import ('@/views/dashboard/index2'),
            name: 'gonggao',
            meta: { title: '新闻公告', affix: true }
        }]
    },
    {
        path: '/tab',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/tab/index'),
            name: 'Tab',
            meta: { title: '老年人活动中心', icon: 'tab' }
        }]
    },
    {
        path: '/documentation',
        component: Layout,
        alwaysShow: true,
        name: 'Documentation',
        meta: {
            title: '网购中心',
            icon: 'documentation',
        },
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/documentation/index'),
            name: 'Documentation',
            meta: { title: '社区帮买', affix: true }
        }, {
            path: 'index2',
            component: () =>
                import ('@/views/documentation/index2'),
            name: 'Documentation2',
            meta: { title: '在线订购', affix: true }
        }]
    },
    {
        path: '/guide',
        component: Layout,
        redirect: '/guide/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/guide/index'),
            name: 'Guide',
            meta: { title: '老年食堂', icon: 'el-icon-tableware', noCache: true }
        }]
    },
    {
        path: '/profile',
        component: Layout,
        redirect: '/profile/index',
        hidden: true,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/profile/index'),
            name: 'Profile',
            meta: { title: '我的主页', icon: 'user', noCache: true }
        }]
    }
]

export const asyncRoutes = [{
        path: '/permission',
        component: Layout,
        redirect: '/permission/page',
        alwaysShow: true,
        name: 'Permission',
        meta: {
            title: '志愿者服务',
            icon: 'lock',
            roles: ['admin', 'editor']
        },
        children: [{
                path: 'page',
                component: () =>
                    import ('@/views/permission/page'),
                name: 'PagePermission',
                meta: {
                    title: '志愿服务详情',
                    roles: ['admin']
                }
            },
            {
                path: 'role',
                component: () =>
                    import ('@/views/permission/role'),
                name: 'RolePermission',
                meta: {
                    title: '志愿者详情',
                    roles: ['admin']
                }
            }

        ]
    },

    {
        path: '/icon',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/icons/index'),
            name: 'Icons',
            meta: { title: '志愿者活动表', icon: 'icon', noCache: true }
        }]
    },

    componentsRouter,
    chartsRouter,
    // nestedRouter,
    // tableRouter,

    {
        path: '/example',
        component: Layout,
        redirect: '/example/list',
        name: 'Example',
        meta: {
            title: '医疗&问诊',
            icon: 'el-icon-s-help'
        },
        children: [{
                path: 'create',
                component: () =>
                    import ('@/views/example/create'),
                name: 'CreateArticle',
                meta: { title: '添加医生信息', icon: 'edit' }
            },
            {
                path: 'edit/:id(\\d+)',
                component: () =>
                    import ('@/views/example/edit'),
                name: 'EditArticle',
                meta: { title: '编辑医生列表', noCache: true, activeMenu: '/example/list' },
                hidden: true
            },
            {
                path: 'list',
                component: () =>
                    import ('@/views/example/list'),
                name: 'ArticleList',
                meta: { title: '医生列表', icon: 'list' }
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()


export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router