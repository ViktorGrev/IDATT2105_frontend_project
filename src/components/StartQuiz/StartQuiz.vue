<template>
  <main>
    <div class="wrapper">
      <StartHeader :title="title" :questions="questions" :avgScore="avgScore" :difficulty="difficultylvl"
        :creator="creator" />
      <div class="contentBox">
        <div class="playBox">
          <div v-if="role === 'ADMIN' || username === creator">
            <button id="delete" @click="deleteThisQuiz"><img src="@/assets/icons/delete.svg">Delete quiz</button>

          </div>
          <div v-if="role === 'ADMIN' || username === creator || coAuthors.some(a => a.username === username)">
            <button id="edit"><img src="@/assets/icons/edit.svg">Edit quiz</button>
          </div>
          <button class="playButton" @click="navigateToTheQuiz">Play Quiz</button>
        </div>
        <div class="content">
          <div id="leaderboard">
            <h1>Ranking</h1>
            <Leaderboard :leaderboard="leaderboardData" @navigateToUserProfile="navigateToUserProfile" />
          </div>
          <div id="recent">
            <h1>Recent Attepts</h1>
            <RecentAttempts :attempts="recentAttemptsData" />
          </div>
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
import { leaderboard, quiz, difficulty, deleteQuiz } from '@/api/QuizController';
import { useUserInfoStore } from '@/stores/UserStore';

const router = useRouter();
const route = useRoute();

let playId = ref(0);
let leaderboardData = ref([]);
let recentAttemptsData = ref([]);
let title = ref("Quiz Title");
let questions = ref(0);
let creator = ref("");
let coAuthors = ref([]);
let avgScore = ref("");
let difficultylvl = ref("");
let showLeaderboard = ref(true);
let role = useUserInfoStore().role;
let username = useUserInfoStore().username;

const navigateToTheQuiz = () => {
  router.push({ name: 'play', params: { id: playId.value } });
};

async function fetchQuizData() {
  const quizId = Number(route.params.id);
  playId.value = Number(quizId);
  leaderboard(quizId).then((response) => {
    leaderboardData.value = response.data.slice(0, 10);
  }).catch((error) => {
    console.error("Failed to fetch leaderboard data:", error);
  });
  quiz(quizId).then((response) => {
    console.log(response.data);
    title.value = response.data.title;
    questions.value = response.data.questions.length;
    creator.value = response.data.creator.username;
    coAuthors.value = response.data.coAuthors;
  }).catch((error) => {
    console.error("Failed to fetch quiz data:", error);
  });
  difficulty(quizId).then((response) => {
    console.log(response.data);
    avgScore.value = response.data.averageScore.toFixed(1);
    console.log(avgScore.value);
    difficultylvl.value = response.data.level;
  }).catch((error) => {
    console.error("Failed to fetch quiz data:", error);
  });
}

const navigateToUserProfile = (userId: number) => {
  router.push({ name: 'user', params: { id: userId } });
};

const deleteThisQuiz = () => {
  deleteQuiz(playId.value).then((response) => {
    console.log(response.data);
    router.push({ name: 'home' });
  }).catch((error) => {
    console.error("Failed to fetch quiz data:", error);
  });
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
  margin-bottom: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 10000px) {
  .wrapper {
    width: 80%;
  }

}

@media (max-width: 800px) {
  .wrapper {
    width: 90%;
  }

}

.contentBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  justify-content: center;
  align-items: start;
}

/*playBox*/

.playBox {
  width: 40%;
  display: flex;
  align-items: start;
  flex-direction: column;
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
  margin-top: 2rem;
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

#leaderboard {
  width: 80%;
}

#recent {
  width: 70%;
  display: flex;
  flex-direction: column;
}

#delete {
  background-color: red;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  color: white;
}

#edit {
  background-color: rgb(81, 147, 163);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  color: white;
}
</style>
