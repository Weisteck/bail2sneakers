<template>
  <div class="grid grid-cols-8 gap-4">
    <div class="col-span-2">
      <div class="ml-6">
        <h4 class="flex mb-3 mt-9 text-gray-700 text-4xl">
          Rechercher parmi {{ filteredProduct.length }} produits
        </h4>
        <input
          id="search"
          type="text"
          placeholder="Chercher une marque ou un model"
          v-model="search"
          name="search"
          class="input"
        />

        <h4 class="flex mb-3 mt-9">
          <span class="text-gray-700 text-4xl">Filtrer les produits</span>
        </h4>
        <div>
          <h2 class="text-2xl mb-2 mt-5">Par categories</h2>
          <div class="ml-2">
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="Hommes" v-model="selectedCategory">
              Hommes
            </label>
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="Femmes" v-model="selectedCategory">
              Femmes
            </label>
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="montantes" v-model="selectedCategory">
              Montantes
            </label>
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="sans lacets" v-model="selectedCategory">
              Sans lacet
            </label>
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="basquette basse" v-model="selectedCategory">
              Basket basse
            </label>
          </div>

          <h2 class="text-2xl mb-2 mt-5">Par marques</h2>
          <div class="ml-2">
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="Nike" v-model="selectedBrand">
              Nike
            </label>
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="Converse" v-model="selectedBrand">
              Converse
            </label>
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="Air Jordan" v-model="selectedBrand">
              Air Jordan
            </label>
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="Adidas" v-model="selectedBrand">
              Adidas
            </label>
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="New Balance" v-model="selectedBrand">
              New Balance
            </label>
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="Reebok" v-model="selectedBrand">
              Reebok
            </label>
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="Alexander McQUEEN" v-model="selectedBrand">
              Alexander McQUEEN
            </label>
            <label class="label">
              <input type="checkbox" class="input-checkbox" value="Jordan" v-model="selectedBrand">
              Jordan
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-6">
      <main class="container px-8 pt-2 mx-auto lg:px-4">
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="(product, index) in filteredProduct"
            :key="product.productId"
            class="mt-8 md:col-span-1 sm:col-span-3"
          >
            <div class="h-96 shadow hover:shadow-lg transition cursor-pointer card"
                 @click="$router.push(`/product/${product._id}`)">
              <div class="relative pt-10 mx-auto">
                <img
                  :src="product.images[0]"
                  alt="image"
                  class="relative h-40 object-contain"
                  style="width: 230px;"
                />
              </div>
              <div class="relative text-black pb-2 mt-5  text-2xl">
                <span>
                  {{ product.brand.name }}
                </span>
              </div>
              <div class="grid grid-cols-3 gap-1">
                <div class="col-span-2">
                   <span class="block font-semibold text-lg ">
                    {{ product.model }}
                  </span>
                </div>
                <div class="col-span-1 flex justify-self-end">
                <span
                  class="self-center w-16 py-2 col-end-7 text-center block bg-brown-1 rounded-full text-white text-xs font-bold">
                    {{ product.priceExclTax }} €
                  </span>
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
      selectedCategory: [],
      selectedBrand: [],
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
    categories() {
      this.productsFiltered();
    },
    selectedCategory() {
      this.productsFiltered()
    },
    selectedBrand() {
      this.productsFiltered()
    }
  },
  methods: {
    getAllProducts() {
      this.$store.dispatch("getAllProducts")
        .then((res) => {
          this.nonFilteredProducts = res.data;
          this.filteredProduct = res.data;
        })
        .catch((err) => console.error(err));
    },
    productsFiltered() {
      this.searchWords.length !== undefined
        ? (
          this.filteredProduct = this.nonFilteredProducts
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
            )
            .filter((product) => {
              if (this.selectedCategory.length === 0) return true
              return product.categories.some(category => this.selectedCategory.includes(category))
            })
            .filter((product) => {
              if (this.selectedBrand.length === 0) return true
              return this.selectedBrand.includes(product.brand.name)
            })
        )
        : this.filteredProduct = this.nonFilteredProducts
          .filter((product) => {
            if (this.selectedCategory.length === 0) return true
            return product.categories.some(category => this.selectedCategory.includes(category))
          })
          .filter((product) => {
            if (this.selectedBrand.length === 0) return true
            return this.selectedBrand.includes(product.brand.name)
          })
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>

<style>
.bg-brown-1 {
  background-color: #4B3838;
}
</style>
