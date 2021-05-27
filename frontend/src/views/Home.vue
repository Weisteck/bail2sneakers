<template>
  <div class="home">
    <Carousel>
      <Slide>
        <img src="../assets/img/crystal-jo-F45w1xY42BY-unsplash.jpg" />
      </Slide>
    </Carousel>
  </div>
</template>

<script>
// @ is an alias to /src
import {Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Home',
  components: {
    Carousel,
    Slide
  }
}
</script>
