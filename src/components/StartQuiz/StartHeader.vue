<template>
    <div class="header">
      <div class="topHeader">
        <div class="title"><strong>{{ title }}</strong></div>
        <div class="amountQuestion">{{ questions }} questions</div>
        <div class="views">Average score: {{ avgScore }}</div>
        <div class="views">Difficulty: <div :style="{ color: difficultyColor }"> {{ difficulty }}</div></div>
      </div>
      <div class="bottomHeader">
        <div class="creator">Made by {{ creator }}</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  title: String,
  questions: Number,
  avgScore: String,
  difficulty: String,
  creator: String,
});

const difficultyColor = computed(() => {
  console.log(props.difficulty)
  switch (props.difficulty) {
    case 'EASY':
      return 'green';
    case 'MEDIUM':
      return 'orange';
    case 'HARD':
      return 'red';
    default:
      return '#586380';
  }
});
</script>


<style scoped>
.header {
    display: flex;
    justify-content: start;
    flex-direction: column;
    margin-right: 4rem;
    background-color: blanchedalmond;
    padding: 1rem 1rem;
    border-radius: 15px;
    border: 2px solid #586380;;
}

.topHeader {
    display: flex;
    flex-direction: row;
}

.title {
    display: flex;
    justify-content: end;
    align-items: end;
    font-family: hurme_no2-webfont, -apple-system, BlinkMacSystemFont, sans-serif;
    white-space: nowrap;
    font-weight: 700;
    font-size: 3rem;
    color: #586380;
    
}

.views {
    display: flex;
    align-items: end;
    font-family: sans-serif;
    white-space: nowrap;
    font-weight: 700;
    font-size: 1.4rem;
    margin-left: 1rem;
    color: #586380;
}

.bottomHeader {
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
}

.creator {
    display: flex;
    align-items: end;
    font-family: sans-serif;
    white-space: nowrap;
    font-weight: 700;
    font-size: 1.2rem;
    color: #586380;
}

.amountQuestion {
    display: flex;
    align-items: end;
    font-family: sans-serif;
    white-space: nowrap;
    font-weight: 700;
    font-size: 1.4rem;
    color: #586380;
    margin-left: 1rem;
}
</style>

