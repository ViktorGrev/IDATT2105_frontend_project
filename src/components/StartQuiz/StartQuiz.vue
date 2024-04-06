<template>
    <main>
      <div class="wrapper">
        <StartHeader :title="title" :questions="questions" :views="10" :creator="creator"/>
        <div class="contentBox">
          <div class="playBox">
            <button class="playButton" @click="navigateToTheQuiz">START QUIZ</button>
          </div>
          <div class="content">
            <div id="header">
              <button class="leaderBoardButton" @click="toggleView">{{ showLeaderboard ? 'Show Recent Attempts' : 'Show Leaderboard' }}</button>
              <h1>{{ showLeaderboard ? 'Ranking' : 'Recent Attempts' }}</h1>
            </div>
            <!-- Pass leaderboard data to the LeaderboardComponent -->
            <Leaderboard v-if="showLeaderboard" :leaderboard="leaderboardData" @navigateToUserProfile="navigateToUserProfile" />
            <!-- Assuming RecentAttempts is your component for showing recent attempts -->
            <RecentAttempts v-else :attempts="recentAttemptsData" />
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
  import RecentAttempts from './RecentAttempts.vue';
  import { leaderboard, quiz } from '@/api/QuizController';
  
  const router = useRouter();
  const route = useRoute();
  
  let playId = ref(0);
  let leaderboardData = ref([]);
  let recentAttemptsData = ref([]);
  let title = ref("Quiz Title");
  let questions = ref(0);
  let creator = ref("Player 1");
  let showLeaderboard = ref(true);
  
  const navigateToTheQuiz = () => {
    router.push({ name: 'play', params: { id: playId.value } });
  };
  
  async function fetchQuizData() {
    const quizId = route.params.id;
    playId.value = Number(quizId);
      leaderboard(quizId).then((response) => {
        leaderboardData.value = response.data;
      }).catch((error) => {
        console.error("Failed to fetch leaderboard data:", error);
      });
      quiz(quizId).then((response) => {
        console.log(response.data);
        title.value = response.data.title;
        questions.value = response.data.questions.length;
        creator.value = response.data.creator.username;
      }).catch((error) => {
        console.error("Failed to fetch quiz data:", error);
      });

    
  }
  
  const navigateToUserProfile = (userId) => {
    router.push({ name: 'user', params: { id: userId } });
  };

  const toggleView = () => {
  showLeaderboard.value = !showLeaderboard.value;
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

.playButton:active {
    transform: translateY(2px) translateX(1px);
    box-shadow: 0 0 0 0 rgb(22, 144, 248);
}

.leaderBoardButton {
  background-color: rgb(22, 144, 248);
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
}
</style>
