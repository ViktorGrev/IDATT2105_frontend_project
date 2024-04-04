<template>
    <main>
        <Menu></Menu>
        <div class="wrapper">
            <div class="contentBox">
                <div class="title">{{ quiz.title }}</div>
                <div class="scoreText">You answered:</div>
                <div class="scoreText">{{ correctAnswers }} correct</div>
                <div class="scoreText">{{ incorrectAnswers }} wrong</div>
                <div class="choiceButtons">
                    <button class="choice" id="redo" @click="again">Again</button>
                    <button class="choice" id="leave" @click="home">Leave</button>
                </div>
                <div class="content">
                    <div v-for="question in quiz.questions" :key="question.id" class="question">
                        <div class="questionText">{{ question.text }}</div>
                        <template v-if="question.type === 'FILL_IN_THE_BLANK'">
                            <div class="userAnswer"
                                :class="{ correct: isCorrectFillInBlank(question), incorrect: !isCorrectFillInBlank(question) }">
                                Answer: {{ findAnswer(question.id) || "No answer provided" }}
                                <span v-if="!isCorrectFillInBlank(question)" class="correctAnswer"> (Correct: {{
                    question.solution }})</span>
                            </div>
                        </template>
                        <template v-else-if="question.type === 'MULTIPLE_CHOICE'">
                            <div v-for="option in question.options" :key="option.id" :class="{
                    correct: option.correct,
                    incorrect: !option.correct && option.id.toString() === userSelectedOption(question.id)
                }">
                                {{ option.optionText }}
                            </div>
                        </template>
                        <template v-else-if="question.type === 'TRUE_FALSE'">
                            <div
                                :class="{ correct: question.true.toString() === 'true', incorrect: question.true.toString() !== 'true' && isIncorrectAnswer(question, 'true') }">
                                True</div>
                            <div
                                :class="{ correct: question.true.toString() === 'false', incorrect: question.true.toString() !== 'false' && isIncorrectAnswer(question, 'false') }">
                                False</div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script setup lang="ts">
import axios from 'axios';
import Menu from '../Menu.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

let quiz = ref({});
let result = ref({});
let correctAnswers = ref(0);
let incorrectAnswers = ref(0);

async function fetchResultData() {
    const resultId = route.params.id;
    try {
        const response = await axios.get(`http://localhost:8080/api/quiz/results/${resultId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        result.value = response.data;
        console.log(JSON.stringify(result.value, null, 2));
        quiz.value = response.data.quiz;

        calculateScore();
    } catch (error) {
        console.error("Failed to dddd ddd fetch quiz data:", error);
    }
}

function calculateScore() {
    correctAnswers.value = 0;
    incorrectAnswers.value = 0;

    quiz.value.questions.forEach(question => {
        const userAnswerObj = result.value.answers.find(a => a.question === question.id);
        if (userAnswerObj) {
            let isCorrect = false;
            if (question.type === 'MULTIPLE_CHOICE') {
                const correctOption = question.options.find(o => o.correct);
                isCorrect = String(correctOption.id) === userAnswerObj.answer;
            } else if (question.type === 'TRUE_FALSE') {
                isCorrect = question.true.toString().toLowerCase() === userAnswerObj.answer.toLowerCase();
            } else if (question.type === 'FILL_IN_THE_BLANK') {
                isCorrect = question.solution.toLowerCase() === userAnswerObj.answer.toLowerCase();
            }

            if (isCorrect) {
                correctAnswers.value++;
            } else {
                incorrectAnswers.value++;
            }
        } else {
            // Increment incorrectAnswers for unanswered questions
            incorrectAnswers.value++;
        }
    });
}

function isAnswered(questionId, optionId) {
    const answer = result.value.answers.find(a => a.question === questionId);
    return answer && String(answer.answer) === String(optionId);
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

// Adjust the existing isCorrectAnswer function to handle TRUE_FALSE correctly
function isCorrectAnswer(question, answer) {
    const userAnswer = findAnswer(question.id);
    // For TRUE_FALSE, 'true' value is actually a boolean true, not string 'true'.
    return question.true === (userAnswer.toLowerCase() === 'true');
}

function isIncorrectAnswer(question, answer) {
    const userAnswer = findAnswer(question.id);
    // The user's answer could be false, but it should be treated as a string here for comparison.
    return userAnswer && userAnswer.toLowerCase() === answer && question.true.toString().toLowerCase() !== userAnswer.toLowerCase();
}

function checkAnswerCorrectness(question, userAnswer) {
    if (question.type === 'TRUE_FALSE') {
        return String(question.true).toLowerCase() === userAnswer.toLowerCase();
    } else if (question.type === 'MULTIPLE_CHOICE') {
        const correctOption = question.options.find(option => option.correct);
        return String(correctOption.id) === userAnswer;
    } else if (question.type === 'FILL_IN_THE_BLANK') {
        return question.solution.toLowerCase() === userAnswer.toLowerCase();
    }
    return false;
}

function userSelectedOption(questionId) {
    const answerObj = result.value.answers.find(a => a.question === questionId);
    return answerObj ? answerObj.answer : null; // Make sure this matches the ID type (string or number)
}

onMounted(fetchResultData);


function home() {
    router.push({ name: 'home' });
}

function again() {
    router.push({ name: 'play', params: { id: quiz.value.id } });
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
