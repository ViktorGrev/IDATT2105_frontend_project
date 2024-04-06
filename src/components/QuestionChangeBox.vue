<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    question: Object,
    index: Number,
});

const emits = defineEmits(['updateQuestion', 'deleteQuestion', 'setCorrectAnswer', 'handleImageUpload']);

const updateQuestionText = (text) => {
    emits('updateQuestion', { ...props.question, questionText: text });
};

const deleteQuestion = () => {
    emits('deleteQuestion', props.question.id);
};

const updateCorrectAnswer = (answerIndex) => {
    emits('setCorrectAnswer', props.question.id, answerIndex);
};

const uploadImage = (event) => {
    emits('handleImageUpload', event, props.question.id);
};

const addAnswerOption = () => {
    if (props.question.answers.length < 10) { // Example limit to 10 options
        props.question.answers.push('');
        emits('updateQuestion', { ...props.question });
    }
};

const removeAnswerOption = (index) => {
    if (props.question.answers.length > 2) { // Ensure there are at least 2 options
        props.question.answers.splice(index, 1);
        emits('updateQuestion', { ...props.question });
    }
};

const toggleCorrectAnswer = (answerIndex) => {
    const index = props.question.correctAnswerIndices.indexOf(answerIndex);
    if (index > -1) {
        props.question.correctAnswerIndices.splice(index, 1);
    } else {
        props.question.correctAnswerIndices.push(answerIndex);
    }
    emits('updateQuestion', { ...props.question });
};

</script>

<template>
    <div class="questionEditBox">
        <div class="titleHolder">
            <div>Question {{ index + 1 }}</div>
            <button class="deleteButton" @click="deleteQuestion">Delete</button>
        </div>
        <div class="questionContent">
            <div class="questionBox">
                The question:
                <input id="question" class="question" v-model="question.questionText" placeholder="Type in here">
                <input type="file" @change="uploadImage" hidden ref="questionImageInput">
                <button class="titleButton" @click="$refs.questionImageInput.click()">+Image</button>
            </div>
            <div class="questionTypeSelector">
                <select v-model="question.type">
                    <option value="multipleChoice">Multiple Choice</option>
                    <option value="trueFalse">True / False</option>
                    <option value="fillInBlank">Fill in the Blank</option>

                </select>
            </div>
            <div class="answers" v-if="question.type === 'multipleChoice'">
                <div id="answerAddSplitter">
                    <div v-for="(answer, ansIndex) in question.answers" :key="`ans-${index}-${ansIndex}`"
                        class="answerRow">
                        <button id="removeOption" @click="removeAnswerOption(ansIndex)">X</button>
                        <input class="answersField" v-model="question.answers[ansIndex]"
                            :placeholder="`Answer ${ansIndex + 1}`">
                        <!-- Button to remove option -->
                        <div>
                            <input type="checkbox" class="option-input checkbox" :name="`correctAnswer-${question.id}`"
                                :value="ansIndex" @change="toggleCorrectAnswer(ansIndex)"
                                :checked="question.correctAnswerIndices.includes(ansIndex)">
                            <label :for="`answer-${ansIndex}`">Correct</label>
                        </div>
                    </div>
                </div>
                <div>
                    <button id="addOption" @click="addAnswerOption">+ Add Option</button>
                    <!-- Button to add new option -->
                </div>
            </div>
            <div class="answers" v-if="question.type === 'trueFalse'">
                <div class="answerRow">
                    <label>True</label>
                    <input type="radio" class="option-input radio" :name="`correctAnswer-${question.id}`" value="true"
                        v-model="question.correctAnswerIndices">
                </div>
                <div class="answerRow">
                    <label>False</label>
                    <input type="radio" class="option-input radio" :name="`correctAnswer-${question.id}`" value="false"
                        v-model="question.correctAnswerIndices">
                </div>
            </div>
            <div class="answers" v-if="question.type === 'fillInBlank'">
                <div class="answerRow">
                    <input class="answersField" v-model="question.answers[0]" placeholder="Correct Answer">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.questionEditBox {
    border: 2px solid #586380;
    border-radius: 1rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    padding: 1.5rem;
    color: #586380;
    width: 100%;
}

.titleHolder {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.questionContent {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
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
    margin-right: 1rem;
}

.question:focus {
    outline: none;
    border-bottom: 5px solid rgb(22, 144, 248);
}

.answersField {
    width: 50%;
    min-width: 180px;
    max-width: 200px;
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
    margin-right: 1rem;
}

.answersField:focus {
    outline: none;
    border-bottom: 5px solid rgb(22, 144, 248);
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

.option-input {
    appearance: none;
    height: 40px;
    width: 40px;
    transition: all 0.15s ease-out 0s;
    background: #cbd1d8;
    border: none;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    outline: none;
    position: relative;
    z-index: 1000;
}

.option-input:hover {
    background: #9faab7;
}

.option-input:checked {
    background: #1cbd51;
}

.option-input.radio {
    border-radius: 50%;
}

.answers {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 90%;
}

.answerRow {
    padding-bottom: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.questionBox {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.questionTypeSelector {
    width: 100%;
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
    margin-right: 2rem;
}

.titleButton:hover {
    border: .125rem solid #586380a8;
}

.questionTypeSelector {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
}

select {
    appearance: none;
    border: 0;
    outline: 0;
    background-color: white;
    color: inherit;
    box-shadow: none;
    color: #586380;
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: normal;
    line-height: 1.5;
    padding: 1rem;
}

select::-ms-expand {
    display: none;
}

#addOption {
    background: rgb(46, 165, 46);
    border: none;
    border-color: #d9dde8;
    color: white;
    font-weight: 400;
    font-size: 1.3rem;
    border-bottom: 5px solid #58638063;
    border-radius: .5rem;
    cursor: pointer;
    padding: 0.3rem 1rem;
}

#removeOption {
    background: red;
    border: none;
    border-color: #d9dde8;
    color: white;
    font-weight: 400;
    font-size: 1.3rem;
    border-bottom: 5px solid #58638063;
    border-radius: .5rem;
    cursor: pointer;
    margin-right: 0.3rem;
}

#answerAddSplitter {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}
</style>
