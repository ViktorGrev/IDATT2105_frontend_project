<template>
<Carousel v-bind="settings" :breakpoints="breakpoints">
    <Slide v-for="slide in quizzes" :key="slide.id">
      <div class="carousel__item" @click="navigateToUserProfile(slide.id)">
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
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
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
import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import HistoryBox from '../components/HistoryBoxComponent.vue'
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
    const quizzes = ref([]);
    const router = useRouter();
    const route = useRoute();
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

        const response = await axios.get('http://localhost:8080/api/quiz/recent', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken.trim()}`
          }
        });
        quizzes.value = response.data;
        console.log(quizzes);
        
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    }

    // Define the navigateToUserProfile method
    const navigateToUserProfile = (userId) => {
        console.log(userId);
        router.push({ name: 'play', params: { id: userId } });
    };

    onMounted(fetchQuizData)

    return {
      settings,
      breakpoints,
      quizzes,
      navigateToUserProfile,
    };
  }
})
</script>