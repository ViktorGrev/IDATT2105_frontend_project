<script setup lang="ts">
import Menu from '../components/Menu.vue';
</script>

<template>
    <main>
        <Menu></Menu>
        <div class="wrapper">
            <div class="contentBox">
                <div class="picture"><img></div>
                <div class="question">What color was Hitler?</div>
                <div class ="answersBox">
                    <button class="answer">Yellow</button>
                    <button class="answer">Yellow</button>
                    <button class="answer">Yellow</button>
                    <button class="answer">Yellow</button>
                </div>
            </div>
            <div class="progressBox">
                <div class="score">11/20</div>
            </div>
        </div>
    </main>
</template>

<style scoped>
    .wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: end;
    }

    .contentBox {
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .progressBox {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: start;
        font-size: 4rem;
    }

    .picture {
        width: 80%;
        height: 300px;
        border: 2px black solid;
        margin: 30px;
    }

    .question {
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

    .answersBox {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        margin: 30px;
    }

    .answer {
        min-width: 300px;
        width: 40%;
        padding: 20px;
        text-align: center;
        background-color: rgb(22, 144, 248);
        margin-bottom: 2rem;
        border-radius: 2rem;
        cursor: pointer;
        font-size: 1.3rem;
        color: white;
    }
</style>
