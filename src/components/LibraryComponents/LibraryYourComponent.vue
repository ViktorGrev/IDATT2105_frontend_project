<template>
<main>
    <div class="container">
        <div>
            <h2 style="color: #6d6e72;">Your created quizzes</h2>
            <div v-if="createdQuizzes" class="container">
                <div v-if="createdQuizzesIsEmpty">You have no created quizzes</div>
                <div class="contentBox" v-else>
                    <div class="quizz" v-for="quiz in createdQuizzes" :key="quiz.id" @click="navigateToQuiz(quiz.id)" style="cursor: pointer;">
                        <div class="quizzInfo">
                            <p style="font-size: 30px;">Quizz: {{ quiz.title }}</p>
                        </div>
                        
                        <div class="quizzPlay">
                            <button @click="deleteThisQuiz" :class="{ 'red-button': true }">Delete</button>
                            <button :class="{ 'green-button': true }">Edit</button>
                            <img src="../../assets/image.png" alt="play" style="cursor: pointer;">
                        </div>
                    </div>
                </div>
            </div>
            <div v-else style="text-align: center; align-items:center;">
                loading
            </div>
        </div>
        <div>
            <h2 style="color: #6d6e72;">Your co-autored quizzes</h2>
            <div v-if="coAuthorQuizzes" class="container">
                <div v-if="coAuthorQuizzesIsEmpty" style="color: #6d6e72;">You have no co-autored quizzes</div>
                <div class="contentBox" v-else>
                    <div class="quizz" v-for="quiz in coAuthorQuizzes" :key="quiz.id" @click="navigateToQuiz(quiz.id)" style="cursor: pointer;">
                        <div class="quizzInfo">
                            <p style="font-size: 30px;">Quizz: {{ quiz.title }}</p>
                        </div>
                        <div class="quizzPlay">
                            <button :class="{ 'green-button': true }">Edit</button>
                            <img src="../../assets/image.png" alt="play">
                        </div>
                    </div>
                </div>
            </div>
            <div v-else style="text-align: center; align-items:center;">
                loading
            </div>
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, computed } from "vue";
import {getByUsername} from "@/api/UserController";
import { getLibrary, deleteQuiz} from "@/api/QuizController";
import { useUserInfoStore } from '@/stores/UserStore';

const userStore = useUserInfoStore();

const createdQuizzes = ref(null);
const createdQuizzesIsEmpty = ref(null);
const coAuthorQuizzes = ref(null);
const coAuthorQuizzesIsEmpty = ref(null);
const router = useRouter();

let userid = ref("");

async function fetchUserData() {
    try {
        const username = computed(() => userStore.username);
        const response = await getByUsername(username.value);
        userid.value = response.data.id; 
        fetchLibrary(); 
    } catch (error) {
        console.error("Failed to fetch user data:", error);
    }
}

async function fetchLibrary() {
    try {
        const response = await getLibrary(userid.value);

        createdQuizzes.value = response.data.created;
        if(createdQuizzes.value.length === 0) {
            createdQuizzesIsEmpty.value = 1;
            console.log("TRUE")
        }

        console.log(response.data.coAuthored)
        coAuthorQuizzes.value = response.data.coAuthored;
        if(coAuthorQuizzes.value.length === 0) {
            coAuthorQuizzesIsEmpty.value = 1;
            console.log("TRUE")
        }

    } catch (error) {
        console.error("Failed to fetch library:", error);
    }
}

// Define the navigateToQuiz method
const navigateToQuiz = (quizID) => {
    router.push({ name: 'quiz', params: { id: quizID } });
};

onMounted(fetchUserData);

const deleteThisQuiz = () => {
  deleteQuiz(playId.value).then((response) => {
    console.log(response.data);
    router.push({ name: 'home' });
  }).catch((error) => {
    console.error("Failed to fetch quiz data:", error);
  });
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  align-items: center;
}

.container {
    width: 100%;
    font-size: 25px;
    display: flex;
    flex-direction: column;
}

.contentBox {
  width: 90%;
  font-size: 25px;
  padding-top:20px;
}

.quizz {
    display: flex;
    width: 100%;
    border-radius: 1em;
    background-image: linear-gradient(90deg, rgba(245,245,245,1) 78%, rgba(22,144,248,1) 100%);
    height: 150px;
    justify-content: center;
    text-align: left;
    margin-bottom: 20px;
}

.quizz:hover {
  box-shadow: 5px 5px 5px #88888845;
}

.quizzInfo {
    flex: 0 0 50%;
  font-size: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 30px;
}

.quizzPlay {
    flex: 0 0 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.quizzPlay img {
    width: 15%;
    height: auto;
    padding-right: 40px;
}

.red-button {
  background-color: red; 
  color: #ffffff; 
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.red-button:hover {
  background-color: #cc0000;
}

/* Green Button */
.green-button {
  background-color: rgb(81, 147, 163); 
  color: #ffffff; 
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px;
  color: white;
}

.green-button:hover {
  background-color: rgb(55, 100, 112);
}
</style>