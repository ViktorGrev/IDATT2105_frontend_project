<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    question: Object,
    index: Number,
});

const emits = defineEmits(['updateQuestion', 'deleteQuestion', 'setCorrectAnswer', 'handleImageUpload']);

const updateQuestionText = (text: string) => {
    emits('updateQuestion', { ...props.question, questionText: text });
};

const deleteQuestion = () => {
    emits('deleteQuestion', props.question.id);
};

const updateCorrectAnswer = (answerIndex) => {
    emits('setCorrectAnswer', props.question.id, answerIndex);
};

const uploadImage = (event: any) => {
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
</script>

<template>
    <div id="answerAddSplitter">
        <div v-for="option in question.options" class="answerRow">
            <button id="removeOption" @click="removeAnswerOption(option.id)">X</button>
            <input class="answersField" v-model="option.correct" :placeholder="`Answer ${ansIndex + 1}`">
            <div>
                <input type="checkbox" class="option-input checkbox" :name="`correctAnswer-${question.id}`"
                    :value="ansIndex" @change="option(ansIndex)"
                    :checked="question.correctAnswerIndices.includes(ansIndex)">
            </div>
        </div>
    </div>
    <div>
        <button id="addOption" @click="addAnswerOption">+ Add Option</button>
    </div>
</template>