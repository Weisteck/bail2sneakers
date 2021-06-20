<template>
  <div class="container mx-auto">
    <form class="card" @submit.prevent="createProduct" ref="createProduct">
      <h1 class="title ">Create product</h1>
      <div class="-mx-3 md:flex mb-5 mt-16">
        <div class="md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="model" class="label">Model</label>
          <input type="text" name="model" id="model" class="input" v-model="product.model">
        </div>
        <div class="md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="price" class="label">Price (Exclude taxes)</label>
          <input type="number" name="price" id="price" class="input" v-model="product.priceExclTax">
        </div>

        <div class="md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="origin" class="label">Origin</label>
          <input type="text" name="origin" id="origin" class="input" v-model="product.details.origin">
        </div>
      </div>

      <div class="-mx-3 md:flex mb-5">
        <div class="md:w-full px-3 mb-6 md:mb-0">
          <label for="description" class="label">Description</label>
          <textarea name="description" id="description" class="input h-14" v-model="product.details.description"/>
        </div>
      </div>

      <div class="-mx-3 md:flex mb-5">
        <div class="md:w-full px-3 mb-6 md:mb-0">
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
              <template v-for="(category, index) in product.categories">
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

      <div class="-mx-3 md:flex mb-5">
        <div class="md:w-full px-3 mb-6 md:mb-0">
          <span class="label">Images</span>
          <label for="images" class="input button cursor-pointer mb-3">
            <input @change="uploadImages" multiple type="file" name="images" id="images" class="hidden">
            UPLOAD IMAGES
          </label>
          <div class="flex flex-wrap justify-center bg-gray-200 border">
            <template v-for="image in product.images">
              <img v-if="image" :src="image" class="flex-initial w-auto h-32 mx-1"/>
            </template>
          </div>
        </div>
      </div>

      <div class="-mx-3 md:flex mb-5">
        <div class="md:w-full px-3 mb-6 md:mb-0">
          <span class="label">Materials</span>
          <div class="-mx-3 md:flex mb-2">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0 text-left">
              <label for="plastic" class="label">
                <input v-model="product.details.materials"
                       type="checkbox"
                       id="plastic"
                       value="plastic"
                       class="text-gray-600"
                />
                <span class="ml-3">Plastic</span>
              </label>
              <label for="leather" class="label">
                <input v-model="product.details.materials"
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
                <input v-model="product.details.materials"
                       type="checkbox"
                       id="polyester"
                       value="polyester"
                       class="text-gray-600"
                />
                <span class="ml-3">polyester</span>
              </label>
              <label for="canvas" class="label">
                <input v-model="product.details.materials"
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
      </div>

      <h1 class="sub-title mb-5 mt-10">Brand</h1>

      <div class="-mx-3 md:flex mb-5">
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
                  v-if="!addBrand" @click="showBrandForm">AJOUTER NOUVELLE MARQUE
          </button>
          <button type="button" class="btn-primary" v-else @click="addBrand = false">ANNULER</button>
        </div>
      </div>

      <div v-if="addBrand" class="-mx-3 md:flex flex-wrap mb-2">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="brandName" class="label">Name</label>
          <input v-model="product.brand.name" type="text" name="brandName"
                 id="brandName" class="input">
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <span class="label">LOGO</span>
          <label for="logo" class="input button cursor-pointer mb-3">
            <input @change="uploadBrandLogo" multiple type="file" name="logo" id="logo" class="hidden">
            UPLOAD LOGO
          </label>
          <div class="flex justify-center bg-gray-200 border">
            <img v-if="product.brand.logo" :src="product.brand.logo" class="w-auto h-32 mx-1"/>
          </div>
        </div>

        <div class="md:w-full px-3 mb-6 mt-5 md:mb-0">
          <label for="brandDescription" class="label">Description</label>
          <textarea v-model="product.brand.brandDescription" name="brandDescription" id="brandDescription"
                    class="input"/>
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
        images: []
      },
      open: false,
      category: '',
      brandSelected: null,
      addBrand: false,
      url: null
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
      if (category !== "" && !this.hasCategory(category)) this.product.categories.push(category)

      this.clearSearch()
    },
    hasCategory(category) {
      const categoryToLowerCase = this.product.categories.find(e => e.toLowerCase() === category.toLowerCase())
      return categoryToLowerCase !== undefined
    },
    removeCategory(index) {
      this.product.categories.splice(index, 1)
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

    async createProduct() {
      try {
        const createNewProduct = await this.$store.dispatch('createProduct', {
          "categories": this.product.categories,
          "brand": this.product.brand,
          "model": this.product.model,
          "details": {
            "description": this.product.details.description,
            "materials": this.product.details.materials,
            "origin": this.product.details.origin
          },
          "rating": this.product.rating,
          "priceExclTax": this.product.priceExclTax,
          "images": this.product.images
        })
      } catch (e) {
        console.error(e)
      }
    },

    showBrandForm() {
      this.addBrand = true
      this.brandSelected = {
        name: "",
        brandDescription: "",
        logo: ""
      }
    },

    uploadImages(e) {
      const file = (e.target.files[0])

      this.product.images.push(URL.createObjectURL(file))
    },

    uploadBrandLogo(e) {
      const file = (e.target.files[0])

      this.product.brand.logo = URL.createObjectURL(file)
    }
  }
}
</script>

<style>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
