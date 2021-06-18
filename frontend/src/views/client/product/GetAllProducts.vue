
<template>
  <h1 class="text-center text-xl mt-4">Produits</h1>
  <hr>
  <main class="container px-8 pt-2 mx-auto lg:px-4">
    <div class="flex flex-nowrap">

      <div v-for="(product) in products" :key="product.productId" class="mt-8">

      <div class="rounded bg-white border-gray-200 shadow-md overflow-hidden w-3/5">
        <img :src="product.images[0]" alt="image" class=" object-contain  object-center w-full  border-b"/>
        <p class="font-bold text-base" >{{ product.brand.name }}</p>
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
  </main>
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
