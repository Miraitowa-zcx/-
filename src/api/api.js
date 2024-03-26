import {
    getApi,
    postApi
} from "@/api/manage";
const test1 = (params) =>
    getApi("", params);
const test2 = (data) =>
    postApi("", data);
/* 暴露方法 */
export {
    test1,
    test2
}