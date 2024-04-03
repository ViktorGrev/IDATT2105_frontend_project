<template>
  <div v-if="quiz">
    <div class="title">
      <h1>{{ quiz.title }}</h1>
    </div>
    <form @submit.prevent="submitQuiz">
      <div class="card" v-for="(question, index) in quiz.questions" :key="index" :data-index="index">
        <div class="card-header">
          <h2>{{ question.text }}</h2>
          <h3>{{ index + 1 }} / {{ quiz.questions.length }}</h3>
        </div>
        <div class="card-body">
          <h3>Choose an answer</h3>
          <div class="answers">
            <MultipleChoiceButton v-if="question.type === 'MULTIPLE_CHOICE'"
              v-for="(option, optionIndex) in question.options" :key="optionIndex" :optionText="option.optionText"
              :optionIndex="optionIndex" :isSelected="selectedAnswers[index] === optionIndex"
              @select="selectAnswer(index, optionIndex)" />
            <div v-if="question.type === 'TRUE_FALSE'">
              <TFButton :value="true" :isSelected="selectedAnswers[index] === true"
                @select="selectAnswer(index, true)" />
              <TFButton :value="false" :isSelected="selectedAnswers[index] === false"
                @select="selectAnswer(index, false)" />
            </div>
            <BlankInput v-if="question.type === 'FILL_IN_THE_BLANK'" :questionIndex="index" />
          </div>
          <button @click="skipQuestion(index)" class="skip-btn" type="button">Don't know?</button>
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
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref, reactive, onMounted, provide, nextTick } from 'vue';
import MultipleChoiceButton from './MultipleChoiceButton.vue';
import TFButton from './TFButton.vue';
import BlankInput from './BlankInput.vue';

let quiz = ref(null); // Use `ref` for async data
let selectedAnswers = ref([]);
let userInputs = ref([]);
provide('userInputs', userInputs);

let quizCompleted = ref(false);

const route = useRoute();

let qId = ref(0);


// Function to fetch quiz data
async function fetchQuizData() {
  const quizId = route.params.id;
  qId = quizId;
  try {
    const response = await axios.get('http://localhost:8080/api/quiz/' + quizId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization ': "Bearer " + sessionStorage.getItem("userToken")
      }
    });
    quiz.value = response.data;
    console.log(JSON.stringify(quiz.value, null, 2));
    selectedAnswers.value = quiz.value.questions.map(() => null);
    userInputs.value = new Array(quiz.value.questions.length).fill('');
  } catch (error) {
    console.error("Failed to fetch quiz data:", error);
  }
}

// Fetch quiz data when component mounts
onMounted(() => {
  fetchQuizData(); // Fetch quiz with ID 10
});

async function submitQuiz() {
  let results = {
  "answers": quiz.value.questions.map((question, index) => {
      let answer = null;

      if (question.type === 'MULTIPLE_CHOICE') {
        if (selectedAnswers.value[index] !== null) {
          const selectedOption = question.options[selectedAnswers.value[index]];
          answer = selectedOption ? selectedOption.id : null; // Adjust according to what needs to be submitted
        }
      } else if (question.type === 'TRUE_FALSE') {
        // TRUE_FALSE selections are directly the boolean value
        answer = selectedAnswers.value[index] !== null ? selectedAnswers.value[index] : null;
      } else if (question.type === 'FILL_IN_THE_BLANK') {
        // Directly use userInputs without filtering for empty, as we already filter for non-empty answers below
        answer = userInputs.value[index] && userInputs.value[index].trim() !== '' ? userInputs.value[index].trim() : null;
      }

      return {
        "question": question.id,
        "answer": answer // Answer, null if unanswered, or undefined if not applicable
      };
    }).filter(answer => answer.answer !== null && answer.answer !== undefined) // Filter out unanswered questions
  };

  quizCompleted.value = true;
  console.log(results.answers);
  const response = await axios.post('http://localhost:8080/api/quiz/' + qId + '/answers',
    results.answers, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization ': "Bearer " + sessionStorage.getItem("userToken")
      }
    });
    console.log(response.data);

   // Typically, send `results` to a server or elsewhere.
}


function selectAnswer(questionIndex, optionIndex) {
  selectedAnswers.value[questionIndex] = optionIndex;
  selectedAnswers.value = [...selectedAnswers.value];
  scrollToNextQuestion(questionIndex);
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

function skipQuestion(index) {
  // Unmark the selected answer for the current question
  selectedAnswers.value[index] = null;
  userInputs.value[index] = ''; // Clear user input if it's a fill-in-the-blank question
  // Scroll to the next question
  scrollToNextQuestion(index);
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