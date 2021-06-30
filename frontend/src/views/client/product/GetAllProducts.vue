
<template>
    <li class="place-items-end ml-20 list-none">
      <input
        id="search"
        type="text"
        placeholder="chercher un produit "
        v-model="search"
        name="search"
        class="w-5/6 border-2 h-8 mt-3 rounded-md"
        style="border-color: #786362;"
      />
    </li>
  
      <div class="grid grid-col-6 gap-4">
        <div class="col-span-2">
          <div id="prdFilter ">
            <h4 class="flex mb-3 mt-9">
              <span class="text-gray-700 text-4xl">Filter:</span>
            </h4>
            <div>
              <label for="filterPrd">Par categories</label>

              <select name="category" class="border-2" id="filterPrdSlt" v-model="categories">
                <option value="all">All</option>
                <option value="montantes">Montantes</option>
                <option value="sans lacets">Sans lacet </option>
                <option value="basket basse">Basket basse </option>
                <option value="homme">Homme </option>
                <option value="femme">Femme </option>
              </select>

              <label for="filterPrd"> Par Marque </label>

              <select name="category" class="border-2" id="filterPrdSlt" v-model="selectedCategory">
                <option value="all">All</option>
                <option value="adidas">Adidas</option>
                <option value="homme">Air Jordan  </option>
                <option value="femme">Alexander Mc QUEEN </option>
                <option value="femme">Balenciaga </option>
                <option value="sans lacets">Converse </option>
                <option value="femme">Dior </option>
                <option value="femme">New Balance </option>
                <option value="basket basse">Nike </option>
                <option value="femme">Reebok </option>
                

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
                      max-w-prose
                      shadow-lg
                      hover:bg-gray-100
                    
                    "
                    style="height: 500px"
                    @click="$router.push(`/product/${product._id}`)"
                  >
                    <div
                      class="relative pt-10 px-10 flex items-center justify-center"
                    >
                      <div
                        class="block absolute w-48 h-40 bottom-0 left-0 -mb-24 ml-3"
                      ></div>
                      <img
                        :src="product.images[0]"
                        alt="image"
                        class="relative w-40 "
                        style="width: 230px;"
                      />
                    </div>
                    <div class="relative text-black px-6 pb-6 mt-5  text-2xl">
                      <span class="block opacity-75 mb-5">{{
                        product.brand.name
                      }}</span>
                      <div class="flex justify-between">
                        <span class="block font-semibold text-lg ">{{
                          product.model
                        }}</span>
                        <span
                          class="
                            block
                            bg-gray-600
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
    categories(){
      this.productsFiltered();
    }
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
      console.log(this.searchWord.length)
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
            if (this.categories === []) return true;
            return product.categories === this.categories;
          }));
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>
