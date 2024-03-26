import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "跳转页",
        meta: {
            title: "加载中...溺水检测数据大屏",
        },
        component: () => import("@/views/index/index.vue"),
        redirect: "/carbonPeaking-index",
        children: [
            {
                path: "carbonPeaking-index",
                name: "溺水检测数据大屏",
                meta: {
                    title: "溺水检测数据大屏",
                },
                component: () => import("@/views/carbonPeaking/index.vue"),
            },
            {
                path: "test-index",
                name: "测试",
                meta: {
                    title: "测试",
                },
                component: () => import("@/views/test/testIndex.vue"),
            },
        ],
    },
];

const router = new VueRouter({
    mode: "hash",
    // base: "/bigscreen/",
    routes,
});
/* 解决router报错问题 */
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

export default router;
