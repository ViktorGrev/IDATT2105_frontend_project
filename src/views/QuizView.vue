<script setup lang="ts">
import Menu from '../components/Menu.vue';
import QuizCard from '../components/PlayQuiz/QuizCard.vue';
</script>

<template>
    <main>
        <Menu></Menu>
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
