<script setup lang="ts">
import axios from 'axios';
import Menu from '../components/Menu.vue';

const showDatabase = async () => {
    let username = "Viktor";
    const response = await axios.post('http://localhost:8080/api/data', username);
    console.log(response.data.message.username);
    console.log(response.data.message.password);
}
</script>

<template>
    <main>
        <Menu></Menu>
        <div class = "wrapper">
            <div class ="contentBox">
                <div class ="title">History</div>
                <div class="scoreText">Your score: <text class="score">45/50</text></div>
                <div class ="choiceButtons">
                    <button class ="choice" id = "redo" @click = "showDatabase">Again</button>
                    <button class ="choice" id = "leave">Leave</button>
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
    .wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .contentBox {
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin:3rem;
    }

    .title {
        display: flex;
        justify-content: left;
        flex-direction: column;
        align-items: left;
        font-family: sans-serif;
        font-weight: 700;
        font-size: 5rem;
        margin: 10px;
        color: #586380;
    }

    .scoreText {
        display: flex;
        justify-content: left;
        flex-direction: column;
        align-items: left;
        font-family: sans-serif;
        font-weight: 700;
        font-size: 3rem;
        margin: 10px;
        color: #586380;
    }

    .score {
        justify-content: center;
        align-items: center;
        display: flex;
        font-size: 4rem;
        font-weight: 1000;
    }

    .choiceButtons {
        
    }

    .choice {
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
        margin: 1rem;
    }

    .choice:hover {
    border: 0.1rem solid rgb(22, 144, 248);
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
    width: 103%;
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
</style>
