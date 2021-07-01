<template>
  <div class=" bg-color">
    <Navbar/>
    <div class="">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from "./components/layout/Navbar.vue"

export default {
  name: "App",
  components: { Navbar }
};
</script>

<style>
.bg-color {
  background-color: #E2E4E9;
}
</style>
