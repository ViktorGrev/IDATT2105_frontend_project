<template>
    <main>
        <div class="wrapper">
            <div class="contentBox">
                <div class="title">{{ quiz.title }}</div>
                <div class="scoreText">You answered:</div>
                <div class="scoreText">{{ score }} correct</div>
                <div class="scoreText">{{ wrong }} wrong</div>
                <div class="choiceButtons">
                    <button class="choice" id="redo" @click="again">Again</button>
                    <button class="choice" id="leave" @click="home">Leave</button>
                </div>
                <div class="content">
                    <div v-for="question in quiz.questions" :key="question.id" class="question">
                        <div class="questionText">{{ question.text }}</div>
                        <template v-if="question.type === 'FILL_IN_THE_BLANK'">
                            <p>Solution: {{ question.solution }} <img src="@/assets/icons/Check.svg"> </p>
                            <div class="userAnswer"
                                :class="{ correct: isCorrectFillInBlank(question), incorrect: !isCorrectFillInBlank(question) }">
                                Answer: {{ findAnswer(question.id) || "No answer provided" }}
                            </div>
                        </template>
                        <template v-else-if="question.type === 'MULTIPLE_CHOICE'">
                            <div v-for="option in question.options" :key="option.id" :class="{
            'correct': userSelectedOption(question.id).includes(option.id) && option.correct,
            'incorrect': userSelectedOption(question.id).includes(option.id) && !option.correct}">
                                {{ option.optionText }} 
                                <img v-if="option.correct" src="@/assets/icons/Check.svg"> 
                                    
                                
                            </div>
                            
                        </template>
                        <template v-else-if="question.type === 'TRUE_FALSE'">
                            <div
                                :class="{ correct: question.true && findAnswer(question.id), incorrect: !question.true && findAnswer(question.id) }">
                                True<img v-if="question.true" src="@/assets/icons/Check.svg"> </div>
                            <div
                                :class="{ correct: question.true && findAnswer(question.id), incorrect: question.true && findAnswer(question.id) }">
                                False<img v-if="!question.true" src="@/assets/icons/Check.svg"> </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { results } from '@/api/QuizController';

const route = useRoute();
const router = useRouter();

let quiz = ref({});
let result = ref({});
let score = ref(0);
let wrong = ref(0);
let incorrectAnswers = ref(0);

async function fetchResultData() {
    const resultId = route.params.id;
        results(resultId).then((response) => {
            result.value = response.data;
            score.value = response.data.score;
            wrong.value = response.data.quiz.questions.length - response.data.score;
            console.log(JSON.stringify(result.value, null, 2));
            quiz.value = response.data.quiz;
            console.log(userSelectedOption(1160))
        }).catch((error) => {
            console.error("Failed to fetch quiz data:", error);
        });
}

function findAnswer(questionId) {
    const answerObj = result.value.answers.find(a => a.question === questionId);
    return answerObj ? answerObj.answer : '';
}

function isCorrectFillInBlank(question) {
    const userAnswer = findAnswer(question.id);
    // Assuming that the fill-in-the-blank answers are not case-sensitive and whitespace is trimmed
    return userAnswer.trim().toLowerCase() === question.solution.trim().toLowerCase();
}

function isIncorrectAnswer(question, answer) {
    const userAnswer = findAnswer(question.id);
    // The user's answer could be false, but it should be treated as a string here for comparison.
    return userAnswer && userAnswer.toLowerCase() === answer && question.true.toString().toLowerCase() !== userAnswer.toLowerCase();
}

function userSelectedOption(questionId) : number[] {
    const answerObj = result.value.answers.find(a => a.question === questionId);
    return answerObj ? answerObj.answer : []; // Make sure this matches the ID type (string or number)
}

onMounted(fetchResultData);


function home() {
    router.push({ name: 'home' });
}

function again() {
    router.push({ name: 'quiz', params: { id: quiz.value.id } });
}
</script>



<style scoped>
.wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.contentBox {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 3rem;
}

.title {
    display: flex;
    justify-content: left;
    flex-direction: column;
    align-items: left;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 5rem;
    margin: 10px;
    color: #586380;
}

.scoreText {
    display: flex;
    justify-content: left;
    flex-direction: column;
    align-items: left;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 3rem;
    margin: 10px;
    color: #586380;
}

.score {
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 4rem;
    font-weight: 1000;
}

.choice {
    width: 11rem;
    height: 3rem;
    font-family: "Rubik", sans-serif;
    font-size: 1.3rem;
    text-transform: uppercase;
    color: #7e7f86;
    border: 0;
    background-color: #fff;
    border-radius: 2rem;
    cursor: pointer;
    margin: 1rem;
}

.choice:hover {
    border: 0.1rem solid rgb(22, 144, 248);
}




.question {
    border: 1px solid #ddd;
    padding: 20px;
    margin-top: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.questionText {
    font-size: 2rem;
    color: #333;
    margin-bottom: 15px;
}

/* Option Styling */
.question div {
    padding: 10px 20px;
    margin: 5px 0;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.correct {
    background-color: #dff0d8;
    color: #3c763d;
    border: 1px solid #d6e9c6;
}

.incorrect {
    background-color: #f2dede;
    color: #a94442;
    border: 1px solid #ebccd1;
}

/* Enhancements for Correct and Incorrect Options */
.correct:hover,
.incorrect:hover {
    opacity: 0.9;
}

/* Additional Styling for FILL_IN_THE_BLANK */
.fill-in-the-blank {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.fill-in-the-blank input[type="text"] {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    width: 70%;
}

/* Correct and Incorrect Classes for FILL_IN_THE_BLANK */
.fill-in-the-blank .correct,
.fill-in-the-blank .incorrect {
    padding: 10px;
    border-radius: 4px;
}

/* Adjusting the Correct and Incorrect Colors for Better Visibility */
.correct,
.fill-in-the-blank .correct {
    background-color: #dff0d8;
    /* Light green background */
    color: #3c763d;
    /* Dark green text */
    border: 1px solid #d6e9c6;
}

.incorrect,
.fill-in-the-blank .incorrect {
    background-color: #f2dede;
    /* Light red background */
    color: #a94442;
    /* Dark red text */
    border: 1px solid #ebccd1;
}
</style>
