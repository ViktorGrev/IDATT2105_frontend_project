<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import axios from 'axios';
import QuestionEditBox from './QuestionEditBox.vue';

const quizTitle = ref('');
const quizTags = ref([]); // Array to hold tags
const quizTagInput = ref(''); // New ref for the tag input field
const quizDescription = ref('');
const quizCategory = ref(''); // Default category is empty
const quizRandomization = ref(false);
defineProps(['question']);

const questions = reactive([
    {
        id: 1,
        questionText: '',
        answers: ['', '', '', ''], // Default for multiple choice
        correctAnswerIndex: null,
        type: 'multipleChoice', // Default question type
        image: null,
    }
]);

const currentQuestionId = ref(questions[0].id);

const addQuestion = (type = 'multipleChoice') => {
    const nextId = questions.length === 0 ? 1 : Math.max(...questions.map(q => q.id)) + 1;
    let answers = ['', '', '', ''];
    if (type === 'trueFalse') {
        answers = ['True', 'False'];
    } else if (type === 'fillInBlank') {
        answers = [''];
    }
    questions.push({
        id: nextId,
        questionText: '',
        answers: answers,
        correctAnswerIndex: 0, // For fill-in-the-blank, the first index will always be the correct answer
        type: 'multipleChoice'
    });
    currentQuestionId.value = nextId;
};

const findQuestionById = (id) => {
    return questions.find(q => q.id === id);
};

const deleteQuestion = (id) => {
    console.log(`Deleting question with id: ${id}`);
    const index = questions.findIndex(q => q.id === id);
    if (index !== -1) {
        questions.splice(index, 1);
        if (currentQuestionId.value === id) {
            currentQuestionId.value = questions.length > 0 ? questions[0].id : null;
        }
    }
};

const addTag = () => {
    // Prevent adding duplicate or empty tags
    if (!quizTags.value.includes(quizTagInput.value) && quizTagInput.value.trim() !== '') {
        quizTags.value.push(quizTagInput.value.trim());
        quizTagInput.value = ''; // Clear the input field after adding the tag
    }
};

// Method to remove a tag
const removeTag = (tagToRemove) => {
    quizTags.value = quizTags.value.filter(tag => tag !== tagToRemove);
};

const toggleRandomization = () => {
    quizRandomization.value = !quizRandomization.value;
};

const randomizationLabel = () => {
    return quizRandomization.value ? "On" : "Off";
};

const handleImageUpload = (event, questionId) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const question = findQuestionById(questionId);
            if (question) {
                question.image = e.target.result; // Assign the base64 string to the question's image property
            }
        };
        reader.readAsDataURL(file);
    }
};

const setCorrectAnswer = (questionId, answerIndex) => {
    const question = findQuestionById(questionId);
    if (question) {
        question.correctAnswerIndex = question.correctAnswerIndex === answerIndex ? null : answerIndex;
    }
};

const createQuiz = async () => {
    const formattedQuestions = questions.map((q) => {
        // Construct the base question object without the image property
        let question = {
            text: q.questionText,
            type: q.type.replace('multipleChoice', 'MULTIPLE_CHOICE')
                .replace('trueFalse', 'TRUE_FALSE')
                .replace('fillInBlank', 'FILL_IN_THE_BLANK'),
        };

        // Add question-specific properties
        switch (q.type) {
            case 'multipleChoice':
                question.options = q.answers.map((answer, index) => ({
                    optionText: answer,
                    correct: index === q.correctAnswerIndex,
                }));
                break;
            case 'trueFalse':
                question.true = q.correctAnswerIndex === 0; // Assuming 0 is for 'True' and 1 is for 'False'
                break;
            case 'fillInBlank':
                question.solution = q.answers[0]; // Assuming the first entry in the answers array is the solution
                break;
            default:
            // Optionally handle unrecognized question types or leave as is
        }

        // Conditionally add the image property if it exists
        if (q.image) {
            question.image = q.image;
        }

        return question;
    });

    const quiz = {
        title: quizTitle.value,
        category: quizCategory.value,
        description: quizDescription.value,
        tags: quizTags.value, // Assuming you want to split tags by commas into an array
        random: quizRandomization.value, // Assuming this is a checkbox and you want a boolean value
        questions: formattedQuestions,
    };

    console.log(JSON.stringify(quiz, null, 2));

    const response = await axios.post('http://localhost:8080/api/quiz', 
      quiz
    , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization ': "Bearer " + sessionStorage.getItem("userToken")
      }
    });

    console.log(response.data);
};

const handleUpdateQuestion = (updatedQuestion) => {
    const questionIndex = questions.findIndex(q => q.id === updatedQuestion.id);
    if (questionIndex !== -1) {
        questions[questionIndex] = updatedQuestion;
    }
};




const fileInput = ref(null);

const triggerFileInput = () => {
    fileInput.value.click();
};

import Papa from 'papaparse';

