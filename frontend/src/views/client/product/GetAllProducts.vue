
<template>
<header>
   <li class="place-items-end ml-20 ">
            <input id="search" type="text" placeholder="chercher un produit " v-model="search" name="search" class="w-72 border-2 border-black rounded-md"  >
          </li>
</header>
  <h1 class="text-center text-xl mt-4">Produits</h1>
  <hr>
  <main class="container px-8 pt-2 mx-auto lg:px-4">
    <div class="flex flex-wrap items-center justify-center">

      <div v-for="(product, index) in products" :key="product.productId" class="mt-8">

      <div class="flex-shrink-0 m-6 relative overlay-hidden bg-white-500 rounded-lg max-w-xs shadow-lg">
      <div class="relative pt-10 px-10 flex items-center justify-center">
         <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
          <img :src="product.images[0]" alt="image" class="relative w-40"/>
      </div>
      <div class="relative text-black px-6 pb-6 mt-6">
        <span class="block opacity-75 -mb-1" >{{ product.brand.name }}</span>
        <div class="flex justify-between">
          <span class="block font-semibold text-lg">{{ product.model }}</span>
          <span class="block bg-green-600 rounded-full text-white text-xs font-bold px-3 py-2 leading-none flex items-center">{{ product.priceExclTax }}€</span>
        </div>
      </div>
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
      products: {},
      search: ''
    }
  },
  computed:{
    searchWords(){
      if(!this.search.length)return {};

      return this.search.toLowerCase().split(' ');
    }
  },
  watch:{
    search(){
      this.filteredProducts();
    }

  },
  methods: {
    getAllProducts() {
      this.$store.dispatch('getAllProducts')
        .then(res => {
          this.products = res.data
          this.filteredProduct = this.nonFilteredProducts
          this.$emit('getAllproducts', this.nonFilteredProducts)
        })
        .catch(err => console.error(err))
    },
    filteredProducts(){
      this.filteredProduct = this.nonFilteredProducts
        .filter((products) => this.serchWords.every((word)=> products.brand.name.toLowerCase().normalize('NFD').includes(word)))
    }
  },
  beforeMount() {
    this.getAllProducts()
  }
}
</script>
