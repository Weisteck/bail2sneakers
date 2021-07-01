<template>
  <li class="place-items-end ml-20 list-none">
    <input
      id="search"
      type="text"
      placeholder="chercher un produit "
      v-model="search"
      name="search"
      class="border input w-5/6 border-2 h-8 mt-3 rounded-md"
    />
  </li>

  <div class="grid grid-col-6 gap-4">
    <div class="col-span-2">
      <div id="prdFilter ">
        <h4 class="flex mb-3 mt-9">
          <span class="text-gray-700 text-4xl">Filtrer les produits</span>
        </h4>
        <div>
          <label class="label">
            Par categories
            <select name="selectedCategory" class="border-2 input-select" v-model="selectedCategory">
              <option value="">All</option>
              <option value="montantes">Montantes</option>
              <option value="sans lacets">Sans lacet</option>
              <option value="basquette basse">Basket basse</option>
              <option value="Hommes">Homme</option>
              <option value="Femmes">Femme</option>
            </select>
          </label>

          <label class="label">
            Par Marque
            <select name="selectedBrand" class="border-2 input-select" v-model="selectedBrand">
              <option value="">All</option>
              <option value="Converse">Converse</option>
              <option value="Nike">Nike</option>
              <option value="Air Jordan">Air Jordan</option>
              <option value="Adidas">Adidas</option>
              <option value="New Balance">New Balance</option>
              <option value="Reebok">Reebok</option>
              <option value="Alexander McQUEEN">Alexander Mc QUEEN</option>
              <option value="Jordan">Jordan</option>
            </select>
          </label>
        </div>
      </div>
    </div>
    <div class="col-span-4">
      <main class="container px-8 pt-2 mx-auto lg:px-4">
        <div class="">
          <div
            v-for="(product, index) in filteredProduct"
            :key="product.productId"
            class="mt-8 grid grid-col-3"
          >
            <div class="
                        overlay-hidden
                        bg-white-500
                        rounded-lg
                        shadow-lg
                        hover:bg-gray-100
                        col-span-1
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
      selectedCategory: "",
      selectedBrand: "",
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

          console.log(res.data)
        })
        .catch((err) => console.error(err));
    },
    productsFiltered() {
      console.log("search words: ", this.searchWords.length)
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
              if (this.selectedCategory === "") return true;
              return product.categories.includes(this.selectedCategory)
            })
            .filter((product) => {
              if (this.selectedBrand === "") return true;
              return product.brand.name.replace(/\s/g, '').toLowerCase() === this.selectedBrand.replace(/\s/g, '').toLowerCase()
            })
        )
        : this.filteredProduct = this.nonFilteredProducts
          .filter((product) => {
            if (this.selectedCategory === "") return true;
            return product.categories.includes(this.selectedCategory)
          })
          .filter((product) => {
            if (this.selectedBrand === "") return true;
            return product.brand.name.replace(/\s/g, '').toLowerCase() === this.selectedBrand.replace(/\s/g, '').toLowerCase()
          })
    },
  },
  created() {
    this.getAllProducts();
  },
};
</script>