const importQuiz = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        const file = files[0];
        Papa.parse(file, {
            complete: (result) => {
                console.log('Parsed:', result);
                if (result.data.length > 1) {
                    // Clear existing quiz data
                    quizTitle.value = result.data[1][0];
                    quizDescription.value = result.data[1][1];
                    quizTags.value = result.data[1][2].split(',').map(tag => tag.trim());
                    quizCategory.value = result.data[1][3];
                    quizCategory.value = result.data[1][3];
                    quizRandomization.value = result.data[1][4].toLowerCase() === 'yes';
                    questions.splice(0, questions.length); // Remove all existing questions

                    // Skip the first 3 rows (column headers and quiz metadata)
                    const questionRows = result.data.slice(3);

                    questionRows.forEach((row, index) => {
                        if (row.length === 0 || row[0] === '') return; // Skip empty rows
                        const rawType = row[0].toLowerCase().replace(/[^a-zA-Z]+/g, '');
                        const questionText = row[1];
                        let answers = [];
                        let correctAnswerIndex = null;
                        let type;

                        switch (rawType) {
                            case "multiplechoice":
                                type = "multipleChoice";
                                answers = row.slice(3); // Adjusted to start from the 4th column for answers
                                correctAnswerIndex = answers.indexOf(row[2]); // Correct answer is in the 3rd column
                                if (correctAnswerIndex === -1) { // Handle cases where the correct answer might not match due to case sensitivity or trimming issues
                                    correctAnswerIndex = answers.findIndex(answer => answer.trim().toLowerCase() === row[2].trim().toLowerCase());
                                }
                                break;
                            case "truefalse":
                                type = "trueFalse";
                                answers = ['True', 'False'];
                                correctAnswerIndex = row[2].trim().toLowerCase() === "true" ? 0 : 1;
                                break;
                            case "fillintheblank":
                                type = "fillInBlank";
                                answers = [row[2]]; // Correctly assigns the direct answer for fill-in-the-blank
                                correctAnswerIndex = 0; // Only one correct answer for fill-in-the-blank
                                break;
                            default:
                                // Optionally handle other cases or unsupported types
                                return;
                        }

                        questions.push({
                            id: questions.length + 1,
                            questionText,
                            answers,
                            correctAnswerIndex,
                            image: null,
                            type
                        });
                    });

                    // Automatically select the first question after import
                    if (questions.length > 0) {
                        currentQuestionId.value = questions[0].id;
                    }
                }
            },
            header: false
        });
    }
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
                        <textarea aria-label="Description" class="descriptionInput"
                            placeholder="Enter a description for the quiz" type="text"
                            v-model="quizDescription"></textarea>
                    </div>
                    <div class="optionHolder">
                        <label for="categoryDiv" class="titleLabel">Category:</label>
                        <div class="categoryBox" id="categoryDiv">
                            <select v-model="quizCategory" class="category">
                                <option disabled value="">Select a category</option>
                                <option>Science</option>
                                <option>MATH</option>
                                <option>History</option>
                                <option>Literature</option>
                                <option>Art</option>
                            </select>
                        </div>
                        <div class="tagHolder">
                            <label for="tagInput" class="tagLabel">Tag:</label>
                            <div>
                                <input id="tagInput" class="tagInput"
                                    placeholder="Add a tag for the Quiz, like “IDATT2105”" v-model="quizTagInput">

                                <button class="titleButton" @click="addTag">Apply Tag</button>
                                <!-- Display added tags -->
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
                    <button class="titleButton" @click="triggerFileInput">+ Import</button>
                    <input type="file" ref="fileInput" @change="importQuiz" accept=".csv" style="display:none">

                    <button @click="toggleRandomization" class="titleButton">
                        Randomize Answers: {{ randomizationLabel() }}
                    </button>
                </div>
            </div>

            <div class="contentCreation">
                <div id="questionsTitle">Questions</div>
                <div class="questionsList">
                    <QuestionEditBox v-for="(question, index) in questions" :key="question.id" :question="question"
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
    margin-bottom: 0.5rem;
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

.questionTypeSelector {
    width: 100%;
    color: #586380;
    font-size: 1.5rem;
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}


/* Question type */


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
    display: flex;
    content: '\f00c';
    font-size: 25px;
    font-weight: bold;
    position: absolute;
    align-items: center;
    justify-content: center;
    font-family: 'Font Awesome 5 Free';
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

/*Dropdown*/

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

/* Custom Select wrapper */
.select {
    position: relative;
    display: flex;
    width: min(20rem, 90vw);
    background: linear-gradient(to left, white 3rem, white 3rem);
    border-radius: 0.25rem;
    overflow: hidden;
    color: #586380;
    font-size: 2rem;
    margin-left: 1rem;

    select {
        flex: 1;
        padding: 1em;
        cursor: pointer;
    }

    &::after {
        content: "\25BC";
        position: absolute;
        right: 1rem;
        transition: 0.25s all ease;
        pointer-events: none;
    }

    &:hover::after {
        color: #f39c12;
        animation: bounce 0.5s infinite;
    }
}

@keyframes bounce {
    25% {
        transform: translatey(5px);
    }

    75% {
        transform: translatey(-5px);
    }
}

option {
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: normal;
    line-height: 1.5;
}



.tagsDisplay {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}

.tag {
    margin: 5px;
    padding: 5px 10px;
    background-color: #efefef;
    border-radius: 15px;
}

.tag button {
    margin-left: 5px;
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.tagHolder {
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
    flex-direction: column;
}

.imageHolder {
    display: flex;
    justify-content: start;
    width: 100%;
    color: #586380;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.questionEditBox {
    border: 2px solid #586380;
    border-radius: 1rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    padding: 1.5rem;
    color: #586380;
    width: 100%;
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
    justify-content: center;
    align-items: center;
}
</style>