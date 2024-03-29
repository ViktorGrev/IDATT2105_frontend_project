<script setup lang="ts">
import { ref, reactive } from 'vue';
import Menu from '../components/Menu.vue';

// A reactive array to store each question and its details
const questions = reactive([
    {
        id: 1,
        questionText: '',
        answers: ['', '', '', ''],
        correctAnswerIndex: null,
    }
]);

// Currently selected question
const currentQuestionId = ref(questions[0].id);

// Method to add a new question
const addQuestion = () => {
    // Find the highest ID and add 1 to it to ensure uniqueness
    const nextId = questions.length === 0 ? 1 : Math.max(...questions.map(q => q.id)) + 1;
    questions.push({
        id: nextId,
        questionText: '',
        answers: ['', '', '', ''],
        correctAnswerIndex: null,
    });
    currentQuestionId.value = nextId; // Select the new question
};

// Method to select an existing question
const selectQuestion = (id) => {
    console.log(`Selecting question with id: ${id}`);
    currentQuestionId.value = id;
};

// Find the question object by ID
const findQuestionById = (id) => {
    return questions.find(q => q.id === id);
};

// Method to get the current question object
const currentQuestion = () => {
    return findQuestionById(currentQuestionId.value);
};

// Method to delete a question
const deleteQuestion = (id) => {
    console.log(`Deleting question with id: ${id}`);
    const index = questions.findIndex(q => q.id === id);
    if (index !== -1) {
        questions.splice(index, 1);
        // If the current question is deleted, select the first question or null if no questions are left
        if (currentQuestionId.value === id) {
            currentQuestionId.value = questions.length > 0 ? questions[0].id : null;
        }
    }
};

// Method to set the correct answer for a question
const setCorrectAnswer = (questionId, answerIndex) => {
    const question = findQuestionById(questionId);
    if (question) {
        question.correctAnswerIndex = question.correctAnswerIndex === answerIndex ? null : answerIndex;
    }
};

// Add here other methods as needed, such as for saving the quiz data, etc.

const createQuiz = () => {
    console.log(questions);
};

</script>


<template>
    <main>
        <Menu></Menu>
        <div class="box">
            <div class="title">
                <div class="createtitle">
                    <h1>Create a new Study Set</h1> <button @click="createQuiz" class="createButton">Create</button>
                </div>
                <input aria-label="Title" class="titleInput" maxlength="255"
                    placeholder="Enter a title, like “Fullstack - Chapter 9: Jwt-Token”" type="text" value="">
                <div class=titleButtons>
                    <button class="titleButton">+ Import</button>
                    <button class="titleButton">Visibility: Private</button>
                    <input class="tagInput" placeholder="Add a tag for the Quiz, like “IDATT2105”">
                </div>

            </div>

            <div class="contentCreation">
                <div id="questionsTitle">Questions</div>
                <div class="questionNr">
                    <!-- Dynamically render number buttons and bind click event to selectQuestion -->
                    <button class="number" v-for="question in questions" :key="question.id"
                        :class="{ active: question.id === currentQuestionId }" @click="selectQuestion(question.id)">
                        {{ question.id }}
                    </button>
                    <!-- Button to add a new question -->
                    <button class="new" @click="addQuestion">+</button>
                </div>
                <div class="content" v-if="currentQuestion()">
                    <div class="titleHolder">
                        <div id="someTitle">Current Question ID: {{ currentQuestionId }} </div>
                        <button class="deleteButton" @click="deleteQuestion(currentQuestionId)">Delete</button>
                    </div>

                    <div class="questionContent">
                        <!-- Bind the current question's properties to the form inputs -->
                        <div class="questionBox">
                            The question: <input class="question" v-model="currentQuestion().questionText"
                                placeholder="Type in here">
                        </div>
                        <div class="questionBox">Answers:</div>



                        <div class="answers">
                            <div v-for="(answer, index) in currentQuestion().answers" :key="index" class="answerRow">
                                <input class="answersField" v-model="currentQuestion().answers[index]"
                                    :placeholder="`Answer ${index + 1}`">
                                <input type="radio" class="option-input radio" :name="`correctAnswer-${currentQuestionId}`" :id="`answer-${index}`"
                                    :value="index" v-model="currentQuestion().correctAnswerIndex">
                                <label :for="`answer-${index}`">Correct</label>
                            </div>
                        </div>
