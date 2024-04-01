<template>
    <div>
      <div class="title">
        <h1>{{ quiz.title }}</h1>
      </div>
      <form @submit.prevent="submitQuiz">
        <div class="card" v-for="(question, index) in quiz.questions" :key="index">
          <div class="card-header">
            <h2>{{ question.text }}</h2>
            <h3>{{ index + 1 }} / {{ quiz.questions.length }}</h3>
          </div>
          <div class="card-body">
            <h3>Choose an answer</h3>
            <div class="answers">
              <MultipleChoiceButton
                v-if="question.type === 'MULTIPLECHOICE'"
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
                :optionText="option.optionText"
                :optionIndex="optionIndex"
                :isSelected="selectedAnswers[index] === optionIndex"
                @select="selectAnswer(index, optionIndex)"
              />
              <div v-if="question.type === 'TRUEFALSE'">
                <TFButton
                  :value="true"
                  :isSelected="selectedAnswers[index] === true"
                  @select="selectAnswer(index, true)"
                />
                <TFButton
                  :value="false"
                  :isSelected="selectedAnswers[index] === false"
                  @select="selectAnswer(index, false)"
                />
              </div>
              <BlankInput
                v-if="question.type === 'FILLINBLANK'"
                :questionIndex="index"
              />
            </div>
          </div>
        </div>
        <button type="submit" class="submit-btn">Submit Quiz</button>
      </form>
    </div>
  </template>

<script setup lang="ts">
import { ref, reactive, provide } from 'vue';
import MultipleChoiceButton from './MultipleChoiceButton.vue';
import TFButton from './TFButton.vue';
import BlankInput from './BlankInput.vue';

let quiz = reactive({
  "id": 1, // Quiz ID
  "title": "Sample Quiz",
  "category": "Art",
  "description": "This is a simple quiz to test your knowledge",
  "tags": [
    "Geography",
    "General Knowledge"
  ],
  "random": true,
  "questions": [
    {
      "id": 7, // Question ID
      "text": "What is the capital of France?",
      "type": "MULTIPLECHOICE",
      "options": [
        {
          "id": 1, // Option ID
          "optionText": "Paris",
          "correct": true
        },
        {
          "id": 2,
          "optionText": "Berlin",
          "correct": false
        },
        {
          "id": 3,
          "optionText": "Rome",
          "correct": false
        },
        {
          "id": 4,
          "optionText": "Madrid",
          "correct": false
        }
      ]
    },
    {
      "id": 8, // Question ID
      "text": "The sky is blue.",
      "type": "TRUEFALSE",
      "true": true
    },
    {
      "id": 9, // Question ID
      "text": "___ is the chemical symbol for gold.",
      "type": "FILLINBLANK",
      "solution": "Au"
    },
    // Add more questions with unique IDs and their options/solutions if necessary
  ]
});

let selectedAnswers = reactive(quiz.questions.map(() => null));
let userInputs = reactive(new Array(quiz.questions.length).fill(''));
provide('userInputs', userInputs);
let quizCompleted = ref(false);

function submitQuiz() {
  let results = {
    "id": quiz.id, // Quiz ID
    "answers": quiz.questions.map((question, index) => {
      let answer = null;

      if (question.type === 'MULTIPLECHOICE') {
        answer = question.options[selectedAnswers[index]]?.id; // Option ID
      } else if (question.type === 'TRUEFALSE') {
        answer = selectedAnswers[index]; // Boolean value
      } else if (question.type === 'FILLINBLANK') {
        answer = userInputs[index].trim(); // User's input text
      }

      return {
        "id": question.id, // Question ID
        "answer": answer // Answer
      };
    })
  };

  quizCompleted.value = true;
  console.log(results); // Typically, send `results` to a server or elsewhere.
}

function selectAnswer(questionIndex, optionIndex) {
  selectedAnswers[questionIndex] = optionIndex;
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
</style>
