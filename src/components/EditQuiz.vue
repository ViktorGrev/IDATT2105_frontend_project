<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import QuestionChangeBox from './QuestionChangeBox.vue';
import { create, quiz } from '@/api/QuizController';
import { onMounted } from 'vue';

const quizTitle = ref('');
const quizTags = ref([]); // Array to hold tags
const quizTagInput = ref(''); // New ref for the tag input field
const quizDescription = ref('');
const quizCategory = ref(''); // Default category is empty
const quizRandomization = ref(false);
const quizImage = ref(null);
const quizCoAuthors = ref([]); // New state for storing co-authors
const quizCoAuthorInput = ref('');
defineProps(['question']);

const routerView = useRouter();

const questions = reactive([
    {
        id: 1,
        questionText: '',
        answers: ['', '', '', ''],
        correctAnswerIndices: [], // Changed from correctAnswerIndex to an array
        type: 'multipleChoice',
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
        correctAnswerIndices: [0],
        type: 'multipleChoice'
    });
    currentQuestionId.value = nextId;
};

onMounted(async () => {
    const quizId = router.currentRoute.value.params.id; // Or use `useRoute` if inside a setup function
        quiz(57).then(response => {
            populateFormWithData(response.data);
        }).catch(error => {
            console.error('Quiz fetch error:', error);
        });
});

function populateFormWithData(data) {
    quizTitle.value = data.title;
    quizCategory.value = data.category;
    quizDescription.value = data.description;
    quizTags.value = data.tags;
    quizRandomization.value = data.random;
    quizImage.value = data.image;
    quizCoAuthors.value = data.coAuthors;

    // Replace placeholder questions with actual data
    questions.splice(0, questions.length, ...data.questions.map((q, index) => {
        // Handling for "TRUE_FALSE" questions to store the 'true' value as a correctAnswerIndices
        let correctAnswerIndices = [];
        if (q.type === "TRUE_FALSE") {
            correctAnswerIndices = q.true ? true : false; // If 'true' is true, the correct answer is 'True' (index 0), else 'False' (index 1)
        } else if (q.options) {
            correctAnswerIndices = q.options.flatMap((option, index) => option.correct ? [index] : []);
        }
        return {
            id: index + 1,
            questionText: q.text,
            answers: q.type === "TRUE_FALSE" ? ['True', 'False'] : q.options?.map(option => option.optionText) || [q.solution],
            type: q.type.toLowerCase().replace('multiple_choice', 'multipleChoice').replace('true_false', 'trueFalse').replace('fill_in_the_blank', 'fillInBlank'),
            correctAnswerIndices: correctAnswerIndices,
            image: q.image,
        };
    }));
    console.log(JSON.stringify(questions, null, 2));
}

const findQuestionById = (id) => {
    return questions.find(q => q.id === id);
};

const deleteQuestion = (id) => {
    const index = questions.findIndex(q => q.id === id);
    if (index !== -1) {
        questions.splice(index, 1);
        if (currentQuestionId.value === id) {
            currentQuestionId.value = questions.length > 0 ? questions[0].id : null;
        }
    }
};

const addTag = () => {
    if (!quizTags.value.includes(quizTagInput.value) && quizTagInput.value.trim() !== '') {
        quizTags.value.push(quizTagInput.value.trim());
        quizTagInput.value = ''; // Clear the input field after adding the tag
    }
};

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
        reader.onloadend = () => {
            const question = findQuestionById(questionId);
            if (question) {
                // Store the Base64 string
                question.image = reader.result;
            }
        };
        reader.readAsDataURL(file); // Converts the file to Base64
    }
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


const quizImageInput = ref(null);

const triggerQuizImageUpload = () => {
    quizImageInput.value.click();
};

