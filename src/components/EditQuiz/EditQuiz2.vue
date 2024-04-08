<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import QuestionChangeBox from './QuestionChangeBox.vue';
import { editQuiz, quiz } from '@/api/QuizController';
import { onMounted } from 'vue';

const quizData = ref([]);
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

const trueOrFalseQuestion = reactive([
    {
        id: 1,
        text: '',
        true: false,
        type: "TRUE_FALSE",
        image: null,
    }
]);

const multipleChoiceQuestion = reactive([
    {
        id: 1,
        text: '',
        options: [],
        type: "MULTIPLE_CHOICE",
        image: null,
    }
]);

const fillInTheBlankQuestion = reactive([
    {
        id: 1,
        text: '',
        solution: '',
        type: "FILL_IN_THE_BLANK",
        image: null,
    }
]);

onMounted(async () => {
        quiz(58).then(response => {
            console.log(JSON.stringify(response.data, null, 2));
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

    /*trueOrFalseQuestion.splice(0, trueOrFalseQuestion.length);
    multipleChoiceQuestion.splice(0, multipleChoiceQuestion.length);
    fillInTheBlankQuestion.splice(0, fillInTheBlankQuestion.length);
    data.questions.forEach((question: any) => {
        switch (question.type) {
            case 'TRUE_FALSE':
                trueOrFalseQuestion.push({
                    id: question.id,
                    text: question.text,
                    true: question.true,
                    type: question.type,
                    image: question.image,
                });
                break;
            case 'MULTIPLE_CHOICE':
                multipleChoiceQuestion.push({
                    id: question.id,
                    text: question.text,
                    options: question.options.map((option: any) => ({
                        id: option.id,
                        optionText: option.text,
                        correct: option.correct,
                    })),
                    type: question.type,
                    image: question.image,
                });
                break;
            case 'FILL_IN_THE_BLANK':
                fillInTheBlankQuestion.push({
                    id: question.id,
                    text: question.text,
                    solution: question.solution,
                    type: question.type,
                    image: question.image,
                });
                break;
        }
    });*/
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

const triggerQuizImageUpload = () => {
    quizImageInput.value.click();
};

const handleQuizImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Store the Base64 string
            quizImage.value = reader.result;
        };
        reader.readAsDataURL(file); // Converts the file to Base64
    }
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


const importQuiz = () => {
    fileInput.value.click();
};

const triggerFileInput = () => {
    fileInput.value.click();
};
</script>


<template>
    <main>
        <div class="box">
            <div class="title">
                <div class="createtitle">
                    <h1>Create a new Study Set</h1> <button @click="createQuiz" class="createButton">Create</button>
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
                    <button class="titleButton" @click="triggerFileInput">+ Import CSV</button>
                    <input type="file" ref="fileInput" @change="importQuiz" accept=".csv" style="display:none">

                    <button @click="toggleRandom" class="titleButton">
                        Randomize Answers: {{ randomLabel() }}
                    </button>

                    <button @click="triggerQuizImageUpload" class="titleButton">
                        + Quiz Image
                    </button>
                    <input type="file" ref="quizImageInput" @change="handleQuizImageUpload" accept="image/*"
                        style="display:none">

                    <div class="coAuthorHolder">
                        <label for="coAuthorInput" class="titleLabel">Co-Authors:</label>
                        <div>
                            <input id="coAuthorInput" class="tagInput" placeholder="Add a co-author's name"
                                v-model="quizCoAuthorInput">
                            <button class="titleButton" @click="addCoAuthor">Add Co-Author</button>
                        </div>
                        <div class="tagsDisplay">
                            <span v-for="(author, index) in quizCoAuthors" :key="index" class="tag">
                                {{ author }}
                                <button @click="removeCoAuthor(author)">x</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contentCreation">
                <div id="questionsTitle">Questions</div>
                <div class="questionsList">
                    <QuestionChangeBox v-for="(question, index) in quizQuestions.value" :key="question.id" :question="question"
                        :index="index" @updateQuestion="handleUpdateQuestion" @deleteQuestion="deleteQuestion"
                        @setCorrectAnswer="setCorrectAnswer" @handleImageUpload="handleImageUpload" />
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
</style>
