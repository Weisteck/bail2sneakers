<template>
  <div class="container mx-auto">
    <form class="card" @submit.prevent="createProduct">
      <h1 class="title mb-5">Create product</h1>
      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="model" class="label">Model</label>
          <input type="text" name="model" id="model" class="input">
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="price" class="label">Price (Exclude taxes)</label>
          <input type="number" name="price" id="price" class="input">
        </div>
      </div>

      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="description" class="label">Description</label>
          <textarea name="description" id="description" class="input"/>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <span class="label">Materials</span>
          <div class="-mx-3 md:flex mb-2">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0 text-left">
              <label for="plastic" class="label">
                <input v-model="product.materials"
                       type="checkbox"
                       id="plastic"
                       value="plastic"
                       class="text-gray-600"
                />
                <span class="ml-3">Plastic</span>
              </label>
              <label for="leather" class="label">
                <input v-model="product.materials"
                       type="checkbox"
                       id="leather"
                       value="leather"
                       class="text-gray-600"
                />
                <span class="ml-3">Leather</span>
              </label>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0 text-left">
              <label for="polyester" class="label">
                <input v-model="product.materials"
                       type="checkbox"
                       id="polyester"
                       value="polyester"
                       class="text-gray-600"
                />
                <span class="ml-3">polyester</span>
              </label>
              <label for="canvas" class="label">
                <input v-model="product.materials"
                       type="checkbox"
                       id="canvas"
                       value="canvas"
                       class="text-gray-600"
                />
                <span class="ml-3">canvas</span>
              </label>
            </div>
          </div>

        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="origin" class="label">Origin</label>
          <input type="text" name="origin" id="origin" class="input">
        </div>
      </div>

      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="images" class="label">Image</label>
          <input type="file" name="images" id="images" class="input">
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="categories" class="label">Categories</label>
          <div @click.away="clearSearch()" @keydown.escape="clearSearch()">
            <div class="relative" @keydown.enter.prevent="addCategory(category)">
              <input v-model="category"
                     @input="search($event.target.value)"
                     class="input"
                     placeholder="Enter some categories"
              >
              <div :class="[open ? 'block' : 'hidden']">
                <div class="absolute z-40 left-0 mt-2 w-full">
                  <div class="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
                    <a @click.prevent="addCategory(category)"
                       class="block py-1 px-5 cursor-pointer hover:bg-indigo-600 hover:text-white">
                      Add category "
                      <span class="font-semibold">{{ category }}</span>
                      "
                    </a>
                  </div>
                </div>
              </div>

              <!-- selections -->
              <template v-for="(category, index) in categories">
                <div class="bg-indigo-100 inline-flex items-center text-sm rounded mt-2 mr-1">
                  <span class="ml-2 mr-1 leading-relaxed truncate max-w-xs">{{ category }}</span>
                  <button @click.prevent="removeCategory(index)"
                          class="w-6 h-8 inline-block align-middle text-gray-500 hover:text-gray-600 focus:outline-none">
                    <svg class="w-6 h-6 fill-current mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                            d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"/>
                    </svg>
                  </button>
                </div>
              </template>
            </div>
          </div>

        </div>
      </div>

      <h1 class="sub-title mb-5 mt-10">Brand</h1>

      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <p>Sélectionner une marque existante</p>
          <select v-model="brandSelected"
                  class="block w-full bg-gray-50 text-gray-600 border border-gray-200 disabled:bg-gray-100 rounded py-3 px-4"
                  :disabled="addBrand"
          >
            <option v-for="brand in preselectedBrands" v-bind:value="brand">
              {{ brand.name }}
            </option>
          </select>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <p>Ou ajouter une nouvelle marque</p>
          <button type="button"
                  class="btn-primary"
                  v-if="!addBrand" @click="showBrandForm">AJOUTER NOUVELLE MARQUE</button>
          <button type="button" class="btn-primary" v-else @click="addBrand = false">ANNULER</button>
        </div>
      </div>

      <div v-if="addBrand" class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="brandName" class="label">Name</label>
          <input v-model="product.brand.name" type="text" name="brandName"
                 id="brandName" class="input">
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="brandDescription" class="label">Description</label>
          <textarea v-model="product.brand.brandDescription" name="brandDescription" id="brandDescription"
                    class="input"/>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="brandLogo" class="label">Logo</label>
          <input v-model="product.brand.logo" name="brandLogo" id="brandLogo" class="input">
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="mt-10 btn-primary">CREATE PRODUCT</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'CreateProduct',
  data() {
    return {
      product: {
        categories: [],
        brand: {
          name: "",
          brandDescription: "",
          logo: ""
        },
        model: "",
        details: {
          description: "",
          materials: [],
          origin: ""
        },
        rating: 0,
        priceExclTax: 0,
        images: [],
      },
      open: false,
      category: '',
      categories: [],
      brandSelected: null,
      addBrand: false,
    }
  },
  computed: {
    preselectedBrands() {
      return this.$store.state.productBrand
    }
  },
  methods: {
    /**
     * Categories
     */

    addCategory(category) {
      category = category.trim()
      if (category !== "" && !this.hasCategory(category)) this.categories.push(category)

      this.clearSearch()
    },
    hasCategory(category) {
      const categoryToLowerCase = this.categories.find(e => e.toLowerCase() === category.toLowerCase())
      return categoryToLowerCase !== undefined
    },
    removeCategory(index) {
      this.categories.splice(index, 1)
    },
    search(search) {
      if (search.includes(","))
        search.split(",").forEach(val => this.addCategory(val))

      this.toggleSearch()
    },
    clearSearch() {
      this.category = ''
      this.toggleSearch()
    },
    toggleSearch() {
      this.open = this.category !== ''
    },

    /**
     * -----------------------------------------------------
     */

    createProduct() {
      console.log("create product")
    },

    showBrandForm() {
      console.log("t")
      this.addBrand = true
      this.brandSelected = {
        name: "",
        brandDescription: "",
        logo: ""
      }
    }
  }
}
</script>
