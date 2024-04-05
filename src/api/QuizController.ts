import axios from "axios";

export const login = (username, password) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return axios.post("http://localhost:8080/api/auth/login",
    JSON.stringify({ username, password }), config);
}
