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
                <div class ="title">Viktor</div>
                <div class = "buttonBox">
                    <button class = "buttonStyle">Add friend</button>
                    <button class = "buttonStyle">Remove freind</button>
                </div>
                <div class = "libraryTitle">Viktors quiz library</div>
                <div class = "libraryList">

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

    .libraryTitle {
        display: flex;
        justify-content: left;
        flex-direction: column;
        align-items: left;
        font-family: sans-serif;
        font-weight: 700;
        font-size: 2rem;
        margin: 2rem;
        color: #586380;
    }

    .buttonBox {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .buttonStyle {
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

    .buttonStyle:hover {
    border: 0.1rem solid rgb(22, 144, 248);
}
    
</style>