awdawd   awdawdadadw
awdawdaddawdad   adwawdawdawd
awdawdawd   awdawdawd
awdawdawd   awdawdad
                    </div>
                </div>
                <!-- You might want to handle the case where there are no questions left -->
                <div class="content" v-else>
                    <p id="someTitle">No questions to display. Add a new question.</p>
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
    width: 100%;

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
    border-bottom: 5px solid rgb(22, 144, 248);
}

.tagInput {
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: normal;
    line-height: 1.5;
    appearance: none;
    border: none;
    box-shadow: none;
    cursor: text;
    filter: none;
    flex: 1 1 auto;
    max-width: 60%;
    background-color: initial;
    padding-right: 1rem;
    background-color: white;
    height: 3rem;
    border-radius: 10px;
    color: #586380;
}

.tagInput:focus {
    outline: none;
    border-bottom: 5px solid rgb(22, 144, 248);
}

.createtitle {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

.createButton {
    padding: .5rem 3rem;
    background: blue;
    border-color: #d9dde8;
    color: white;
    font-weight: 600;
    font-size: 3rem;
    border: .125rem solid #58638063;
    border-radius: .5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    font: inherit;
    margin-right: 1rem;
    height: 3.5rem;
}

.createButton:hover {
    border: .125rem solid #586380a8;
}

.titleButtons {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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

.titleButton:hover {
    border: .125rem solid #586380a8;
}

.titleHolder {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    margin: 10px;
    margin-top: 2rem;
}

.questionNr {
    font-size: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.questionHolder {
    max-width: 90%;
}

.number {
    height: 60px;
    width: 60px;
    min-width: 60px;
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
    min-width: 60px;
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

.content {
    border: .125rem solid #58638063;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    border-radius: 2rem;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.3);
}

.questionContent {
    background-color: #edeff4;
    width: 100%;
    border-radius: 20px;
    margin-top: 20px;
    color: #586380;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#someTitle {
    color: #586380;
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.answers {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-content: space-around;
    margin-top: 1rem;
    margin-bottom: 2rem;
}

.question {
    width: 60%;
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: normal;
    line-height: 1.5;
    appearance: none;
    border: none;
    box-shadow: none;
    cursor: text;
    filter: none;
    flex: 1 1 auto;
    background-color: initial;
    padding-right: 1rem;
    background-color: white;
    height: 3rem;
    border-radius: 10px;
    color: #586380;
    margin-bottom: 1rem;
    margin-left: 1rem;
}

.question:focus {
    outline: none;
    border-bottom: 5px solid rgb(22, 144, 248);
}

.answersField {
    min-width: 250px;
    max-width: 100px;
    width: 50%;
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: normal;
    line-height: 1.5;
    appearance: none;
    border: none;
    box-shadow: none;
    cursor: text;
    filter: none;
    flex: 1 1 auto;
    background-color: initial;
    padding-right: 1rem;
    background-color: white;
    height: 3rem;
    border-radius: 10px;
    color: #586380;
    margin-bottom: 1rem;
    margin-right: 1rem;
}

.answerRow {
    margin: 1.5rem;
}

.answersField:focus {
    outline: none;
    border-bottom: 5px solid rgb(22, 144, 248);
}

#questionType {
    width: auto;
    flex-direction: row;
    justify-content: start;
}

.questionButton {
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
    margin-left: 1rem;
}

.questionButton:hover {
    border: .125rem solid #586380a8;
}

.deleteButton {
    padding: .375rem .875rem;
    background: red;
    border-color: #d9dde8;
    color: white;
    font-weight: 600;
    font-size: 2rem;
    border: .3rem solid red;
    border-radius: .5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    font: inherit;
    margin-left: 1rem;
    height: 2rem;
}

.deleteButton:hover {
    border: .3rem solid red;
}

.questionBox {
    width: 100%;
    color: #586380;
    font-size: 1.5rem;
}


/* Question type */

.sec-center {
    position: relative;
    text-align: start;
    display: flex;
    flex-direction: row;
    z-index: 200;
}

[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
    position: absolute;
    left: -9999px;
    opacity: 0;
    pointer-events: none;
}

.dark-light:checked+label,
.dark-light:not(:checked)+label {
    position: fixed;
    top: 40px;
    right: 40px;
    z-index: 20000;
    display: block;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    cursor: pointer;
    transition: all 200ms linear;
    box-shadow: 0 0 25px rgba(255, 235, 167, .45);
}

.dark-light:checked+label {
    transform: rotate(360deg);
}

.dark-light:checked+label:after,
.dark-light:not(:checked)+label:after {
    position: absolute;
    content: '';
    top: 1px;
    left: 1px;
    overflow: hidden;
    z-index: 2;
    display: block;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    background-color: #102770;
    background-image: url('https://assets.codepen.io/1462889/moon.svg');
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 200ms linear;
    opacity: 0;
}

.dark-light:checked+label:after {
    opacity: 1;
}

.dark-light:checked+label:before,
.dark-light:not(:checked)+label:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 1;
    display: block;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    background-color: #48dbfb;
    background-image: url('https://assets.codepen.io/1462889/sun.svg');
    background-size: 25px 25px;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 200ms linear;
}

.dark-light:checked+label:before {
    background-color: #000;
}

.light-back {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #fff;
    overflow: hidden;
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat-back.svg');
    background-position: center;
    background-repeat: repeat;
    background-size: 4%;
    height: 100%;
    width: 100%;
    transition: all 200ms linear;
    opacity: 0;
}

.dark-light:checked~.light-back {
    opacity: 1;
}

.dropdown:checked+label,
.dropdown:not(:checked)+label {
    position: relative;
    font-family: 'Poppins', sans-serif;
    font-size: .875rem;
    ;
    font-weight: 500;
    line-height: 2;
    height: 50px;
    transition: all 200ms linear;
    border-radius: 10px;
    width: 220px;
    letter-spacing: 1px;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    justify-content: center;
    -ms-flex-pack: center;
    text-align: center;
    border: none;
    background-color: white;
    cursor: pointer;
    color: #102770;
    box-shadow: 0 12px 35px 0 rgba(255, 235, 167, .15);
    border: 0.125rem solid #58638063;
}

.dropdown:checked+label:hover,
.dropdown:not(:checked)+label:hover {
    border: .125rem solid #586380a8;
}

.dark-light:checked~.sec-center .for-dropdown {
    background-color: #102770;
    color: #ffeba7;
    box-shadow: 0 12px 35px 0 rgba(16, 39, 112, .25);
}

.dropdown:checked+label:before,
.dropdown:not(:checked)+label:before {
    position: fixed;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    z-index: -1;
    cursor: auto;
    pointer-events: none;
}

.dropdown:checked+label:before {
    pointer-events: auto;
}

.dropdown:not(:checked)+label .uil {
    font-size: 24px;
    margin-left: 10px;
    transition: transform 200ms linear;
}

.dropdown:checked+label .uil {
    transform: rotate(180deg);
    font-size: 24px;
    margin-left: 10px;
    transition: transform 200ms linear;
}

.section-dropdown {
    position: absolute;
    padding: 5px;
    background-color: #111;
    top: 55px;
    left: 0;
    width: 20%;
    border-radius: 4px;
    display: block;
    box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.4);
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px);
    transition: all 200ms linear;
}

.dark-light:checked~.sec-center .section-dropdown {
    background-color: #fff;
    box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.15);
}

