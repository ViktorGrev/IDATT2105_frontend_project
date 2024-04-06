<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Footer from './Footer.vue'
import Menu from './Menu.vue'
</script>

<template>
  <main>
    <Menu></Menu>
    <div>
      <RouterView />
    </div>
    <Footer></Footer>
  </main>
</template>