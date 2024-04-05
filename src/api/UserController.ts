import axios from "axios";

export const getSelf = () => {
    const config = {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("userToken")
        }
    };
    return axios.get("http://localhost:8080/api/users/self", config);
}

export const changeUsername = (username: string) => {
    const config = {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("userToken")
        }
    };
    return axios.put("http://localhost:8080/api/users/username/" + username, {}, config);
}