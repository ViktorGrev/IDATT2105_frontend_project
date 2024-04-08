<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { editQuiz, quiz } from '@/api/QuizController';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const quizId = ref(0);
const quizTime = ref("");
const quizCreator = ref("");
const quizTitle = ref('');
const quizTags = ref([]);
const quizDescription = ref('');
const quizCategory = ref('');
const quizRandom = ref(false);
const quizImage = ref("");
const quizCoAuthors = ref([]);
const quizQuestions = ref([]);

const quizTagInput = ref("");
const quizImageInput = ref("");
const quizCoAuthorInput = ref('');

onMounted(async () => {
    quiz(route.params.id).then(response => {
        populateFormWithData(response.data);
    }).catch(error => {
        console.error('Quiz fetch error:', error);
    });
});

function populateFormWithData(data: any) {
    quizId.value = data.id;
    quizTime.value = data.timestamp;
    quizCreator.value = data.creator;
    quizTitle.value = data.title;
    quizCategory.value = data.category;
    quizDescription.value = data.description;
    quizTags.value = data.tags;
    quizRandom.value = data.random;
    quizImage.value = data.image;
    quizCoAuthors.value = data.coAuthors;
    quizQuestions.value = data.questions;

    console.log(JSON.stringify(quizQuestions.value, null, 2));
}

const addTag = () => {
    if (!quizTags.value.includes(quizTagInput.value) && quizTagInput.value.trim() !== '') {
        quizTags.value.push(quizTagInput.value.trim());
        quizTagInput.value = ''; // Clear the input field after adding the tag
    }
};

const removeTag = (tagToRemove) => {
    quizTags.value = quizTags.value.filter(tag => tag !== tagToRemove);
};

const toggleRandom = () => {
    quizRandom.value = !quizRandom.value;
};

const randomLabel = () => {
    return quizRandom.value ? "On" : "Off";
};

const addCoAuthor = () => {
    if (!quizCoAuthors.value.includes(quizCoAuthorInput.value) && quizCoAuthorInput.value.trim() !== '') {
        quizCoAuthors.value.push(quizCoAuthorInput.value.trim());
        quizCoAuthorInput.value = ''; // Clear the input field after adding the co-author
    }
};

const removeCoAuthor = (authorToRemove) => {
    quizCoAuthors.value = quizCoAuthors.value.filter(author => author !== authorToRemove);
};

const deleteQuestion = (id) => {
    quizQuestions.value = quizQuestions.value.filter(i => i.id !== id)
    console.log("Hallo");
};

export interface Option {
    id: number,
    optionText: string,
    correct: boolean,
}

const addAnswerOption = (id) => {
    const questionIndex = quizQuestions.value.findIndex(q => q.id === id);
    if (questionIndex !== -1) {
        // If the question does not have an options array, initialize it
        if (!quizQuestions.value[questionIndex].options) {
            quizQuestions.value[questionIndex].options = [];
        }

        // Create a new option with default values
        let newOption: Option = {
            id: null,
            optionText: '',
            correct: false
        };

        // Add the new option to the question's options array
        quizQuestions.value[questionIndex].options.push(newOption);

        // Since Vue 3 is reactive, this should automatically update your UI to reflect the changes
    } else {
        console.error('Question not found');
    }
};

const removeAnswerOption = (questionId, optionIndex) => {
    const questionIndex = quizQuestions.value.findIndex(question => question.id === questionId);
    if(questionIndex !== -1) {
        if(optionIndex >= 0 && optionIndex < quizQuestions.value[questionIndex].options.length) {
            quizQuestions.value[questionIndex].options.splice(optionIndex, 1);
        } else {
            console.error("Invalid optionIndex");
        }
    } else {
        console.error("Question not found");
    }
};


const addQuestion = (type = 'MULTIPLE_CHOICE') => {
    let newQuestion: Question = {
        id: null,
        text: '',
        type: 'MULTIPLE_CHOICE',
        correct: false,
        options: [],
    };
    let newOption: Option = {
        id: null,
        optionText: '',
        correct: false
    };

    newQuestion.options.push(newOption);
    quizQuestions.value.push(newQuestion);
    currentQuestionId.value = nextId;
};


