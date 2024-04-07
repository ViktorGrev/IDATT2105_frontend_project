import axios from "axios";

export const create = (quiz) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      'Authorization ': "Bearer " + sessionStorage.getItem("userToken")
    },
  };
  return axios.post("http://localhost:8080/api/quiz",
    quiz, config);
}

export const leaderboard = (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        'Authorization': "Bearer " + sessionStorage.getItem("userToken")
      },
    };
    return axios.get("http://localhost:8080/api/quiz/" + id + "/leaderboard", config);
}

export const quiz = (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        'Authorization': "Bearer " + sessionStorage.getItem("userToken")
      },
    };
    return axios.get('http://localhost:8080/api/quiz/' + id, config);
}

export const answers = (id, answers) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        'Authorization': "Bearer " + sessionStorage.getItem("userToken")
      },
    };
    return axios.post('http://localhost:8080/api/quiz/' + id + '/answers', answers, config);
}

export const results = (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
        'Authorization': "Bearer " + sessionStorage.getItem("userToken")
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