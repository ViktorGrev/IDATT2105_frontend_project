<template>
  <!--If the quizzes are loaded in, this will show-->
  <div v-if="quizzes">
    <div v-if="noRecentAttempts" style="color: #6d6e72;">
      You have no recent attempts. Try to play some quizzes!
    </div>
    <div v-else>
      <Carousel v-bind="settings" :breakpoints="breakpoints">
      <Slide v-for="slide in quizzes" :key="slide.id">
        <div class="carousel__item" id="item" @click="navigateToUserProfile(slide.id)">
          <div class="infoBox">
            {{ slide.title }}
            <br>
            {{ slide.description }}
          </div>
          <div class="creatorBox">
            {{ slide.creator.username }}
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
    </div>
    
  </div>

  <!--If the quizzes are not loaded in, this will show-->
  <div v-else>
    <Carousel v-bind="settings" :breakpoints="breakpoints">
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item" id="item">
          <div class="infoBox">
            Loading
            <br>
            
          </div>
          <div class="creatorBox">
            
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
</div>

</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  font-family: 'Poppins', sans-serif;
}

.slideShow {
    padding: 20px;
    max-width: 100%;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background-color: white;
  background-image: linear-gradient(-135deg, transparent 85%, rgb(22, 144, 248) 100%),
  linear-gradient(45deg, transparent 85%, #f6e8bb 100%);
}

.carousel__item:hover {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.infoBox {
    flex-direction: column;
    font-size: 20px;
    height: 50%;
}
.creatorBox {
    color: rgb(21, 83, 137);
    height: 50%;
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';


export default defineComponent({
  name: 'Breakpoints',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  setup() {
    const quizzes = ref(null);
    const router = useRouter();
    const noRecentAttempts = ref(null);
    // Define reactive properties
    const settings = ref({
      itemsToShow: 1,
      snapAlign: 'center',
    });

    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    const breakpoints = ref({
      // 700px and up
      700: {
        itemsToShow: 2.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 3.5,
        snapAlign: 'start',
      },
    });

    // Function to fetch quiz data
    async function fetchQuizData() {
      try {
        const userToken = sessionStorage.getItem("userToken");
        if (!userToken) {
          throw new Error("User token not found in session storage.");
        }

        const response = await axios.post('http://localhost:8080/api/quiz/search?title=test', {} ,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken.trim()}`
          }
        });
        quizzes.value = response.data;
        if (quizzes.value.length === 0) {
          noRecentAttempts.value = 1;
        }
        
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    }

    // Define the navigateToUserProfile method
    const navigateToUserProfile = (userId) => {
        console.log(userId);
        router.push({ name: 'quiz', params: { id: userId } });
    };

    onMounted(fetchQuizData)

    return {
      settings,
      breakpoints,
      quizzes,
      navigateToUserProfile,
      noRecentAttempts,
    };
  }
})
</script>