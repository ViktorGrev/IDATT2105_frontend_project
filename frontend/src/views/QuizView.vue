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
                    <div class="answer"><a href="#">Yellow</a></div>
                    <div class="answer"><a href="#">Yellow</a></div>
                    <div class="answer"><a href="#">Yellow</a></div>
                    <div class="answer"><a href="#">Yellow</a></div>
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
    }

    .picture {
        width: 100%;
        height: 40%;
        border: 2px black solid;
    }

    .question {
        display: flex;
        justify-content: left;
        flex-direction: column;
        align-items: left;
        font-family: hurme_no2-webfont, -apple-system, BlinkMacSystemFont, sans-serif;
        white-space: nowrap;
        font-weight: 700;
        font-size: 3rem;
        margin: 10px;
        color: #586380;
    }

    .answersBox {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
</style>