const setCorrectAnswer = (questionId, answerIndex) => {
    const question = findQuestionById(questionId);
    if (question) {
        if (question.type === 'trueFalse') {
            // For TRUE_FALSE, ensure only one correct answer can be set
            question.correctAnswerIndices = [answerIndex];
        } else {
            // For MULTIPLE_CHOICE or other types allowing multiple correct answers
            const index = question.correctAnswerIndices.indexOf(answerIndex);
            if (index > -1) {
                question.correctAnswerIndices.splice(index, 1);
            } else {
                question.correctAnswerIndices.push(answerIndex);
            }
        }
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

        switch (q.type) {
            case 'multipleChoice':
                question.options = q.answers.map((answer, index) => ({
                    optionText: answer,
                    correct: q.correctAnswerIndices.includes(index),
                }));
                break;
            case 'trueFalse':
                question.true = q.correctAnswerIndex === 0;
                break;
            case 'fillInBlank':
                question.solution = q.answers[0];
                break;
            default:
        }

        if (q.image) {
            question.image = q.image;
        }

        return question;
    });

    const quiz = {
        title: quizTitle.value,
        category: quizCategory.value,
        description: quizDescription.value,
        tags: quizTags.value,
        random: quizRandomization.value,
        image: quizImage.value,
        coAuthors: quizCoAuthors.value,
        questions: formattedQuestions,
    };

    console.log(JSON.stringify(quiz, null, 2));

    create(quiz).then(response => {
        routerView.push({ name: 'quiz', params: { id: response.data.id } });
    }).catch(error => {
        console.error('Quiz creation error:', error);
    });
};

const handleUpdateQuestion = (updatedQuestion) => {
    const questionIndex = questions.findIndex(q => q.id === updatedQuestion.id);
    if (questionIndex !== -1) {
        questions[questionIndex] = updatedQuestion;
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

const fileInput = ref(null);

const triggerFileInput = () => {
    fileInput.value.click();
};

import Papa from 'papaparse';
import router from '@/router';

const importQuiz = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        const file = files[0];
        Papa.parse(file, {
            delimiter: ";", // Specifying the delimiter as semicolon
            complete: (result) => {
                if (result.data.length > 1) {
                    // Parse quiz metadata
                    quizTitle.value = result.data[1][0];
                    quizDescription.value = result.data[1][1];
                    quizTags.value = result.data[1][2].split(',').map(tag => tag.trim());
                    quizCategory.value = result.data[1][3];
                    quizRandomization.value = result.data[1][4].toLowerCase() === 'yes';

                    // Clear existing questions
                    questions.splice(0, questions.length);

                    // Parse questions
                    for (let i = 3; i < result.data.length; i++) {
                        const row = result.data[i];
                        if (row.length === 0 || row[0] === '') continue; // Skip empty rows
                        let type, questionText, answers, correctAnswerIndices = [];

                        switch (row[0].toUpperCase()) {
                            case "MULTIPLE_CHOICE":
                                type = "multipleChoice";
                                questionText = row[1];
                                answers = row.slice(3); // Adjust for your CSV format
                                let correctAnswer = row[2]; // Assuming correct answer is provided
                                let correctIndex = answers.findIndex(ans => ans.trim().toLowerCase() === correctAnswer.trim().toLowerCase());
                                if (correctIndex !== -1) correctAnswerIndices.push(correctIndex);
                                break;
                            case "TRUE_FALSE":
                                type = "trueFalse";
                                questionText = row[1];
                                answers = ["True", "False"];
                                correctAnswerIndices = [row[2].trim().toLowerCase() === "true" ? 0 : 1];
                                break;
                            case "FILL_IN_THE_BLANK":
                                type = "fillInBlank";
                                questionText = row[1];
                                answers = [row[2]]; // Direct answer
                                correctAnswerIndices = [0]; // Single correct answer
                                break;
                        }

                        // Push the parsed question
                        questions.push({
                            id: questions.length + 1,
                            questionText,
                            answers,
                            correctAnswerIndices, // Adjust to use an array for indices
                            type,
                            image: null,
                        });
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
                    <button class="titleButton" @click="triggerFileInput">+ Import CSV</button>
                    <input type="file" ref="fileInput" @change="importQuiz" accept=".csv" style="display:none">

                    <button @click="toggleRandomization" class="titleButton">
                        Randomize Answers: {{ randomizationLabel() }}
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
                    <QuestionChangeBox v-for="(question, index) in questions" :key="question.id" :question="question"
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