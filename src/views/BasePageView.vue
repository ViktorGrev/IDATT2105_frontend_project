<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Footer from '@/components/BaseComponents/Footer.vue'
import Menu from '@/components/BaseComponents/Menu.vue'
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