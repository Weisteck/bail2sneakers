<template>
  <h1>Produits</h1>
  <hr>
  <div class="grid grid-cols-12 grid-flow-col">
    <div v-for="(product, index) in products" :key="product.productId">

      <div class="col-span-6 card">
        <img :src="product.images[0]" alt="image" class="w-40"/>
        <p>{{ product.brand.name }}</p>
        <p>{{ product.model }}</p>
        <p>{{ product.priceExclTax }}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi asperiores blanditiis corporis deleniti dicta
          dolore doloribus earum eos error impedit in inventore ipsam iste quod, sed similique suscipit, voluptatem
          voluptatibus.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getAllProducts',
  data() {
    return {
      products: {}
    }
  },
  methods: {
    getAllProducts() {
      this.$store.dispatch('getAllProducts')
        .then(res => {
          console.log(res.data)
          this.products = res.data
        })
        .catch(err => console.error(err))
    }
  },
  beforeMount() {
    this.getAllProducts()
  }
}
</script>
