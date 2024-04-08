<script setup lang="ts">
import history from '@/components/HistoryComponents/history.vue';
import HomeColorfullBoxes from '@/components/HomeComponents/HomeColorfullBoxes.vue';
import HomeNavlinks from '@/components/HomeComponents/HomeNav-linksComponent.vue';
</script>

<template>
  <main>
    <div class="header">
      
    </div>
    <div class="contentBox">
      <div id="quizID">
        <div id="recent">
          <h2 style="color: #6d6e72;">Recent quizzes played</h2>
          <history></history>
        </div>
        
        <div id="topContent">
          <h2 style="color: #6d6e72;">Featured quizzes</h2>
          <HomeColorfullBoxes></HomeColorfullBoxes>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  scroll-behavior: smooth;
  font-family: 'Poppins', sans-serif;
}

.header {
  font-size: 30px;
  margin: 30px;
  max-width: 100%;
}
.contentBox {
  width: 90%;
  font-size: 25px;
}
</style>