<template>
    <main>
      <div class="wrapper">
        <StartHeader :title="'History'" :questions="50" :views="10" :creator="'Player 1'"/>
        <div class="contentBox">
          <div class="playBox">
            <button class="playButton" @click="navigateToTheQuiz">START QUIZ</button>
          </div>
          <div class="content">
            <div id="header">
              <h1>Ranking</h1>
            </div>
            <!-- Pass leaderboard data to the LeaderboardComponent -->
            <Leaderboard :leaderboard="leaderboard" @navigateToUserProfile="navigateToUserProfile" />
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import Leaderboard from './Leaderboard.vue';
  import StartHeader from './StartHeader.vue';
  
  const router = useRouter();
  const route = useRoute();
  
  let playId = ref(0);
  let leaderboard = ref([]);
  
  const navigateToTheQuiz = () => {
    router.push({ name: 'play', params: { id: playId.value } });
  };
  
  async function fetchQuizData() {
    const quizId = route.params.id;
    playId.value = Number(quizId);
    try {
      const response = await axios.get(`http://localhost:8080/api/quiz/${quizId}/leaderboard`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("userToken")}`
        }
      });
      leaderboard.value = response.data;
      console.log(leaderboard.value);
      console.log(JSON.stringify(leaderboard.value, null, 2));
    } catch (error) {
      console.error("Failed to fetch quiz data:", error);
    }
  }
  
  // Define the navigateToUserProfile method
  const navigateToUserProfile = (userId) => {
    console.log(userId);
    router.push({ name: 'user', params: { id: userId } });
  };
  
  onMounted(fetchQuizData);
  </script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wrapper {
    width: 60%;
    height: 100%;
    margin: 30px;
    margin-bottom: 4rem;
}

.contentBox {
    display: flex;
    flex-direction: row;
}

.content {
    width: 60%;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
}

/*playBox*/

.playBox {
    width: 40%;
    display: flex;

    align-items: start;
}

.playButton {
    background-color: white;
    color: black;
    border-radius: 10em;
    font-size: 17px;
    font-weight: 600;
    padding: 1em 2em;
    cursor: pointer;
    width: 80%;
    height: 5rem;
    transition: all 0.3s ease-in-out;
    border: 1px solid rgb(22, 144, 248);
    box-shadow: 0 0 0 0 rgb(22, 144, 248);
    margin-top: 6.7rem;
}

.playButton:hover {
    transform: translateY(-4px) translateX(-2px);
    box-shadow: 2px 5px 0 0 rgb(22, 144, 248);
}

;

.playButton:active {
    transform: translateY(2px) translateX(1px);
    box-shadow: 0 0 0 0 rgb(22, 144, 248);
}

;
</style>
