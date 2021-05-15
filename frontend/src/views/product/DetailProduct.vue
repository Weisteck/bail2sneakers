<template>
  <div class="text-left">
    <div class="container mx-auto">
      <div class="grid grid-cols-2 mb-10">
        <div class="col-span-1">
          <Slider :images="product.images"/>
        </div>
        <div class="col-span-1 text-center">
          <img :src="product.brand.logo" alt="brandLogo" class="mx-auto" height="200" width="200">
          <h1 class="title">
            {{ product.brand.name }} - {{ product.model }}
          </h1>

          <p class="text-sm">
            {{ fixPriceHt(product.priceExclTax, 0) }} HT
          </p>
          <p class="text-xl">
            {{ fixPriceTtc(product.priceExclTax, 0) }} TTC
          </p>

          <p>⭐ {{ product.rating }} / 10</p>

          <button @click="addProductToBasket" class="button">
            AJOUTER AU PANIER
          </button>
        </div>
      </div>

      <p class="description">
        {{ product.details.description }}
      </p>

      <h2 class="text-xl">Informations sur le produit</h2>
      <p class="text-lg">Categories</p>
      <div class="flex mt-3 mb-3">
        <div v-for="category in product.categories" class="flex">
          <div class="flex-initial mr-2 bg-gray-200 p-1.5 rounded-xl">
            <span>{{ category }}</span>
          </div>
        </div>
      </div>

      <p class="text-lg">Matériaux</p>
      <div class="flex mt-3 mb-3">
        <div v-for="materiel in product.details.materials" class="flex">
          <div class="flex-initial mr-2 bg-gray-200 p-1.5 rounded-xl">
            <span>{{ materiel }}</span>
          </div>
        </div>
      </div>

      <p class="text-lg">Origine</p>
      <p>{{ product.details.origin }}</p>
    </div>
  </div>
</template>

<script>
import Slider from "../../components/Slider.vue";
import Cookies from 'js-cookie'


export default {
  name: 'DetailProduct',
  components: { Slider },
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
        variants: [
          {
            color: "",
            sizes: [
              {
                size: 0,
                stock: 0
              }
            ]
          }
        ]
      },
      productColorSelected: "",
      productSizeSelected: 0,
      noImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/768px-No_image_available.svg.png"
    }
  },
  methods: {
    getProduct() {
      console.log("cookie : ", Cookies.get('basketId'))

      this.$store.dispatch('getProduct', { id: this.$route.params.id })
        .then(res => {
          this.product = res.data
        })
        .catch(err => console.error(err))
    },

    fixPriceHt(priceHt, priceDelivery) {
      priceHt += priceDelivery
      return priceHt.toString().substring(0, priceHt.toString().length - 2)
        + "."
        + priceHt.toString().slice(-2)
        + " €"
    },

    fixPriceTtc(priceHt, priceDelivery) {
      priceHt += priceDelivery
      return (Number(
          priceHt.toString().substring(0, priceHt.toString().length - 2)
          + '.'
          + priceHt.toString().slice(-2)
          ) * 1.20
        ).toFixed(2)
        + " €"
    },

    addProductToBasket() {
      const selectedProduct = {
        productId: this.product._id,
        brand: this.product.brand.name,
        model: this.product.model,
        price: this.product.priceExclTax,
        image: this.product.images[0],
        color: this.productColorSelected,
        size: this.productSizeSelected
      }

      this.$store.dispatch('addProductToBasket', selectedProduct)
        .then(res => {
          console.log("le produit à été ajouter au panier", res)

          // TODO: Si l'utilisateur n'est pas connecté, alors stocker l'id du panier créer dans un cookie
          Cookies.set('basketId', res.data._id)
        })
        .catch(err => console.error(err))
    }
  },
  beforeMount() {
    this.getProduct()
  }
};
</script>
