<template>
  <h1>Detail d'un produit</h1>

  <div class="container">
    <div class="grid grid-cols-2">
      <div class="col-span-1">

      </div>
      <div class="col-span-1">
        <img src="{{ product.brand.logo }}" alt="brandLogo">
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

        <p class="description">
          {{ product.details.description }}
        </p>

        <h2 class="text-left text-xl">Informations sur le produit</h2>
        <p class="text-left text-lg">Categories</p>
        <div v-for="category in product.categories">
          <span class="text-left bg-gray-100">{{ category }}</span>
          <span class="text-left bg-gray-100 p-1">cat n2</span>
        </div>

        <p class="text-left text-lg">Matériaux</p>
        <ul v-for="materiel in product.details.materials">
          <li class="text-left">- {{ materiel }}</li>
        </ul>
        <p class="text-left text-lg">Origine</p>
        <p>{{ product.details.origin }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailProduct',
  data() {
    return {
      product: {}
    }
  },
  methods: {
    getProduct() {
      console.log("params : ", this.$route.params.id)
      this.$store.dispatch('getProduct', { id: this.$route.params.id })
        .then(res => {
          console.log(res.data)
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

    }
  },
  beforeMount() {
    this.getProduct()
  }
};
</script>
