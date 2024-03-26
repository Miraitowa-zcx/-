// JavaScript Document
// import {re} from "@babel/core/lib/vendor/import-meta-resolve";

export const config = {
    getDomain: function () {
        // const curPath = window.document.location.href;
        // //获取主机地址之后的目录，如： test/test.jsp
        // const pathName = window.document.location.pathname;
        // const pos = curPath.indexOf(pathName);
        // //获取主机地址，如： http://localhost:8088
        // return curPath.substring(0, pos);
        return "http://localhost:8080";
    },
    getParam: function (name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    getUrlParam: function (url, name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const r = url.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    gatewayPath: '/api',
}
