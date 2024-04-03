<template>
<main>
  <h2 style="color: #586380;">Recent quizz attemps</h2>
        <div class="slideShow">
            <Carousel>
                <Slide v-for="slide in slides" :key="slide.id">
                    <!-- Use the HistoryBox component inside the Slide -->
                    <HistoryBox>
                        <!-- Customize infoBoxContent slot -->
                        <template #infoBoxContent>
                        <p>{{ slide.info.title }}</p>
                        <p>{{ slide.info.questions }} Questions</p>
                        </template>
                        <!-- Customize creatorBoxContent slot -->
                        <template #creatorBoxContent>
                        {{ slide.creator }}
                        </template>
                    </HistoryBox>
                </Slide>

                <template #addons>
                <Navigation />
                <Pagination />
                </template>
            </Carousel>
        </div> 
</main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  font-family: 'Poppins', sans-serif;
}

.historyBox {
    padding: 10px;
    box-shadow: rgba(87, 174, 250, 0.25) 0px 25px 50px -12px;
    display: flex;
    border-radius: 1em;
    flex-direction: column;
    width: 100%;
    cursor: pointer;
}

.infoBox {
    flex-direction: column;
    font-size: 20px;
}
.creatorBox {
    color: rgb(21, 83, 137);
}

.test {
    width: 1000px;
    padding: 20px;
}

.slideShow {
    padding: 20px;
}
</style>

<script lang="ts">
import { Carousel, Navigation, Slide, Pagination } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import HistoryBox from '../components/HistoryBoxComponent.vue'
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';

export default {
  components: {
    Carousel,
    Slide,
    HistoryBox,
    Navigation
  },
  data() {
    return {
      slides: [
        { id: 1, info: { title: "The art of war 1", questions: 25 }, creator: "Vekaste" },
        { id: 2, info: { title: "The art of war 2", questions: 25 }, creator: "Vekaste" },
        { id: 3, info: { title: "The art of war 3", questions: 25 }, creator: "Vekaste" },
        { id: 4, info: { title: "The art of war 4", questions: 25 }, creator: "Vekaste" },

        // Add more slide data as needed
      ]
    };
  }
};


</script>