const createQuiz = async () => {
    const quiz = {
        id: quizId.value,
        title: quizTitle.value,
        category: quizCategory.value,
        description: quizDescription.value,
        tags: quizTags.value,
        random: quizRandom.value,
        image: quizImage.value,
        coAuthors: quizCoAuthors.value,
        questions: quizQuestions.value,
        timestamp: quizTime.value,
        creator: quizCreator.value,
    };

    console.log(JSON.stringify(quiz, null, 2));
    
    editQuiz(quizId.value, quiz).then(response => {
        router.push({ name: 'quiz', params: { id: quizId.value } });
    }).catch(error => {
        console.error('Quiz creation error:', error);
    });
};

</script>


<template>
    <main>
        <div class="box">
            <div class="title">
                <div class="createtitle">
                    <h1>Create a new Study Set</h1> <button @click="createQuiz" class="createButton">Update</button>
                </div>
                <label for="quizTitle" class="titleLabel">Quiz Title:</label>
                <input id="quizTitle" aria-label="Title" class="titleInput" maxlength="255"
                    placeholder="Enter a title, like “Fullstack - Chapter 9: Jwt-Token”" type="text"
                    v-model="quizTitle">

                <div class="inputHeaders">
                    <div class="discriptionHolder">
                        <label for="descriptionDiv" class="titleLabel>">Description:</label>
                        <textarea aria-label="Description" id="description" class="descriptionInput"
                            placeholder="Enter a description for the quiz" type="text"
                            v-model="quizDescription"></textarea>
                    </div>
                    <div class="optionHolder">
                        <label for="categoryDiv" class="titleLabel">Category:</label>
                        <div class="categoryBox" id="categoryDiv">
                            <select v-model="quizCategory" id="category" class="category">
                                <option disabled value="">Select a category</option>
                                <option>CALCULUS</option>
                                <option>CHEMISTRY</option>
                                <option>ENGINEERING</option>
                                <option>ALGEBRA</option>
                                <option>LANGUAGE</option>
                                <option>BIOLOGY</option>
                                <option>PHYSICS</option>
                            </select>
                        </div>
                        <div class="tagHolder">
                            <label for="tagInput" class="tagLabel">Tag:</label>
                            <div>
                                <input id="tagInput" class="tagInput"
                                    placeholder="Add a tag for the Quiz, like “IDATT2105”" v-model="quizTagInput">

                                <button class="titleButton" @click="addTag">Apply Tag</button>
                            </div>
                            <div class="tagsDisplay">
                                <span v-for="(tag, index) in quizTags" :key="index" class="tag">
                                    {{ tag }}
                                    <button @click="removeTag(tag)">x</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                <div class=titleButtons>
                    <button @click="toggleRandom" class="titleButton">
                        Randomize Answers: {{ randomLabel() }}
                    </button>

                    <div class="coAuthorHolder">
                        <label for="coAuthorInput" class="titleLabel">Co-Authors:</label>
                        <div>
                            <input id="coAuthorInput" class="tagInput" placeholder="Add a co-author's name"
                                v-model="quizCoAuthorInput">
                            <button class="titleButton" @click="addCoAuthor">Add Co-Author</button>
                        </div>
                        <div class="tagsDisplay">
                            <span v-for="(author, index) in quizCoAuthors" :key="index" class="tag">
                                {{ author.username }}
                                <button @click="removeCoAuthor(author)">x</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>



            <div class="contentCreation">
                <div id="questionsTitle">Questions</div>
                <div class="questionsList">
                    <div class="loop" v-for="question in quizQuestions">
                        <div class="questionEditBox">
                            <div class="titleHolder">
                                <div>Question {{ question.tile }}</div>
                                <button class="deleteButton" @click="deleteQuestion(question.id)">Delete</button>
                            </div>
                            <div class="questionBox">
                                The question:
                                <input id="question" class="question" v-model="question.text"
                                    placeholder="Type in here">
                            </div>
                            <div class="questionTypeSelector">
                                <select v-model="question.type">
                                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                                    <option value="TRUE_FALSE">True / False</option>
                                    <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
                                </select>
                            </div>
                            <div class="answers" v-if="question.type === 'MULTIPLE_CHOICE'">
                                <div id="answerAddSplitter">
                                    <div v-for="(option, index) in question.options" :key="index" class="answerRow">
                                        <button id="removeOption"
                                            @click="removeAnswerOption(question.id, index)">X</button>
                                        <input class="answersField" v-model="option.optionText">
                                        <div>
                                            <input type="checkbox" class="option-input checkbox" :value="option.id"
                                                @change="option.correct = !option.correct" :checked="option.correct">
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <button id="addOption" @click="addAnswerOption(question.id)">+ Add Option</button>
                                </div>
                            </div>
                            <div class="answers" v-else-if="question.type === 'FILL_IN_THE_BLANK'">
                                <div class="answerRow">
                                    <input class="answersField" v-model="question.solution">
                                </div>
                            </div>
                            <div class="answers" v-else-if="question.type === 'TRUE_FALSE'">
                                <div class="answerRow">
                                    <label>True</label>
                                    <input type="radio" class="option-input radio" value="true" v-model="question.true">
                                </div>
                                <div class="answerRow">
                                    <label>False</label>
                                    <input type="radio" class="option-input radio" value="false"
                                        v-model="question.true">
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="addQuestionButton" @click="addQuestion">+ Add Question</button>
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
    margin-bottom: 7rem;
}

