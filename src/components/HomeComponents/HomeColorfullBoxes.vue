<template>
<div class="container">
    <div class="quizContainerV1" v-if="quizzInfo" @click="navigateToUserProfile(quizzInfo.id)">
        <div class="quizContainerV1Top">
        </div>
        <div class="quizContainerV1Bottom" id="testId">
          <p style="font-size: 25px; margin: 0; margin-top: 5px;"> {{ quizzInfo.title }} </p>
          <p style="font-size: 15px; margin: 0; margin-top: 5px; overflow: hidden;">{{ quizzInfo.description }}</p>
        </div>
    </div>
    <div v-else>
      <div class="quizContainerV1Top"></div>
      <div class="quizContainerV1Bottom"></div>
    </div>
    <div class="quizContainerV2" v-if="quizzInfo" @click="navigateToUserProfile(quizzInfo.id)">
      <div class="quizContainerV2Top">
                 
      </div>
      <div class="quizContainerV2Bottom">
        <p style="font-size: 25px; margin: 0; margin-top: 5px;"> {{ quizzInfo.title }} </p>
        <p style="font-size: 15px; margin: 0; margin-top: 5px; overflow: hidden;">{{ quizzInfo.description }}</p>
      </div>
    </div>
    <div v-else>
      <div class="quizContainerV1Top"></div>
      <div class="quizContainerV1Bottom"></div>
    </div>
    <div class="quizContainerV1" v-if="quizzInfo" @click="navigateToUserProfile(quizzInfo.id)">
        <div class="quizContainerV1Top">
        </div>
        <div class="quizContainerV1Bottom">
          <p style="font-size: 25px; margin: 0; margin-top: 5px;"> {{ quizzInfo.title }} </p>
          <p style="font-size: 15px; margin: 0; margin-top: 5px; overflow: hidden;">{{ quizzInfo.description }}</p>
        </div>
    </div>
    <div v-else>
      <div class="quizContainerV1Top"></div>
      <div class="quizContainerV1Bottom"></div>
    </div>
</div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let quizzInfo = ref(null);
const router = useRouter();

// Function to fetch quiz data
async function fetchQuizData() {
  try {
    const response = await axios.get('http://localhost:8080/api/quiz/1', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization ': "Bearer " + sessionStorage.getItem("userToken")
      }
    });
    quizzInfo.value = response.data;
  } catch (error) {
    console.error("Failed to fetch quiz data:", error);
  }
}

// Fetch quiz data when component mounts
onMounted(() => {
  fetchQuizData(); 
});

// Define the navigateToUserProfile method
const navigateToUserProfile = (userId) => {
        console.log(userId);
        router.push({ name: 'quiz', params: { id: userId } });
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
    background-image: url(https://th.bing.com/th/id/OIG4.MXst0.sxtmlF.FpwLjMa?w=1024&h=1024&rs=1&pid=ImgDetMain);
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
    background-image: url(https://th.bing.com/th/id/OIG4.r07g3Q8hC2tCHD2hnzTv?w=1024&h=1024&rs=1&pid=ImgDetMain);
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