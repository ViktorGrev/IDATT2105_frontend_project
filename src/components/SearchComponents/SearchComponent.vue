<script setup lang="ts">
import { ref } from "vue";
import debounce from 'lodash/debounce';
import axios from 'axios';
import { useRouter } from 'vue-router';

//Search word
const searchQuery = ref('');

//Routing to quiz pressed
const router = useRouter();

//List that the quizzes will be addded to
const quizzes = ref([]);

// Filtered quizzes based on search query
const filteredQuizzes = ref(null);

// Function to update filtered quizzes
const updateFilteredQuizzes = () => {
    filteredQuizzes.value = quizzes.value.filter(quiz => {
        return quiz.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    }).slice(0, 10);
};

// Debounce the update function to improve performance
const debouncedUpdate = debounce(updateFilteredQuizzes, 0);

// Handle keyup event to update search results only when Enter is pressed
const handleKeyUp = async (event) => {
    if (event.key === 'Enter') {
        await fetchQuizData(); // Wait for fetchQuizData to complete
        debouncedUpdate();
    }
};

//Method to get quiz data
async function fetchQuizData() {
  try {
    const userToken = sessionStorage.getItem("userToken");
    if (!userToken) {
      throw new Error("User token not found in session storage.");
    }

    const response = await axios.get('http://localhost:8080/api/quiz/recent', {
      headers: {
    'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken.trim()}`
      }
    });
    quizzes.value = response.data;
    
  } catch (error) {
    console.error("Failed to fetch quiz data:", error);
  }
}

// Define the navigateToUserProfile method
const navigateToUserProfile = (quizID) => {
    router.push({ name: 'quiz', params: { id: quizID } });
};
</script>

<template>
<main>
    <div>
        <div class="SearchBox">
            <div class="container">
                <input type="text" v-model="searchQuery" placeholder="Search..." @keyup="handleKeyUp">
                <div class="search"></div>
            </div>
        </div>
    </div>
    <div style="height: 50px;"></div>
    <div class="searchResults">
        <div class="contentBox">
            <div class="quizz" v-for="quiz in filteredQuizzes" :key="quiz.id">
                <div class="quizzInfo">
                    <p style="font-size: 30px;">Quizz: {{ quiz.title }}</p>
                </div>
                
                <div class="quizzPlay">
                    <img src="../../assets/rizzletRpng.png" alt="play" style="cursor: pointer;" @click="navigateToUserProfile(quiz.id)">
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.SearchBox {
    padding-top: 20px;
}

.contentBox {
  width: 90%;
  font-size: 25px;
}


.searchResults {
  width: 100%;
  font-size: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.container {
  position: relative;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  height: 100px;
  .search {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 80px;
    background: rgb(22, 144, 248);
    border-radius: 50%;
    transition: all 1s;
    z-index: 4;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.4);
    &:hover {
      cursor: pointer;
    }
    &::before {
      content: "";
      position: absolute;
      margin: auto;
      top: 22px;
      right: 0;
      bottom: 0;
      left: 22px;
      width: 12px;
      height: 2px;
      background: white;
      transform: rotate(45deg);
      transition: all .5s;
    }
    &::after {
      content: "";
      position: absolute;
      margin: auto;
      top: -5px;
      right: 0;
      bottom: 0;
      left: -5px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: 2px solid white;
      transition: all .5s;
    }
  }
  input {
    font-family: 'Inconsolata', monospace;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 50px;
    outline: none;
    border: none;
    background: rgb(22, 144, 248);
    color: white;
    text-shadow: 0 0 10px rgb(22, 144, 248);
    padding: 0 80px 0 20px;
    border-radius: 30px;
    box-shadow: 0 0 25px 0 rgb(22, 144, 248),
                0 20px 25px 0 rgba(0, 0, 0, 0.2);
    transition: all 1s;
    opacity: 0;
    z-index: 5;
    font-weight: bolder;
    letter-spacing: 0.1em;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      width: 300px;
      opacity: 1;
      cursor: text;
    }
    &:focus ~ .search {
      right: -250px;
      background: #151515;
      z-index: 6;
      &::before {
        top: 0;
        left: 0;
        width: 25px;
      }
      &::after {
        top: 0;
        left: 0;
        width: 25px;
        height: 2px;
        border: none;
        background: white;
        border-radius: 0%;
        transform: rotate(-45deg);
      }
    }
    &::placeholder {
      color: white;
      opacity: 0.5;
      font-weight: bolder;
    }
  }
}

.quizz {
    display: flex;
    width: 100%;
    box-shadow: 5px 5px 5px #88888845;
    border-radius: 1em;
    background-image: linear-gradient(90deg, rgba(245,245,245,1) 78%, rgba(22,144,248,1) 100%);
    height: 150px;
    justify-content: center;
    text-align: left;
    margin-bottom: 20px;
}

.quizzInfo {
    flex: 0 0 50%;
  font-size: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 30px;
}
.quizzExtendButton {
    flex: 0 0 10%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.quizzPlay {
    flex: 0 0 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.quizzPlay img {
    width: 20%;
    height: auto;
}
</style>