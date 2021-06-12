<template>
  <h1>Get all product</h1>

  {{ products }}
</template>

<script>
export default {
  name: 'GetAllProductsBackOffice',
  data() {
    return {
      products: []
    }
  },
  methods: {
    getAllProducts() {
      try {
        const products = this.$store.dispatch('getAllProducts')
        this.products = products.data
      } catch (e) {
        console.error(e)
      }
    }
  },
  created() {
    this.getAllProducts()
  }
}
</script>
