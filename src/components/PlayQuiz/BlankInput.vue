<template>
  <input type="text" v-model="userInput" placeholder="Enter your answer">
</template>

<script setup>
import { defineProps, inject, computed } from 'vue';

const props = defineProps({
  questionIndex: Number
});
const userInputs = inject('userInputs');

const userInput = computed({
  get: () => userInputs[props.questionIndex],
  set: (value) => { userInputs[props.questionIndex] = value; }
});
</script>
