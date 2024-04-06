<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import History from '../../components/history.vue';
import LongTermHistoryComponent from '@/components/LongTermHistoryComponent.vue';
import {getByUsername} from "@/api/UserController";

const route = useRoute() // Use useRoute to access the current route details

let username = ref("");

async function fetchUserData() {
    
    try {
      const usernameParam = route.params.username[0];
        const response = await getByUsername(usernameParam);
        console.log(response.data);
        username.value = response.data.username;
    } catch (error) {
        console.error("Failed to fetch quiz data:", error);
    }
}

// Fetch quiz data when component mounts
onMounted(() => {
    console.log("Hallo")
    fetchUserData(); // Fetch quiz with ID 10
});
</script>

<template>
    <main>
        <div class="wrapper">
            <div class="contentBox">
                <div class="Name">{{ username }}</div>
                <div class="buttonBox">
                    <button class="buttonStyle">Add friend</button>
                    <button class="buttonStyle">Remove freind</button>
                </div>
                <div class="libraryList">
                    <h2 style="color: #6d6e72; font-family: 'Poppins', sans-serif;">Recent quizzes played</h2>
                    <History></History>
                    <h2 style="color: #6d6e72; font-family: 'Poppins', sans-serif;">All quizz attemps</h2>
                    <LongTermHistoryComponent></LongTermHistoryComponent>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
}

.contentBox {
    width: 80%;
    
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 3rem;
}

.Name {
    display: flex;
    justify-content: left;
    flex-direction: column;
    align-items: left;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 5rem;
    margin: 10px;
    color: #6d6e72;
}

.libraryTitle {
    display: flex;
    justify-content: left;
    flex-direction: column;
    align-items: left;
    font-family: sans-serif;
    font-weight: 700;
    font-size: 2rem;
    margin: 2rem;
    color: #586380;
    font-family: 'Poppins', sans-serif;
}

.buttonBox {
    display: flex;
    justify-content: center;
    align-items: center;
}

.buttonStyle {
    width: 11rem;
    height: 3rem;
    font-family: "Rubik", sans-serif;
    font-size: 1.3rem;
    text-transform: uppercase;
    color: #7e7f86;
    border: 0;
    background-color: #fff;
    border-radius: 2rem;
    cursor: pointer;
    margin: 1rem;
}

.buttonStyle:hover {
    box-shadow: rgba(87, 174, 250, 0.65) 0px 0px 0px 2px, rgba(87, 174, 250, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}
</style>
