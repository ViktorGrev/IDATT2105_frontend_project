import axios from "axios";
import { useUserInfoStore } from "@/stores/UserStore";

const userStore = useUserInfoStore();

export const create = (quiz: any) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      'Authorization ': "Bearer " + userStore.accessToken
    },
  };
  return axios.post("http://localhost:8080/api/quiz",
    quiz, config);
}

export const leaderboard = (id: number) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        'Authorization': "Bearer " + userStore.accessToken
      },
    };
    return axios.get("http://localhost:8080/api/quiz/" + id + "/leaderboard", config);
}

export const quiz = (id: number) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        'Authorization': "Bearer " + userStore.accessToken
      },
    };
    return axios.get('http://localhost:8080/api/quiz/' + id, config);
}

export const answers = (id: number, answers: any) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        'Authorization': "Bearer " + userStore.accessToken
      },
    };
    return axios.post('http://localhost:8080/api/quiz/' + id + '/answers', answers, config);
}

export const results = (id: number) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        'Authorization': "Bearer " + userStore.accessToken
      },
    };
    return axios.get('http://localhost:8080/api/quiz/results/' + id, config);
}

export const resultsByUserId = (userid) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      'Authorization': "Bearer " + sessionStorage.getItem("userToken")
    },
  };
  return axios.get('http://localhost:8080/api/quiz/results/users/' + userid, config);
}

export const featuredQuiz = () => {
  const config = {
    headers: {
      "Content-type": "application/json",
      'Authorization': "Bearer " + sessionStorage.getItem("userToken")
    },
  };
  return axios.get('http://localhost:8080/api/quiz/featured', config);
}