<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { search } from '@/api/UserController';
import { searchForQuiz } from '@/api/QuizController';

// Search word
const searchQuery = ref(null);

// Routing to quiz pressed
const router = useRouter();

// List that the quizzes will be added to
const quizzes = ref(null);
const users = ref(null);
const apiUrl = ref(null);

// Categories category
const categories = ['CHEMISTRY', 'CALCULUS', 'ENGINEERING', 'ALGEBRA', 'PHYSICS', 'BIOLOGY', 'LANGUAGE'];

// Handle keyup event to update search results only when Enter is pressed
const handleKeyUp = async (event) => {
    if (event.key === 'Enter') {
      generateLink('title', searchQuery.value);
      await fetchQuizData2(); // Wait for fetchQuizData to complete
      fetchUserData();
    }
};

// Function to fetch user data
async function fetchQuizData2() {
  try {
    searchForQuiz(searchQuery.value).then((response) => {
      quizzes.value = response.data;
    });
  } catch (error) {
    console.error("Failed to fetch quiz data:", error);
  }
}

// Function to fetch user data
async function fetchUserData() {
  try {
    search(searchQuery.value).then((response) => {
      users.value = response.data;
    });
  } catch (error) {
    console.error("Failed to fetch quiz data:", error);
  }
}

// Define the navigateToQuiz method
const navigateToQuiz = (quizID) => {
    router.push({ name: 'quiz', params: { id: quizID } });
};

// Define the navigateToQuiz method
const navigateToUser = (user) => {
    router.push({ name: 'profile', params: { username: user } });
};

// Update selected category when a button is clicked
const updateSelectedCategory = (category) => {
  generateLink('category', category);
  fetchQuizData2();
};

function generateLink(searchType: 'title' | 'category', query: string): void {
    const baseUrl: string = "http://localhost:8080/api/quiz/search";
    const restUrl: string = `${searchType}=${query}`
    apiUrl.value = restUrl;
}
</script>


<template>
<main>
    <div>
        <div class="SearchBox">
            <div class="container">
                <input type="text" id="searchField" v-model="searchQuery" placeholder="Search..." @keyup="handleKeyUp">
                <div class="search"></div>
            </div>
        </div>
        <div class="categoryButtons">
          <div class="category-box" id="categorybutton" v-for="category in categories" :key="category" @click="updateSelectedCategory(category)">
            {{ category }}
          </div>
        </div>
    </div>
    <div style="height: 50px;"></div>
    <div class="searchResults">
        <div class="contentBox">
          <h2 style="color: #6d6e72;">Quizzes</h2>
            <div class="quizz" v-for="quiz in quizzes" :key="quiz.id">
                <div class="quizzInfo" id="searchedQuizzes">
                    <p style="font-size: 30px;">Quizz: {{ quiz.title }}</p>
                </div>
                
                <div class="quizzPlay">
                    <img src="../../assets/image.png" alt="play" style="cursor: pointer;" @click="navigateToQuiz(quiz.id)">
                </div>
            </div>
          <h2 style="color: #6d6e72;">Users</h2>
          <div class="categoryButtons">
            <div class="category-box" id="searchedUsers" v-for="user in users" :key="user.id" @click="navigateToUser(user.username)">  
              {{ user.username }}
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
  align-items: center;
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
    width: 15%;
    height: auto;
    padding-right: 40px;
}

.categoryButtons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  align-items: center;
  justify-content: center;
  margin: 0 10%;
}

.category-box {
    flex: 1 0 21%;
    border: 2px solid #ddd;
    border-radius: 1em;
    padding: 20px;
    margin: 10px;
    background-color: #fff;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .category-box:hover {
    border-color: rgb(22, 144, 248);
    cursor: pointer;
  }
</style>