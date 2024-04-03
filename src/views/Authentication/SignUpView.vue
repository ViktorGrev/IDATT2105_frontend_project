<template>
  <main>
    <Signup></Signup>
  </main>
</template>

<script setup lang="ts">
import Signup from '../../components/Authentication/Signup.vue'
</script>

<style scoped>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: rosybrown;
  }
</style>