import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Cookies from "js-cookie";
import dynamicRoutes from './dynamic-routes' // 引入动态路由配置

Vue.use(VueRouter)

const routes = [

    //  ===   登录   ===
    {path: '/login', name: 'LoginPage', component: () => import('@/views/login/login.vue')},

    //  ===   注册   ===
    {path: '/register', name: 'RegisterPage', component: () => import('@/views/register/register.vue')},

    // 一级路由
    {
        path: '/', name: 'LayoutPage', component: Layout, redirect: '/home',
        children: [

            //  ===   主页   ===
            {path: 'home', name: 'Home', component: () => import('@/views/home/HomeView.vue')},

            // ====   摄像头管理   ====
            {path: 'deviceList', name: 'DeviceList', component: () => import('@/views/camera/deviceList.vue')},

            // 动态加载路由
            ...dynamicRoutes
        ]
    },
    {path: "*", component: () => import('@/views/Error.vue')}
]

const router = new VueRouter({mode: 'history', base: process.env.BASE_URL, routes})
router.beforeEach((to, from, next) => {

    const cookie = Cookies.get("admin") ? JSON.parse(Cookies.get("admin")) : null
    if (!cookie && to.path !== '/login' && to.path !== '/register') {
        return next('/login');
    }

    // 如果用户是管理员，则无需特殊处理，直接进入下一个路由
    const userRole = Cookies.get('role') ? JSON.parse(Cookies.get('role')) : null
    if (userRole === 'admin') {
        return next();
    }

    // 对于非管理员用户
    // 允许他们访问登录、注册页面以及一级路由下除动态路由之外的所有子路由
    if (to.path === '/login' || to.path === '/register' ||
        (to.path !== '/' && !dynamicRoutes.some(route => route.path.startsWith(to.path.split('/')[1])))) {
        return next();
    }

    // 若非管理员用户尝试访问不在允许范围内的动态路由，则重定向至登录页面
    return next('/Error');
})

// 针对ElementUI导航栏中重复导航报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router
