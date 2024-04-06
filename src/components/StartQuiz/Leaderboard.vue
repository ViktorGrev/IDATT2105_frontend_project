<template>
    <div id="leaderboard">
      <div class="ribbon"></div>
      <table>
        <tr v-for="(entry, index) in leaderboard" :key="entry.user.id">
          <td class="number">{{ index + 1 }}</td>
          <td class="name" @click="navigateToUserProfile(entry.user.id)">{{ entry.user.username }}</td>
          <td class="points" v-if="index === 0">
            {{ entry.score }}
            <div class = "medal">
                <img class="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal" />
            </div>
        </td>
        <td v-else class="points">{{ entry.score }}</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Define props to receive leaderboard data from parent
  const props = defineProps({
    leaderboard: {
      type: Array,
      required: true
    }
  });
  
  // Define method to navigate to user profile
  const navigateToUserProfile = (userId) => {
    router.push({ name: 'user', params: { id: userId } });
  };
  </script>
  
  <style scoped>
  #leaderboard {
    width: 100%;
    position: relative;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    color: #141a39;
    cursor: default;
  }
  
  tr {
    transition: all 0.2s ease-in-out;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  tr:not(:first-child):hover {
    background-color: #fff;
    transform: scale(1.1);
    -webkit-box-shadow: 0px 5px 15px 8px #e4e7fb;
    box-shadow: 0px 5px 15px 8px #e4e7fb;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:nth-child(1) {
    color: #fff;
  }
  
  td {
    height: 5rem;
    font-family: "Rubik", sans-serif;
    font-size: 1.4rem;
    padding: 1rem 2rem;
    position: relative;
  }
  
  .number {
    width: 1rem;
    font-size: 2.2rem;
    font-weight: bold;
    text-align: left;
    display: flex;
    align-items: center;
  }
  
  .name {
    font-size: 1.3rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  .points {
    font-weight: bold;
    font-size: 1.3rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  @media (max-width: 1000px) {
    .number .name .points {
      font-size: 0.5rem;
    }

    td {
      padding: 0.2rem 0.5rem;
    }
  }

  
  .points:first-child {
    width: 10rem;
  }
  
  .gold-medal {
    height: 3rem;
    margin-left: 1.5rem;
  }
  
  .ribbon {
    width: 106%;
    height: 7.5rem;
    top: -0.5rem;
    background-color: rgb(22, 144, 248);
    position: absolute;
    left: -1rem;
    -webkit-box-shadow: 0px 15px 11px -6px #7a7a7d;
    box-shadow: 0px 15px 11px -6px #7a7a7d;
  }
  
  .ribbon::before {
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    bottom: -0.8rem;
    left: 0.35rem;
    transform: rotate(45deg);
    background-color: #5c5be5;
    position: absolute;
    z-index: -1;
  }
  
  .ribbon::after {
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    bottom: -0.8rem;
    right: 0.35rem;
    transform: rotate(45deg);
    background-color: rgb(22, 144, 248);
    position: absolute;
    z-index: -1;
  }
  
  #buttons {
    width: 100%;
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  .exit {
    width: 11rem;
    height: 3rem;
    font-family: "Rubik", sans-serif;
    font-size: 1.3rem;
    text-transform: uppercase;
    color: #7e7f86;
    border: 0;
    background-color: #fff;
    border-radius: 2rem;
    cursor: pointer;
  }
  
  .exit:hover {
    border: 0.1rem solid rgb(22, 144, 248);
  }
  
  .continue {
    width: 11rem;
    height: 3rem;
    font-family: "Rubik", sans-serif;
    font-size: 1.3rem;
    color: #fff;
    text-transform: uppercase;
    background-color: rgb(22, 144, 248);
    border: 0;
    border-bottom: 0.2rem solid #3838b8;
    border-radius: 2rem;
    cursor: pointer;
  }
  
  .continue:hover {
    border-bottom: 0;
    border-bottom: white;
  }
  
  .continue:active {
    border-bottom: 0;
  }
  </style>
  