.dropdown:checked~.section-dropdown {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.section-dropdown:before {
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 20px;
    content: '';
    display: block;
    z-index: 1;
}

.section-dropdown:after {
    position: absolute;
    top: -7px;
    left: 30px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #111;
    content: '';
    display: block;
    z-index: 2;
    transition: all 200ms linear;
}

.dark-light:checked~.sec-center .section-dropdown:after {
    border-bottom: 8px solid #fff;
}

a {
    position: relative;
    color: #fff;
    transition: all 200ms linear;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 15px;
    border-radius: 2px;
    padding: 5px 0;
    padding-left: 20px;
    padding-right: 15px;
    margin: 2px 0;
    text-align: left;
    text-decoration: none;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    align-items: center;
    justify-content: space-between;
    -ms-flex-pack: distribute;
}

.dark-light:checked~.sec-center .section-dropdown a {
    color: #102770;
}

a:hover {
    color: #102770;
    background-color: white;
}

.dark-light:checked~.sec-center .section-dropdown a:hover {
    color: #ffeba7;
    background-color: #102770;
}

a .uil {
    font-size: 22px;
}

.dropdown-sub:checked+label,
.dropdown-sub:not(:checked)+label {
    position: relative;
    color: #fff;
    transition: all 200ms linear;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 15px;
    border-radius: 2px;
    padding: 5px 0;
    padding-left: 20px;
    padding-right: 15px;
    text-align: left;
    text-decoration: none;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -moz-align-items: center;
    -ms-align-items: center;
    align-items: center;
    justify-content: space-between;
    -ms-flex-pack: distribute;
    cursor: pointer;
}

.dropdown-sub:checked+label .uil,
.dropdown-sub:not(:checked)+label .uil {
    font-size: 22px;
}

.dropdown-sub:not(:checked)+label .uil {
    transition: transform 200ms linear;
}

.dropdown-sub:checked+label .uil {
    transform: rotate(135deg);
    transition: transform 200ms linear;
}

.dropdown-sub:checked+label:hover,
.dropdown-sub:not(:checked)+label:hover {
    color: #102770;
    background-color: #ffeba7;
}

.dark-light:checked~.sec-center .section-dropdown .for-dropdown-sub {
    color: #102770;
}

.dark-light:checked~.sec-center .section-dropdown .for-dropdown-sub:hover {
    color: #ffeba7;
    background-color: #102770;
}

.section-dropdown-sub {
    position: relative;
    display: block;
    width: 100%;
    pointer-events: none;
    opacity: 0;
    max-height: 0;
    padding-left: 10px;
    padding-right: 3px;
    overflow: hidden;
    transition: all 200ms linear;
}

.dropdown-sub:checked~.section-dropdown-sub {
    pointer-events: auto;
    opacity: 1;
    max-height: 999px;
}

.section-dropdown-sub a {
    font-size: 14px;
}

.section-dropdown-sub a .uil {
    font-size: 20px;
}

.logo {
    position: fixed;
    top: 50px;
    left: 40px;
    display: block;
    z-index: 11000000;
    background-color: transparent;
    border-radius: 0;
    padding: 0;
    transition: all 250ms linear;
}

.logo:hover {
    background-color: transparent;
}

.logo img {
    height: 26px;
    width: auto;
    display: block;
    transition: all 200ms linear;
}

.dark-light:checked~.logo img {
    filter: brightness(10%);
}

@media screen and (max-width: 991px) {
    .logo {
        top: 30px;
        left: 20px;
    }

    .dark-light:checked+label,
    .dark-light:not(:checked)+label {
        top: 20px;
        right: 20px;
    }
}

/*Radio*/
.option-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  position: relative;
  top: 13.33333px;
  right: 0;
  bottom: 0;
  left: 0;
  height: 40px;
  width: 40px;
  transition: all 0.15s ease-out 0s;
  background: #cbd1d8;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-right: 0.5rem;
  outline: none;
  position: relative;
  z-index: 1000;
}
.option-input:hover {
  background: #9faab7;
}
.option-input:checked {
  background: #40e0d0;
}
.option-input:checked::before {
  width: 40px;
  height: 40px;
  display:flex;
  content: '\f00c';
  font-size: 25px;
  font-weight:bold;
  position: absolute;
  align-items:center;
  justify-content:center;
  font-family:'Font Awesome 5 Free';
}
.option-input:checked::after {
  -webkit-animation: click-wave 0.65s;
  -moz-animation: click-wave 0.65s;
  animation: click-wave 0.65s;
  background: #40e0d0;
  content: '';
  display: block;
  position: relative;
  z-index: 100;
}
.option-input.radio {
  border-radius: 50%;
}
.option-input.radio::after {
  border-radius: 50%;
}

@keyframes click-wave {
  0% {
    height: 40px;
    width: 40px;
    opacity: 0.35;
    position: relative;
  }
  100% {
    height: 200px;
    width: 200px;
    margin-left: -80px;
    margin-top: -80px;
    opacity: 0;
  }
}
</style>