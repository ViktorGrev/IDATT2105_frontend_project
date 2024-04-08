<template>
    <main>
      <div class="wrapper">
      <div id="formFrame">
          <h1>Feedback</h1>
      <form @submit.prevent="submitForm">
        <FormInput v-model="email" fieldName="Email" type="email"></FormInput>
        <br>
        <label for="feedback">Your feedback:</label>
        <textarea v-model="message" placeholder="Write here" rows="5" name="comment[text]" id="comment_text" cols="33"
          required></textarea>
        <button type="submit" class="btn">
          <span>Send</span>
        </button>
        <p v-if="submissionStatus">{{ submissionStatus }}</p>
      </form>
    </div>
    </div>
    </main>
  </template>

<script setup lang="ts">
import { ref } from 'vue';
import FormInput from '@/components/UserComponents/FormInput.vue';
import {sendFeedback} from "@/api/UserController";

const email = ref("");
const message = ref("");
const submissionStatus = ref("");

const submitForm = async () => {
  sendFeedback(email.value, message.value).then(response => {
    submissionStatus.value = "Feedback has been sent!";
  }).catch(error => {
    submissionStatus.value = error.response.data.message;
  });
};
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Poppins', sans-serif;
}

.wrapper {
  width: 60%;
  height: 100%;
  margin: 30px;
  margin-bottom: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

#formFrame {
  width: 400px;
  padding: 40px;
  border-radius: 50px;
  color: #101010;
}

label {
  font-size: 0.8rem;
  letter-spacing: 1px;
}

textarea {
  padding: 10px;
  max-width: 100%;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #999;
}

label {
  display: block;
  margin-bottom: 10px;
}

textarea {
  width: 500px;
  height: 100px;
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background: none repeat scroll 0 0 rgba(255, 255, 255, 0.151);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
  color: #555555;
  font-size: 0.9em;
  line-height: 1.4em;
  padding: 5px 8px;
  transition: background-color 0.2s ease 0s;
}


textarea:focus {
  background: none repeat scroll 0 0 #FFFFFF;
  outline-width: 0;
}

.btn {
  width: 11rem;
    height: 3rem;
    font-size: 1.3rem;
    text-transform: uppercase;
    color: #7e7f86;
    border: 0;
    background-color: #fff;
    border-radius: 2rem;
    cursor: pointer;
    margin: 1rem;
}

.btn:hover {
  box-shadow: rgba(87, 174, 250, 0.65) 0px 0px 0px 2px, rgba(87, 174, 250, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}
</style>