<template>
<div class="container">
    <div v-for="(quiz, index) in quizzes" :key="index" :class="`quizContainerV${index % 2 === 0 ? '1' : '2'}`" @click="navigateToQuiz(quiz.quiz.id)" v-if="quizzes">
      <div :class="`quizContainerV${index % 2 === 0 ? '1' : '2'}Top`">
        <!-- You can add content here if needed -->
      </div>
      <div :class="`quizContainerV${index % 2 === 0 ? '1' : '2'}Bottom`">
        <p style="font-size: 25px; margin: 0; margin-top: 5px;">{{ quiz.quiz.title }}</p>
        <p style="font-size: 15px; margin: 0; margin-top: 5px; overflow: hidden;">{{ quiz.quiz.description }}</p>
      </div>
    </div>
  <div v-else style="color: #6d6e72;">Loading</div>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { featuredQuiz } from '@/api/QuizController';

const quizzes = ref(null);
const router = useRouter();

// Function to fetch quiz data
async function fetchQuizData() {
  try {
    featuredQuiz().then((response) => {
      quizzes.value = response.data.slice(0,3);
      
    });
  } catch (error) {
    console.error("Failed to fetch quiz data:", error);
  }
}

// Fetch quiz data when component mounts
onMounted(() => {
  fetchQuizData(); 
});

// Define the navigateToUserProfile method
const navigateToQuiz = (quizId) => {
  console.log(quizId);
  router.push({ name: 'quiz', params: { id: quizId } });
};
</script>

<style scoped>
.quizContainerV1 {
    display: flex;
    border-radius: 1em;
    flex-direction: column;
    width: 33%;
    height: auto;
    min-height: 250px;
    margin: 20px;
    flex-direction: column;
    background-size: cover;
    background-image: url(@/assets/yellowFeatured.jpeg);
}

.quizContainerV1:hover {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: pointer;
}

.quizContainerV1Top {
  display: flex;
  justify-content: center;
  height: 60%;
  width: 100%;
  border-radius: 1em 1em 0 0;
}

.quizContainerV1Bottom {
  background-color: #f6e8bb;
  height: 40%;
  border-radius: 0 0 1em 1em;
  padding-left: 5%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quizContainerV2 {
    display: flex;
    border-radius: 1em;
    flex-direction: column;
    width: 33%;
    height: auto;
    min-height: 250px;
    margin: 20px;
    flex-direction: column;
    background-size: cover;
    background-color: #b19cd9;
    background-image: url(@/assets/blueFeatured.jpeg);
}

.quizContainerV2:hover {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: pointer;
}
.quizContainerV2Top {
  display: flex;
  justify-content: center;
  height: 60%;
  width: 100%;
  border-radius: 1em 1em 0 0;
}

.quizContainerV2Bottom {
  /*background-color: #ded0f9; possible color*/
  background-color: rgb(183, 215, 244);
  height: 40%;
  border-radius: 0 0 1em 1em;
  padding-left: 5%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container {
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    flex-direction: row;
    justify-content: center;
}
</style>