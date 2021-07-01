<template>
  <div>
    <router-link :to="`/product/${oneProduct._id}`">
      <img :src="oneProduct.images[0]" alt="homeImage" class="w-2/3 mx-auto" @click="redirect">
    </router-link>
    <h1 class="title">TEST</h1>
    TEST
  </div>

</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      oneProduct: null
    }
  },
  created() {
    this.$store.dispatch('getProduct', { id: "60d24afe3d186b00366a706e" })
      .then(res => {
        this.oneProduct = res.data
      })
      .catch(err => console.error(err))
  },
  methods: {
    redirect() {
      console.log("redirect")
      this.$router.push(`/product/${this.oneProduct._id}`)
    }
  }
}
</script>
