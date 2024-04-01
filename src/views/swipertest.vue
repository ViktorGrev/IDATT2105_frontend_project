<template>
    <div class="swiper-container">
        <swiper
        class="customSwiper"
        :modules="modules"
        :slides-per-view="4"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :loop="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        >
        <swiper-slide><img src="https://wallpapers.com/images/hd/wooden-cottage-sea-high-resolution-d7fahhz6phtkdveh.jpg" alt="test"></swiper-slide>
        <swiper-slide><img src="https://wallpapers.com/images/hd/wooden-cottage-sea-high-resolution-d7fahhz6phtkdveh.jpg" alt="test"></swiper-slide>
        <swiper-slide><img src="https://wallpapers.com/images/hd/wooden-cottage-sea-high-resolution-d7fahhz6phtkdveh.jpg" alt="test"></swiper-slide>
        <swiper-slide><img src="https://wallpapers.com/images/hd/wooden-cottage-sea-high-resolution-d7fahhz6phtkdveh.jpg" alt="test"></swiper-slide>
        <swiper-slide><img src="https://wallpapers.com/images/hd/wooden-cottage-sea-high-resolution-d7fahhz6phtkdveh.jpg" alt="test"></swiper-slide>
        <swiper-slide><img src="https://wallpapers.com/images/hd/wooden-cottage-sea-high-resolution-d7fahhz6phtkdveh.jpg" alt="test"></swiper-slide>
        <swiper-slide><img src="https://wallpapers.com/images/hd/wooden-cottage-sea-high-resolution-d7fahhz6phtkdveh.jpg" alt="test"></swiper-slide>
        <swiper-slide><img src="https://wallpapers.com/images/hd/wooden-cottage-sea-high-resolution-d7fahhz6phtkdveh.jpg" alt="test"></swiper-slide>
        </swiper>
    </div>


    
  </template>

<style>
.swiper-slide {
  transition: all 300ms ease-in-out;
  border-radius: 5px;
}

.swiper-slide img {
  border-radius: 5px;
  max-width: 18rem;
  cursor: grab;
}

.swiper-slide img:active {
  cursor: grabbing;
}

.swiper-slide:hover {
  transform: scale(1.5);
  transition: all 300ms ease-in-out;
  transition-delay: 300ms;
  z-index: 1;
}

.swiper-slide:hover img {
  transition-delay: 300ms;
  box-shadow: 0 0 5px 1px rgba(0,0,0,0.5);
}

.swiper-container {
  max-width: 100%; /* Set the max width of the swiper container */
  overflow: hidden; /* Hide the overflow */
  /* Add any additional styling you need for the container */
}
</style>

<script lang="ts">
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
};
  </script>