@media (max-width: 700px) {
    .box {
        width: 90%;
    }
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
    background-color: initial;
    padding-right: 1rem;
    background-color: white;
    height: 3rem;
    border-radius: 10px;
    color: #586380;
    margin-right: 1rem;
    width: 100%;
    min-width: 160px;
}

.tagInput:focus {
    outline: none;
    border-bottom: 5px solid rgb(22, 144, 248);
}

.descriptionInput {
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: normal;
    line-height: 1.5;
    appearance: none;
    border: none;
    box-shadow: none;
    cursor: text;
    background-color: initial;
    background-color: white;
    height: 3rem;
    border-radius: 10px;
    color: #586380;
    height: 12rem;
    text-align: start;
    resize: none;
    width: 100%;
    margin-top: 1rem;
}

.inputHeaders {
    width: 100%;
    display: flex;
    margin-top: 1.1rem;
}

.discriptionHolder {
    width: 45%;
    margin-right: 1rem;
}

.createtitle {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

.optionHolder {
    width: 45%;
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
    margin-right: 2rem;
    margin-top: 1rem;
    height: 2.6rem;
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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 500;
    color: white;
    margin: 10px;
    margin-top: 2rem;
}

.categoryBox {
    margin-top: 1rem;
}

.category {
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
    padding: 0px;
    padding-right: 1rem;
    background-color: white;
    height: 3rem;
    border-radius: 10px;
    color: #586380;
}

.content {
    border: .125rem solid #58638063;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    border-radius: 2rem;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.3);
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
    margin-right: 1rem;
}

.question:focus {
    outline: none;
    border-bottom: 5px solid rgb(22, 144, 248);
}

.answer {
    width: 60%;
    height: 100px;
    margin-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
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
    border-radius: 10px;
    color: #586380;
}

.answer:focus {
    outline: none;
    border-bottom: 5px solid rgb(22, 144, 248);
}

.tagHolder {
    margin-top: 1rem;
}

.addQuestionButton {
    padding: 1rem 3rem;
    background: rgb(46, 165, 46);
    border: none;
    border-color: #d9dde8;
    color: white;
    font-weight: 600;
    font-size: 1.3rem;
    border-bottom: 5px solid #58638063;
    border-radius: .5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 1rem;
}

.questionsList {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
}

.questionEditBox {
    border: 2px solid #586380;
    border-radius: 1rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    padding: 1.5rem;
    color: #586380;
    width: 100;
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
    margin-top: 1rem;
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

.loop {
    width: 100%;
}
</style>
