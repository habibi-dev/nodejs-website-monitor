import axios, {AxiosError} from "axios";
import ErrorModel from "../Interfaces/Error/ErrorModel";

export default class RequestHandler {

    static init() {
        // set token in login
        // if (UserRepository.isLogin())
        //     axios.defaults.headers.common['auth-token'] = UserRepository.token();

        // axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
        // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    static async get(url: string, params: object = {}) {
        this.init()
        try {
            const response = await axios.get(url, params);
            return response.data
        } catch (error: AxiosError | any) {
            // Load Error Handler
            return this.errorHandler(error);
        }
    }

    static async post(url: string, data: object = {}) {
        this.init()
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data
        } catch (error: AxiosError | any) {
            // Load Error Handler
            return this.errorHandler(error);
        }
    }

    static async delete(url: string, params: object = {}) {
        this.init()
        try {
            const response = await axios.delete(url, params);
            return response.data
        } catch (error: AxiosError | any) {
            // Load Error Handler
            return this.errorHandler(error);
        }
    }

    private static errorHandler(error: AxiosError | any): ErrorModel {
        // // Check auth
        // if (error.response && error.response.hasOwnProperty('status') && error.response.status === 401) {
        //     if (UserRepository.isLogin()) {
        //         Toast.error("نشست منقضی شده.")
        //         UserRepository.logout().then(() => setTimeout(() => GoTo("/"), 2000))
        //     }
        // }

        switch (error.code) {
            case "ERR_NETWORK":
                return {
                    status: false,
                    message: "Network error occurred. Please check your connection and try again."
                };
            case "404":
                return {
                    status: false,
                    message: "Requested resource not found."
                };
            case "500":
                return {
                    status: false,
                    message: "Internal server error. Please try again later."
                };
            default:
                return {
                    status: false,
                    message: error.response?.data?.message || "An unknown error occurred."
                };
        }
    }
}