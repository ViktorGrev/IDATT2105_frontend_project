<template>
<div class="list" v-if="userResults">
  <div v-if="noRecentAttempts" style="color: #6d6e72;">
      You have no recently played quizzes. Try to play some quizzes!
  </div>
  <div v-else>
    Total attempts: {{ numberOfAttempts }}
    <ul>
      <li v-for="attempt in userResults" :key="attempt" @click="navigateToResult(attempt.id)">
          <span style="width: 100%;">
              <listElement>
                  <!--Changing date dynamically-->
                  <template #dateBox>
                      <p>{{ shortenTimestamp(attempt.timestamp) }}</p>
                  </template>

                  <!--Changing title dynamically-->
                  <template #titleBox>
                      <p>{{ attempt.quiz.title }}</p>
                  </template>

                  <!--Changing score dynamically-->
                  <template #scoreBox>
                      <p>{{ attempt.score }} / {{ attempt.quiz.questions.length }} </p>
                  </template>
              </listElement>
          </span>
      </li>
    </ul>
  </div>
</div>

<div v-else>
  loading...
</div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.list {
  position: relative;
  max-height: 400px;
  overflow: auto;
  width: 100%;
}
.list h2 {
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.list ul {
  position: relative;
}
.list ul li {
  position: relative;
  left: 0;
  color: black;
  list-style: none;
  margin: 4px 0;
  transition: 0.5s;
  cursor: pointer;
  box-shadow: rgba(87, 174, 250, 0.65) 0px 0px 0px 2px, rgba(87, 174, 250, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  margin: 25px;
  border-radius: 0em 0 1em 0;
  
}
.list ul li:hover {
  left: 10px;
  border-radius: 0 0 1em 0;
}
.list ul li span {
  position: relative;
  padding: 8px;
  padding-left: 12px;
  display: inline-block;
  z-index: 1;
  transition: 0.5s;
  border-radius: 0 0 1em 0;
}
.list ul li:hover span {
  color: #111;
}
.list ul li:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg, rgba(245,245,245,1) 10%, rgba(22,144,248,1) 100%);
  color: white;
  transform: scaleX(0);
  transform-origin: left;
  transition: 0.5s;
  border-radius: 0 0 1em 0;
  box-shadow: rgba(22,144,248, 0.65) 0px 0px 0px 2px, rgba(22,144,248, 0.65) 0px 4px 6px -1px, rgba(22,144,248, 0.08) 0px 1px 0px inset;
}
.list ul li:hover:before {
  transform: scaleX(1);
  border-radius: 0 0 1em 0;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import listElement from '@/components/HistoryComponents/listElementComponent.vue'
import { resultsByUserId } from '@/api/QuizController';
import { getByUsername, getSelf } from '@/api/UserController';
import { useRoute, useRouter } from 'vue-router';

const currentUserID = ref(null);
const userResults = ref(null);
const noRecentAttempts = ref(null);
const numberOfAttempts = ref("");
const route = useRoute();
const router = useRouter();
const self = ref(null);

const username = ref(route.params.username);

async function fetchSelf() {
  try {
    getSelf().then((response) => {
      self.value = response.data;
    });
  } catch (error) {
    console.error("Failed to fetch self", error);
  }
}

async function fetchUserData() {
  try {
    getByUsername(username.value).then((response) => {
      currentUserID.value = response.data.id;
      console.log(currentUserID.value); 
      fetchUserResults();
    });
  } catch (error) {
    console.error("Failed to fetch userID:", error);
  }
}

async function fetchUserResults() {
  try {
    resultsByUserId(currentUserID.value).then((response) => {
      userResults.value = response.data;
      numberOfAttempts.value = userResults.value.length;
      if (userResults.value.length === 0) {
          noRecentAttempts.value = 1;
      }
    });
  } catch (error) {
    console.error("Failed to fetch quiz results:", error);
  }
}

onMounted(fetchUserData);
onMounted(fetchSelf);

const shortenTimestamp = (timestamp: string) => {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleDateString();
};

// Define the navigateToResult method
const navigateToResult = (resultID) => {
  console.log("Noe: ");
  console.log(currentUserID.value);
  if(self.value.id === currentUserID.value) {
    router.push({ name: 'result', params: { id: resultID } });
  } else {
    console.log("Not correct userid");
  }
};
</script>