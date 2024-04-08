import axios from "axios";
import { useUserInfoStore } from "@/stores/UserStore";

export const getSelf = () => {
    const config = {
        headers: {
            "Authorization": "Bearer " + useUserInfoStore().accessToken
        }
    };
    return axios.get("http://localhost:8080/api/users/self", config);
}

export const changeUsername = (username: string) => {
    const config = {
        headers: {
            "Authorization": "Bearer " + useUserInfoStore().accessToken
        }
    };
    return axios.put("http://localhost:8080/api/users/username/" + username, {}, config);
}

export const getByUsername = (username: string) => {
    const config = {
        headers: {
            "Authorization": "Bearer " + useUserInfoStore().accessToken
        }
    };
    return axios.get("http://localhost:8080/api/users/" + username, config);
}

export const search = (username: string) => {
    const config = {
        headers: {
            "Authorization": "Bearer " + useUserInfoStore().accessToken
        }
    };
    return axios.post("http://localhost:8080/api/users/search?username=" + username, {} ,config);
}

export const feedback = () => {
    const config = {
        headers: {
            "Authorization": "Bearer " + useUserInfoStore().accessToken
        }
    };
    return axios.get("http://localhost:8080/api/users/feedback" ,config);
}

export const sendFeedback = (email: string, message: string) => {
    const config = {
        headers: {
            "Authorization": "Bearer " + useUserInfoStore().accessToken
        }
    };
    return axios.post("http://localhost:8080/api/users/feedback", {email:email, message:message}, config);
}