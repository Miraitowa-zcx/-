import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        /* 是否全屏 */
        isFull: false,
    },
    getters: {
        /* 获取是否全屏的方法 */
        getFull: (state) => state.isFull,
    },
    mutations: {
        /* 同步方法 */
        setFull: (state, data) => (state.isFull = data),
    },
    actions: {},
    modules: {},
});
