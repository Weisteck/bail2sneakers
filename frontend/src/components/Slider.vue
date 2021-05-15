<template>
  <carousel :autoplay="5000" :wrap-around="true">
    <slide v-for="image in images">
      <img :src="image" alt="productImage" class="object-contain h-96 w-full">
    </slide>
    <template #addons>
      <navigation/>
      <pagination/>
    </template>
  </carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: 'Slider',
  props: [ 'images' ],
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      // count of items to showed per view
      itemsToShow: {
        default: 1,
        type: Number,
      },
// slide number number of initial slide
      currentSlide: {
        default: 0,
        type: Number,
      },
// control infinite scrolling mode
      wrapAround: {
        default: false,
        type: Boolean,
      },
// control snap position alignment
      snapAlign: {
        default: 'center',
        validator() {
          // The value must match one of these strings
          return [ 'start', 'end', 'center' ].includes(value);
        },
      },
// sliding transition time in ms
      transition: {
        default: 10,
        type: Number,
      },
// an object to pass all settings
      settings: {
        default() {
          return {};
        },
        type: Object,
      },
// an object to store breakpoints
      breakpoints: {
        default: null,
        type: Object,
      },
// time to auto advance slides in ms
      autoplay: {
        default: 1,
        type: Number,
      },
    }
  },
}
</script>

<style>
.carousel__prev, .carousel__next {
  background-color: black !important;
}

.carousel__pagination-button--active {
  background-color: black !important;
}

.carousel__pagination-button {
  background-color: gray;
}
</style>
