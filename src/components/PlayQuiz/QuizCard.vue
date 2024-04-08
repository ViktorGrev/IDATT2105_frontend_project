<template>
  <div v-if="quizData">
    <div class="title">
      <h1>{{ quizData.title }}</h1>
    </div>
    <form @submit.prevent="submitQuiz">
      <div class="card" v-for="(question, index) in quizData.questions" :key="index" :data-index="index">
        <div class="card-header">
          <h2>{{ question.text }}</h2>
          <h3>{{ index + 1 }} / {{ quizData.questions.length }}</h3>
        </div>
        <div class="card-body">
          <h3>Choose an answer</h3>
          <div class="answers">
            <MultipleChoiceButton v-if="question.type === 'MULTIPLE_CHOICE'"
              v-for="(option, optionIndex) in question.options" :key="optionIndex" :optionText="option.optionText"
              :optionIndex="optionIndex" :isSelected="selectedAnswers[index].includes(optionIndex)"
              @select="selectAnswer(index, optionIndex)" />
            <div v-if="question.type === 'TRUE_FALSE'">
              <TFButton :value="true" :isSelected="selectedAnswers[index] === true"
                @select="selectAnswer(index, true)" />
              <TFButton :value="false" :isSelected="selectedAnswers[index] === false"
                @select="selectAnswer(index, false)" />
            </div>
            <BlankInput v-if="question.type === 'FILL_IN_THE_BLANK'" :questionIndex="index" />
          </div>
        </div>
      </div>
      <button type="submit" class="submit-btn">Submit Quiz</button>
    </form>
  </div>
  <div v-else>
    Loading quiz...
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, onMounted, provide, nextTick } from 'vue';
import MultipleChoiceButton from './MultipleChoiceButton.vue';
import TFButton from './TFButton.vue';
import BlankInput from './BlankInput.vue';
import { quiz, answers } from '@/api/QuizController';

let quizData = ref(null);
let selectedAnswers = ref([]);
let userInputs = ref([]);
let quizCompleted = ref(false);

provide('userInputs', userInputs);

const route = useRoute();
const router = useRouter();

const qId = ref(0);

function shuffleArray<T>(array: T[]): T[] {
    const newArray = array.slice(); 

    // Fisher-Yates shuffle algorithm
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
}

async function fetchQuizData() {
  const quizId = route.params.id;
  qId.value = quizId;
  quiz(quizId).then((response) => {
    quizData.value = response.data;
    if(quizData.value.random) {
      quizData.value.questions = shuffleArray(quizData.value.questions);
    }
    // Initialize selectedAnswers with arrays for multiple choice questions
    selectedAnswers.value = quizData.value.questions.map(question => question.type === 'MULTIPLE_CHOICE' ? [] : null);
    userInputs.value = new Array(quizData.value.questions.length).fill('');
  }).catch((error) => {
    console.error("Failed to fetch quiz data:", error);
  });
}

onMounted(fetchQuizData);

async function submitQuiz() {
  let results = {
    "answers": quizData.value.questions.map((question, index) => {
      let answer = null;

      if (question.type === 'MULTIPLE_CHOICE') {
        // For multiple choice, gather all selected option IDs
        answer = selectedAnswers.value[index] && selectedAnswers.value[index].length > 0
          ? selectedAnswers.value[index].map(optionIndex => question.options[optionIndex].id)
          : null;
      } else if (question.type === 'TRUE_FALSE') {
        // TRUE_FALSE selections are directly the boolean value
        answer = selectedAnswers.value[index] !== null ? selectedAnswers.value[index] : null;
      } else if (question.type === 'FILL_IN_THE_BLANK') {
        // Directly use userInputs for FILL_IN_THE_BLANK
        answer = userInputs.value[index] && userInputs.value[index].trim() !== '' ? userInputs.value[index].trim() : null;
      }

      return {
        "question": question.id,
        "answer": answer 
      };
    }).filter(answer => answer.answer !== null && answer.answer !== undefined) 
  };

  quizCompleted.value = true;
  answers(qId.value, results.answers).then((response) => {
    router.push({ name: 'result', params: { id: response.data.id } });
  }).catch((error) => {
    console.error("Failed to submit quiz:", error);
  });
}


function selectAnswer(questionIndex, optionIndex) {
  if (quizData.value.questions[questionIndex].type === 'MULTIPLE_CHOICE') {
    // Toggle optionIndex in selectedAnswers for the question
    const currentIndex = selectedAnswers.value[questionIndex].indexOf(optionIndex);
    if (currentIndex === -1) {
      selectedAnswers.value[questionIndex].push(optionIndex);
    } else {
      selectedAnswers.value[questionIndex].splice(currentIndex, 1);
    }
  } else {
    selectedAnswers.value[questionIndex] = optionIndex;
  }
  // Trigger reactivity
  selectedAnswers.value = [...selectedAnswers.value];
}

function scrollToNextQuestion(index) {
  nextTick().then(() => {
    // Increment index to target the next question
    const nextIndex = index + 1; // Correctly increment the index here
    // Use a query selector to find the next question card based on the data-index attribute
    const nextQuestionCard = document.querySelector(`.card[data-index="${nextIndex}"]`);
    if (nextQuestionCard) {
      nextQuestionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}


</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #586380;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: #586380;
}

.card-header h2 {
  text-wrap: wrap;
  margin-right: 1rem;
}

.card-body {
  color: #586380;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.card {
  border: 2px solid #e0e6ed;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: white;
  max-width: 700px;
}

.answers {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.submit-btn {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: rgb(44, 190, 44);
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-bottom: 4rem;
}

.submit-btn:hover {
  background-color: #e7e7e7;
}

.submit-btn:focus {
  outline: none;
}

.skip-btn {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f9fa;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-top: 10px;
}

.skip-btn:hover {
  background-color: #e2e6ea;
}

.skip-btn:focus {
  outline: none;
}
</style>