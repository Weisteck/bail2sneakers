<template>
  <div class="home">

    One Product
    <br><br>
    {{ oneProduct }}

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    All product
    <br>
    {{ allProducts }}
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  data() {
    return {
      oneProduct: {},
      allProducts: []
    }
  },
  created() {
    this.$store.dispatch('getAllProducts')
      .then(res => {
        this.allProducts = res.data
      })
      .catch(err => console.error(err))

    this.$store.dispatch('getProduct', { id: "60acf6a894832a6396b9e9ab" })
      .then(res => {
        this.oneProduct = res.data
      })
      .catch(err => console.error(err))
  }
}
</script>
