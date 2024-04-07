<template>
<main>
    <div class="container">
        <div>
            <h2 style="color: #6d6e72;">Your created quizzes</h2>
            <div v-if="createdQuizzesIsEmpty">You have no created quizzes</div>
            <div class="contentBox" v-else>
                <div class="quizz" v-for="quiz in createdQuizzes" :key="quiz.id" @click="navigateToQuiz(quiz.id)">
                    <div class="quizzInfo">
                        <p style="font-size: 30px;">Quizz: {{ quiz.title }}</p>
                    </div>
                    
                    <div class="quizzPlay">
                        <img src="../../assets/image.png" alt="play" style="cursor: pointer;" @click="navigateToQuiz(quiz.id)">
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h2 style="color: #6d6e72;">Your co-autored quizzes</h2>
            <div v-if="coAuthorQuizzesIsEmpty" style="color: #6d6e72;">You have no co-autored quizzes</div>
            <div class="contentBox" v-else>
                <div class="quizz" v-for="quiz in coAuthorQuizzes" :key="quiz.id" @click="navigateToQuiz(quiz.id)">
                    <div class="quizzInfo">
                        <p style="font-size: 30px;">Quizz:</p>
                    </div>
                    
                    <div class="quizzPlay">
                        <img src="../../assets/image.png" alt="play" style="cursor: pointer;" @click="navigateToQuiz(quiz.id)">
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted, computed } from "vue";
import {getByUsername} from "@/api/UserController";
import {getLibrary} from "@/api/QuizController";
import { useUserInfoStore } from '@/stores/UserStore';

const userStore = useUserInfoStore();

const createdQuizzes = ref([]);
const createdQuizzesIsEmpty = ref(null);
const coAuthorQuizzes = ref([]);
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
  cursor: pointer;
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
</style>