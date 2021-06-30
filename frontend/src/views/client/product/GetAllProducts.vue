
<template>
  <header>
    <li class="place-items-end ml-20">
      <input
        id="search"
        type="text"
        placeholder="chercher un produit "
        v-model="search"
        name="search"
        class="w-72 border-2 border-black rounded-md"
      />
    </li>
  </header>
  <h1 class="text-center text-xl mt-4">Produits</h1>
  <hr />
  
      <div class="grid grid-col-6 gap-4">
        <div class="col-span-2">
          <div id="prdFilter ">
            <h4 class="flex mb-3">
              <span class="text-gray-700">Filter:</span>
            </h4>
            <div>
              <label for="filterPrd">By categories</label>

              <select name="" id="filterPrdSlt" v-model="selectedCategory">
                <option value="all">All</option>
                <option value="montantes">Montantes</option>
                <option value="montantes">Sans lacet </option>
                <option value="montantes">Sans lacet </option>
              </select>
            </div>
          </div>
          </div>
          <div class="col-span-4">
            <main class="container px-8 pt-2 mx-auto lg:px-4">
              <div class="flex flex-wrap items-center justify-center">
                <div
                  v-for="(product, index) in filteredProduct"
                  :key="product.productId"
                  class="mt-8"
                >
                  <div
                    class="
                      flex-shrink-0
                      m-6
                      relative
                      overlay-hidden
                      bg-white-500
                      rounded-lg
                      max-w-xs
                      shadow-lg
                    "
                    @click="$router.push(`/product/${product._id}`)"
                  >
                    <div
                      class="relative pt-10 px-10 flex items-center justify-center"
                    >
                      <div
                        class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                      ></div>
                      <img
                        :src="product.images[0]"
                        alt="image"
                        class="relative w-40"
                      />
                    </div>
                    <div class="relative text-black px-6 pb-6 mt-6">
                      <span class="block opacity-75 -mb-1">{{
                        product.brand.name
                      }}</span>
                      <div class="flex justify-between">
                        <span class="block font-semibold text-lg">{{
                          product.model
                        }}</span>
                        <span
                          class="
                            block
                            bg-green-600
                            rounded-full
                            text-white text-xs
                            font-bold
                            px-3
                            py-2
                            leading-none
                            flex
                            items-center
                          "
                          >{{ product.priceExclTax }}€</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
</template>

<script>
export default {
  name: "getAllProducts",
  data() {
    return {
      search: "",
      nonFilteredProducts: [],
      filteredProduct: [],
      selectedCategory: "All",
      selectedrand: "All",
      categories: [],
      brand: {},
    };
  },
  computed: {
    searchWords() {
      if (!this.search.length) return {};

      return this.search.toLowerCase().split(" ");
    },
  },
  watch: {
    search() {
      this.productsFiltered();
    },
  },
  methods: {
    getAllProducts() {
      this.$store
        .dispatch("getAllProducts")
        .then((res) => {
          this.nonFilteredProducts = res.data;
          this.filteredProduct = res.data;
        })
        .catch((err) => console.error(err));
    },
    productsFiltered() {
      this.searchWords.length !== undefined
        ? (this.filteredProduct = this.nonFilteredProducts
            // Recherche
            .filter((product) =>
              this.searchWords.every(
                (word) =>
                  product.brand.name
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .includes(word) ||
                  product.model
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .includes(word)
              )
            ))
        : (this.filteredProduct = this.nonFilteredProducts.filter((product) => {
            if (this.category === []) return true;
            return product.categories === this.category;
          }));
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>
