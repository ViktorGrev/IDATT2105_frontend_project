<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
</script>

<template>
  <main>
    <div>
      <RouterView />
    </div>
    <Footer></Footer>
  </main>
</template>

<style>
  body {
    margin: 0px;
    padding: 0px;
    background-color: #edeff4;
  }
</style>