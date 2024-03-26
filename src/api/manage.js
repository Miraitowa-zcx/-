import {
    http
} from "@/utils/http.js";
/* getapi */
export const getApi = (url, params) => {
    return http({
        url: url,
        method: "get",
        params,
    });
};
/* postapi */
export const postApi = (url, data) => {
    return http({
        url: url,
        method: "post",
        data,
    });
};