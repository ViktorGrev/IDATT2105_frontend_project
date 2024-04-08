<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { feedback } from '@/api/UserController';

let feedbackData = ref([]);

async function fetchQuizData() {
    feedback().then((response) => {
        feedbackData.value = response.data;
    }).catch((error) => {
        console.error("Failed to fetch feedback data:", error); // Corrected the error message
    });
}

onMounted(fetchQuizData);
</script>

<template>
    <main>
        <div class="box">
            <div class="header"></div>
            <!-- Fixed v-for usage -->
            <div class="feedbackBox" v-for="feedback in feedbackData" :key="feedback.id"> <!-- Assuming each feedback has a unique 'id' -->
                <div class="name">
                    {{ feedback.sender.username }}
                </div>
                <div class="email">
                    {{ feedback.email }}
                </div>
                <div class="feedback">
                    {{ feedback.message }}
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.header {
    font-size: 4rem;
    font-weight: 700;
}

.feedbackBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 2px solid gray; /* Adjusted for consistency */
    margin-bottom: 1rem;
}

.name, .email { /* Corrected selector for applying styles correctly */
    width: 100%;
}

.feedback {
    width: 100%;
    text-wrap: wrap; /* 'text-wrap' is not a valid CSS property, you might want 'word-wrap: break-word;' or 'overflow-wrap: break-word;' */
}
</style>
