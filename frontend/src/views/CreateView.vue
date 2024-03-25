<script setup lang="ts">
import Menu from '../components/Menu.vue'
</script>

<template>
  <main>
    <Menu></Menu>
    <div class = "box">
        <div class = "title">
            <h1>Create a new Study Set</h1>
            <input aria-label="Title" class="titleInput" maxlength="255" placeholder="Enter a title, like “Fullstack - Chapter 9: Jwt-Token”" type="text" value="">
            <div class = titleButtons>
                <button class = "titleButton">+ Import</button>
                <button class = "titleButton">Visibility: Private</button>
            </div>
        </div>
        <div class = "contentCreation">
            <div id = "questionsTitle">Questions</div>
            <div class = "questionNr">
                <button class = number>1</button>
                <button class = number>2</button>
                <button class = number>3</button>
                <button class = new>+</button>
            </div>
            <div class = "questionContent">
                <h2>Question Nr. 1</h2>
                <input class="question">
                <div class="answers">
                    <input class="answersField">
                    <input class="answersField">
                    <input class="answersField">
                    <input class="answersField">
                </div>
            </div>
        </div>
    </div>
  </main>
</template>

<style>
html {
    background-color: #edeff4;
}

    main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  scroll-behavior: smooth;
  width: 100vw;
}

.box {
    width: 60%;
    
}

.title {
    display: flex;
    justify-content: left;
    flex-direction: column;
    align-items: left;
    font-family: hurme_no2-webfont, -apple-system, BlinkMacSystemFont, sans-serif;
    white-space: nowrap;
    font-weight: 700;
    font-size: 1.2rem;
    margin: 10px;
    color: #586380;
}

.titleInput {
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: normal;
    line-height: 1.5;
    appearance: none;
    border: none;
    box-shadow: none;
    color: var(--gray-800-gray-200);
    cursor: text;
    filter: none;
    flex: 1 1 auto;
    background-color: initial;
    padding-right: 1rem;
    background-color: white;
    height: 4rem;
    border-radius: 10px;
    color: #586380;
}

.titleInput:focus {
    outline: none;
    border-bottom: 5px solid #586380;
}

.titleButtons {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
}

.titleButton {
    padding: .375rem .875rem;
    background: white;
    border-color: #d9dde8;
    color: #586380;
    font-weight: 600;
    font-size: .875rem;
    border: .125rem solid #58638063;
    border-radius: .5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    font: inherit;
    margin-right: 1rem;
}

#questionsTitle {
    color: #586380;
    font-size: 2rem;
    margin-bottom: 1rem;
}

.contentCreation {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  color: white;
  margin-top: 2rem;
}

.questionNr {
    font-size: 30px;
    
}

.number {
    height: 60px;
    width: 60px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    margin-right: 10px;
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
}

.number:focus {
  outline: 0;
}

.number {
    background-color: #50d8d7;
    border-radius: 50%;
}

.number:hover {
    background-color: #6bf3f3;
}

.new {
    height: 60px;
    width: 60px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    margin-right: 10px;
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    cursor: pointer;
}

.new:focus {
  outline: 0;
}

.new {
    background-color: #1eb332;
    border-radius: 50%;
}

.new:hover {
    background-color: #127934;
}

.questionContent {
    background-color: white;
    width: 100%;
    border-radius: 20px;
    margin-top: 20px;
    color: black;
    display: flex;
    flex-direction: column;
}

.answers {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
    align-content: space-around;
}

.answersField {
    width: 40%;
}
</style>