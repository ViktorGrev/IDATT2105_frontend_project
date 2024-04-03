<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import Menu from '../components/Menu.vue'

const router = useRouter()
const route = useRoute() // Use useRoute to access the current route details

const quizId = route.params.id; // Access route parameters with useRoute

const navigateToTheQuiz = () => {
    router.push({ name: 'quiz', params: { id: quizId } });
}
</script>

<template>
    <main>
        <Menu></Menu>
        <div class="wrapper">
            <div class="header">
                <div class="topHeader">
                    <div class="title">History</div>
                    <div class="amountQuestion">50 questions</div>
                    <div class="views">10 views</div>
                </div>
                <div class="bottomHeader">
                    <div class="creator">Made by: Player 1</div>

                </div>
            </div>
            <div class="contentBox">
                <div class="playBox">
                        <button class="playButton" @click="navigateToTheQuiz">START QUIZ</button>
                </div>
                <div class="content">
                    <div id="header">
                        <h1>Ranking</h1>
                    </div>
                    <div id="leaderboard">
                        <div class="ribbon"></div>
                        <table>
                            <tr>
                                <td class="number">1</td>
                                <td class="name">Lee Taeyong</td>
                                <td class="points">
                                    258.244 <img class="gold-medal"
                                        src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                                        alt="gold medal" />
                                </td>
                            </tr>
                            <tr>
                                <td class="number">2</td>
                                <td class="name">Mark Lee</td>
                                <td class="points">258.242</td>
                            </tr>
                            <tr>
                                <td class="number">3</td>
                                <td class="name">Xiao Dejun</td>
                                <td class="points">258.223</td>
                            </tr>
                            <tr>
                                <td class="number">4</td>
                                <td class="name">Qian Kun</td>
                                <td class="points">258.212</td>
                            </tr>
                            <tr>
                                <td class="number">5</td>
                                <td class="name">Johnny Suh</td>
                                <td class="points">258.208</td>
                            </tr>
                        </table>
                        <div id="buttons">
                            <button class="exit">Global</button>
                            <button class="continue">Friends</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wrapper {
    width: 60%;
    height: 100%;
    margin: 30px;
    margin-bottom: 4rem;
}

.header {
    display: flex;
    justify-content: start;
    flex-direction: column;
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

.contentBox {
    display: flex;
    flex-direction: row;
}

.content {
    width: 60%;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
}

/*leaderboard*/

#header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem;
}

h1 {
    font-family: "Rubik", sans-serif;
    font-size: 1.7rem;
    color: #141a39;
    text-transform: uppercase;
    cursor: default;
}

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
}

.name {
    text-align: left;
    font-size: 1.3rem;
}

.points {
    font-weight: bold;
    font-size: 1.3rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
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
    border-bottom: white ;
}

.continue:active {
    border-bottom: 0;
}

@media (max-width: 1300px) {

    .number,
    .name,
    .points {
        font-size: 1.1rem;
    }
}

/*playBox*/

.playBox {
    width: 40%;
    display: flex;
    
    align-items: start;
}

.playButton {
    background-color: white;
    color: black;
    border-radius: 10em;
    font-size: 17px;
    font-weight: 600;
    padding: 1em 2em;
    cursor: pointer;
    width: 80%;
    height: 5rem;
    transition: all 0.3s ease-in-out;
    border: 1px solid rgb(22, 144, 248);
    box-shadow: 0 0 0 0 rgb(22, 144, 248);
    margin-top: 6.7rem;
}

.playButton:hover {
  transform: translateY(-4px) translateX(-2px);
  box-shadow: 2px 5px 0 0 rgb(22, 144, 248);
};

.playButton:active {
  transform: translateY(2px) translateX(1px);
  box-shadow: 0 0 0 0 rgb(22, 144, 248);
};


</style>
