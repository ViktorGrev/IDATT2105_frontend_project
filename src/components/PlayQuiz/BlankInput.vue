<template>
  <input type="text" :value="userInput" @input="updateUserInput($event.target.value)" placeholder="Enter your answer">
</template>

<script setup>
import { inject, computed } from 'vue';

const props = defineProps({
  questionIndex: Number
});
const userInputs = inject('userInputs');

const userInput = computed({
  get: () => userInputs[props.questionIndex],
  set: (value) => { userInputs[props.questionIndex] = value; }
});

function updateUserInput(value) {
  console.log(value); // This will log the value to the console whenever the input changes
  userInput.value = value; // This updates the userInput reactive property
}
</script>
