<script setup lang="ts">
import Menu from '../components/Menu.vue';
import history from '@/components/history.vue';
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';

// Function to fetch quiz data
async function fetchQuizData(quizId) {
  try {
    const response = await axios.get('http://localhost:8080/api/quiz/10', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization ': "Bearer " + sessionStorage.getItem("userToken")
      }
    });
    
  } catch (error) {
    console.error("Failed to fetch quiz data:", error);
  }
}

// Fetch quiz data when component mounts
onMounted(() => {
  fetchQuizData(10); // Fetch quiz with ID 10
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
      <div id="contentSpace"></div>
      <div id="quizID">
        <div id="recent">
            <div class="container">
                <!--<div class="largeQuizzContainer">
                    <img src="https://www.leonardodavincischool.org/sites/main/files/imagecache/lightbox/main-images/camera_lense_0.jpeg" alt="test">
                    <div class="centerText">Quizz 1</div>
                    <p style="margin-left: 15px; font-size: 30px;">You have played these quizzes recently</p>
                </div>
                <div class="smallQuizzContainer">
                    <div class="topSmallQuizzContainer">
                        <img src="https://wallpapers.com/images/hd/wooden-cottage-sea-high-resolution-d7fahhz6phtkdveh.jpg" alt="test">
                        <div class="topText">Quizz 2</div>
                    </div>
                    <div class="bottomSmallQuizzContainer">
                        <img src="https://static.photocdn.pt/images/articles/2017/11/29/articles/2017_8/iStock-641093712-min-1.webp" alt="test">
                        <div class="bottomText">Quizz 3</div>
                    </div>
                </div>-->
                <history></history>
            </div>
        </div>
        
        <div id="topContent">
          <h3>Top 10</h3>
          <div class="container">
            <div class="smallQuizzContainer">
                <div class="topSmallQuizzContainer">
                    <img src="https://wallpapers.com/images/hd/wooden-cottage-sea-high-resolution-d7fahhz6phtkdveh.jpg" alt="test">
                    <div class="topText">Quizz 2</div>
                </div>
                <div class="bottomSmallQuizzContainer">
                    <img src="https://static.photocdn.pt/images/articles/2017/11/29/articles/2017_8/iStock-641093712-min-1.webp" alt="test">
                    <div class="bottomText">Quizz 3</div>
                </div>
            </div>
            <div class="largeQuizzContainer">
                <img src="https://www.leonardodavincischool.org/sites/main/files/imagecache/lightbox/main-images/camera_lense_0.jpeg" alt="test">
                <div class="centerText">Quizz 1</div>
                <p style="margin-left: 15px; font-size: 30px;">These are the top 10 quizzes of the week</p>
            </div>
          </div>
        </div>
        
        <div id="triviumContent">
          <h3>Trivium verified</h3>
          <div class="container">
            <div class="quizContainerV1">
              <div class="quizContainerV1Top">

              </div>
              <div class="quizContainerV1Bottom">
                <p style="font-size: 25px; margin: 0; margin-top: 5px;">Quizz 1</p>
                <p style="font-size: 15px; margin: 0; margin-top: 5px;">Quizz 1: About pearl harbor</p>
              </div>
            </div>
            <div class="quizContainerV2">
              <div class="quizContainerV2Top">

              </div>
              <div class="quizContainerV2Bottom">
                <p style="font-size: 25px; margin: 0; margin-top: 5px;">Quizz 2</p>
                <p style="font-size: 15px; margin: 0; margin-top: 5px;">Quizz 2: About killing</p>
              </div>
            </div>
            <div class="quizContainerV1">
              <div class="quizContainerV1Top">

              </div>
              <div class="quizContainerV1Bottom">
                <p style="font-size: 25px; margin: 0; margin-top: 5px;">Quizz 3</p>
                <p style="font-size: 15px; margin: 0; margin-top: 5px;">Quizz 3: About murder</p>
              </div>
            </div>
          </div>
        </div>
        <div id="idatt2105Content">
        <h3>IDATT2105</h3>
          
        </div>
      </div>
      <div id="contentSpace"></div>
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
  width: 100%;
  font-size: 25px;
  display: flex;
  flex-direction: row;
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

.largeQuizzContainer {
    flex: 0 0 60%;
    height: 100%;
    position: relative; 
}

.largeQuizzContainer img {
    width: 100%;
    height: 100%;
    border-radius: 1em;
    margin-top: 10px;
    cursor: pointer;
}

.smallQuizzContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 5px;
}

.topSmallQuizzContainer {
    flex: 1;
    margin: 5px;
    position: relative; 
}

.bottomSmallQuizzContainer {
    flex: 1;
    margin: 5px;
    position: relative; 
}

.smallQuizzContainer, img {
    width: 100%;
    height: 100%;
    border-radius: 1em;
    cursor: pointer;
}

.centerText,
.topText, 
.bottomText { 
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white; 
    font-size: 40px; 
    text-align: center;
    font-weight: 600;
}

.quizz {
    display: flex;
    width: 100%;
    box-shadow: 5px 5px 5px #88888845;
    border-radius: 1em;
    background-color: whitesmoke;
    height: 150px;
    justify-content: center;
    text-align: left;
}

.quizzInfo {
    flex: 0 0 45%;
  font-size: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 30px;
}
.quizzExtendButton {
    flex: 0 0 10%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.quizzPlay {
    flex: 0 0 45%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    max-width: 100%;
    max-height: 100%;
}

.quizzPlay img {
    width: 15%;
    height: 40%;
    padding-right: 40px;
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