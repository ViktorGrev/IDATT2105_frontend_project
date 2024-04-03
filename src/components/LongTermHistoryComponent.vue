<template>
<div class="list">
  <h2 style="color: #586380;">All quizz attemps</h2>
  <ul>
    <li v-for="attempt in attempts">
        <span style="width: 100%;">
            <listElement>
                <!--Changing date dynamically-->
                <template #dateBox>
                    <p>{{ attempt.date }}</p>
                </template>

                <!--Changing title dynamically-->
                <template #titleBox>
                    <p>{{ attempt.title }}</p>
                </template>

                <!--Changing score dynamically-->
                <template #scoreBox>
                    <p>{{ attempt.score }}</p>
                </template>
            </listElement>
        </span>
    </li>
  </ul>
</div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.list {
  position: relative;
  max-height: 400px;
  overflow: auto;
  width: 100%;
}
.list h2 {
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.list ul {
  position: relative;
}
.list ul li {
  position: relative;
  left: 0;
  color: black;
  list-style: none;
  margin: 4px 0;
  transition: 0.5s;
  cursor: pointer;
  box-shadow: rgba(87, 174, 250, 0.65) 0px 0px 0px 2px, rgba(87, 174, 250, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  margin: 25px;
  border-radius: 0em 0 1em 0;
  background-image: linear-gradient(90deg, rgba(245,245,245,1) 78%, rgba(22,144,248,1) 100%);
}
.list ul li:hover {
  left: 10px;
  border-radius: 0 0 1em 0;
}
.list ul li span {
  position: relative;
  padding: 8px;
  padding-left: 12px;
  display: inline-block;
  z-index: 1;
  transition: 0.5s;
  border-radius: 0 0 1em 0;
}
.list ul li:hover span {
  color: #111;
}
.list ul li:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg, rgba(245,245,245,1) 10%, rgba(22,144,248,1) 100%);
  color: white;
  transform: scaleX(0);
  transform-origin: left;
  transition: 0.5s;
  border-radius: 0 0 1em 0;
}
.list ul li:hover:before {
  transform: scaleX(1);
  border-radius: 0 0 1em 0;
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import listElement from '../components/listElementComponent.vue'

const attempts = ref([{ date: '21/03/2022' , title: 'Eternal Echoes', score: '45/50'}, 
{ date: '21/03/2023' , title: 'Midnight Mirage', score: '40/40'},
{ date: '11/04/2022' , title: 'Whispers in the Wind', score: '3/10'},
{ date: '31/11/2022' , title: 'Shadows of Destiny', score: '40/55'},
{ date: '03/01/2022' , title: 'Infinite Horizons', score: '45/100'},
{ date: '31/01/2021' , title: 'Echoes of Yesterday', score: '37/48'}])
</script>