<template>
  <input type="text" v-model="userInput" placeholder="Enter your answer">
</template>

<script setup lang="ts">
import { defineProps, inject, computed } from 'vue';

const props = defineProps({
  questionIndex: Number
});
const userInputs = inject('userInputs');

const userInput = computed({
  get: () => userInputs.value[props.questionIndex],
  set: (value) => { userInputs.value[props.questionIndex] = value; }
});
</script>