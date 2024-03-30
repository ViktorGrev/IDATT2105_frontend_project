<script setup lang="ts">
import Menu from '../components/Menu.vue';
</script>

<template>
  <main>
    <Menu></Menu>
    <div class="header">
      Trivium
    </div>
    <div>
      <ul class="nav-links">
        <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
        <li><a href="#recentContent">Recent</a></li>
        <li><a href="#topContent">Top 10</a></li>
        <li><a href="#triviumContent">Trivium verified</a></li>
        <li><a href="#">History</a></li>
        <li><a href="#">Countries</a></li>
        <li><a href="#idatt2105Content">IDATT2105</a></li>
      </ul>
    </div>
    <div class="contentBox">
      <div id="contentSpace"></div>
      <div id="quizID">
        <h3>Recent</h3>
        <div>
            <div class="container">
                <div class="largeQuizzContainer">
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
                </div>
            </div>
        </div>
        <div style="height: 150px;">

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
        <div style="height: 150px;"></div>
        <div id="triviumContent">
          <h3>Trivium verified</h3>
          <div>
            <div class="quizz">
                <div class="quizzInfo">
                    <p style="font-size: 30px;">Quizz: The Second World War</p>
                </div>
                <div class="quizzExtendButton">
                    <p style="font-size: 10px; cursor: pointer;">See more</p>
                </div>
                <div class="quizzPlay">
                    <img src="../assets/triviumRemovedBackground.png" alt="play" style="cursor: pointer;">
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
    height: 70vh;
    margin-top: 2rem;
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
    margin: 5px;
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
}

.quizzPlay img {
    width: 40%;
    height: auto;
}
</style>