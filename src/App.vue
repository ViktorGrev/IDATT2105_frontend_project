<script setup lang="ts">
import BasePage from './components/BaseComponents/BasePage.vue'
import { RouterView } from 'vue-router';
</script>

<template>
  <main>
      <RouterView></RouterView>
  </main>
</template>

<style>
* {
  font-family: 'Segoe UI', sans-serif;
}

body {
  margin: 0px;
  padding: 0px;
  background-color: #edeff4;
}
</style>