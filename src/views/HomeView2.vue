<script setup lang="ts">
import Menu from '../components/Menu.vue';
import history from '@/components/history.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

let quizzInfo = ref(null);

// Function to fetch quiz data
async function fetchQuizData() {
  try {
    const response = await axios.get('http://localhost:8080/api/quiz/1', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization ': "Bearer " + sessionStorage.getItem("userToken")
      }
    });
    quizzInfo.value = response.data;
  } catch (error) {
    console.error("Failed to fetch quiz data:", error);
  }
}

// Fetch quiz data when component mounts
onMounted(() => {
  fetchQuizData(); 
});
</script>

<template>
  <main>
    <Menu></Menu>
    <div class="header">
      Rizzlet
    </div>
    <div>
      <ul class="nav-links">
        <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
        <li><a href="#recent">Recent</a></li>
        <li><a href="#topContent">Top 10</a></li>
        <li><a href="#triviumContent">Trivium verified</a></li>
        <li><a href="#idatt2105Content">IDATT2105</a></li>
      </ul>
    </div>
    <div class="contentBox">
      <div id="quizID">
        <div id="recent">
          <h2 style="color: #586380;">Recent quizz attemps</h2>
          <history></history>
        </div>
        
        <div id="topContent">
          <h2 style="color: #586380;">Top 10 quizzes</h2>
          <history></history>
        </div>
        
        <div id="triviumContent">
          <h2 style="color: #586380;">Trivium verified</h2>
          <div class="container">
            <div class="quizContainerV1" v-if="quizzInfo">
              <div class="quizContainerV1Top">

              </div>
              <div class="quizContainerV1Bottom">
                <p style="font-size: 25px; margin: 0; margin-top: 5px;"> {{ quizzInfo.title }} </p>
                <p style="font-size: 15px; margin: 0; margin-top: 5px; overflow: hidden;">{{ quizzInfo.description }}</p>
              </div>
            </div>
            <div v-else>
              <div class="quizContainerV1Top">

              </div>
              <div class="quizContainerV1Bottom">
                
              </div>
            </div>
            <div class="quizContainerV2" v-if="quizzInfo">
              <div class="quizContainerV2Top">

              </div>
              <div class="quizContainerV2Bottom">
                <p style="font-size: 25px; margin: 0; margin-top: 5px;"> {{ quizzInfo.title }} </p>
                <p style="font-size: 15px; margin: 0; margin-top: 5px; overflow: hidden;">{{ quizzInfo.description }}</p>
              </div>
            </div>
            <div v-else>
              <div class="quizContainerV1Top">

              </div>
              <div class="quizContainerV1Bottom">
                
              </div>
            </div>
            <div class="quizContainerV1" v-if="quizzInfo">
              <div class="quizContainerV1Top">

              </div>
              <div class="quizContainerV1Bottom">
                <p style="font-size: 25px; margin: 0; margin-top: 5px;"> {{ quizzInfo.title }} </p>
                <p style="font-size: 15px; margin: 0; margin-top: 5px; overflow: hidden;">{{ quizzInfo.description }}</p>
              </div>
            </div>
            <div v-else>
              <div class="quizContainerV1Top">

              </div>
              <div class="quizContainerV1Bottom">
                
              </div>
            </div>
          </div>
        </div>
        <div id="idatt2105Content">
          <h2 style="color: #586380;">IDATT2105</h2>
          
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
  font-size: 50px;
  margin: 30px;
  max-width: 100%;
}

.nav-links {
  display: inline-flex;
}

.nav-links li {
  list-style: none;
}

.nav-links li a {
  color: #000000;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 9px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.nav-links li a:hover {
  background: rgb(87, 174, 250);
}

.contentBox {
  width: 90%;
  font-size: 25px;
}

#contentSpace {
  width: 10%;
}

#space {
  height: 1000px;
}

.container {
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    flex-direction: row;
    justify-content: center;
}

@media only screen and (max-width: 600px) {
  .container {
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    flex-direction: column;
}

.smallQuizzContainer {
    flex: 1;
    display: flex;
    flex-direction: row;
    height: 100%;
    margin: 5px;
}

.quizContainerV2 {
    box-shadow: rgba(87, 174, 250, 0.25) 0px 25px 50px -12px;
    display: flex;
    border-radius: 1em;
    flex-direction: column;
    width: 100%;
    height: auto;
    min-height: 250px;
    margin: 20px;
    flex-direction: column;
    background-color: #b19cd9;
}

.quizContainerV1 {
    box-shadow: rgba(87, 174, 250, 0.25) 0px 25px 50px -12px;
    display: flex;
    border-radius: 1em;
    flex-direction: column;
    width: 100%;
    height: auto;
    min-height: 250px;
    margin: 20px;
    flex-direction: column;
    background-color: #FFE078;
}
}

.quizContainerV1 {
    box-shadow: rgba(87, 174, 250, 0.25) 0px 25px 50px -12px;
    display: flex;
    border-radius: 1em;
    flex-direction: column;
    width: 33%;
    height: auto;
    min-height: 250px;
    margin: 20px;
    flex-direction: column;
    background-size: cover;
    background-image: url(https://th.bing.com/th/id/OIG4.MXst0.sxtmlF.FpwLjMa?w=1024&h=1024&rs=1&pid=ImgDetMain);
}

.quizContainerV1Top {
  display: flex;
  justify-content: center;
  height: 60%;
  width: 100%;
  border-radius: 1em 1em 0 0;
}

.quizContainerV1Bottom {
  background-color: #f6e8bb;
  height: 40%;
  border-radius: 0 0 1em 1em;
  padding-left: 5%;
  cursor: pointer;
}

.quizContainerV2 {
    box-shadow: rgba(87, 174, 250, 0.25) 0px 25px 50px -12px;
    display: flex;
    border-radius: 1em;
    flex-direction: column;
    width: 33%;
    height: auto;
    min-height: 250px;
    margin: 20px;
    flex-direction: column;
    background-size: cover;
    background-color: #b19cd9;
    background-image: url(https://th.bing.com/th/id/OIG3..DEIYlz3kieUkKICw91.?w=1024&h=1024&rs=1&pid=ImgDetMain);
}

.quizContainerV2Top {
  display: flex;
  justify-content: center;
  height: 60%;
  width: 100%;
  border-radius: 1em 1em 0 0;
}

.quizContainerV2Bottom {
  background-color: #ded0f9;
  height: 40%;
  border-radius: 0 0 1em 1em;
  padding-left: 5%;
  cursor: pointer;
}
</style>