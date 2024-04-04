<script setup lang="ts">
import QuizCard from '../../components/PlayQuiz/QuizCard.vue';
</script>

<template>
    <main>
        <div class="wrapper">
            <QuizCard></QuizCard>
        </div>
    </main>
</template>

<style scoped>
    .wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
