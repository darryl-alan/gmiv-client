import axios from "axios";
import Auth from "./Auth";

const httpErrors = {
    "4": "Bad request",
    "5": "Server error",
    "400": "Bad request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not found",
    "405": "Method not allowed",
    "500": "Internal server error",
    "502": "Bad gateway"
};

const getHttpMessage = code => {
    if (code in httpErrors) return httpErrors[code];
    if (code.substr(0, 1) in httpErrors) return httpErrors[code.substr(0, 1)];
    return "Unknown error";
};

const cycleObj = obj => {
    return JSON.parse(JSON.stringify(obj));
};

axios.interceptors.request.use(
    function(config) {
        const token = Auth.getToken();
        if (token) config.data.append("jwt", token);
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function(response) {
        if (/^<br/.test(response.data)) {
            // this is an uncaught PHP error, throw it
            //   swal("Error", response.data, "error");
            throw new Error(response);
        }

        // check if the returned data is not valid json, if the expected type is json
        if (
            response.config &&
            response.config.headers &&
            response.config.headers.Accept
        ) {
            if (
                response.config.headers.Accept === "application/json" &&
                typeof response.data === "string"
            ) {
                // swal("Error", response.data, "error");
                throw new Error(response);
            }
        }

        return response;
    },
    function(error) {
        let message = "";
        if (error.response)
            message =
                error.response.data ||
                getHttpMessage(error.response.status.toString());
        else if (error.request) message = "No response";
        else message = error.message;

        // swal("Error", message, "error");
        console.log(cycleObj(error));
        return Promise.reject(error);
    }
);

const post = function(url, data, expect = "text", options = {}) {
    if (!("headers" in options)) {
        options.headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
    } else if (!("Content-Type" in options.headers)) {
        options.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    options.headers["Accept"] =
        expect === "json" ? "application/json" : "text/plain";

    let fd;
    if (data instanceof FormData) {
        fd = data;
    } else {
        fd = new FormData();
        Object.keys(data).forEach(key => fd.append(key, data[key]));
    }
    return axios.post(url, fd, options);
};

export default {
    get: axios.get,
    post: post,
    put: axios.put,
    delete: axios.delete
};
