<template>
  <div>
    <img @click="redirect" :src="images[0]" alt="image"
         class="mx-auto cursor-pointer hover:shadow-xl transition mt-10 rounded">

    <div class="mt-10 container w-1/2 mx-auto border-t border-gray-400">
      <h1 class="text-4xl text-center mt-3 mb-3">Bail2Sneakers</h1>

      <p class="text-center mb-10">
        Bail2Sneakers est une marque qui a été créée en 2021 suite à l'épidémie mondiale du covid-19. Nous avons voulu
        faire ce site pour les amoureux de la sneaker, pour les "sneaker adict" qui préfèrent le streetwear ou encore
        ceux du Luxe. Nous sommes les premiers à proposer ces services dans le domaine de la sneaker, nous visons toute
        clientèle homme-femme de tous horizons.
      </p>

      <div class="text-center mb-10">
        <router-link
          :to="{name: 'getAllProducts'}"
          class="px-4 py-2 mt-2 text-xl font-semibold text-gray-100 bg-brown-1 rounded md:mt-0 hover:text-gray-50 hover:bg-brown-2 hover:shadow-md transition"
          href="#">
          Découvrir tous nos produits
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Accueil',
  data() {
    return {
      oneProduct: {},
      images: []
    }
  },
  created() {
    this.$store.dispatch('getProduct', { id: "60d24afe3d186b00366a706e" })
      .then(res => {
        this.oneProduct = res.data
        this.images = this.oneProduct.images
      })
      .catch(err => console.error(err))
  },
  methods: {
    redirect() {
      console.log("redirect")
      this.$router.push(`/product/${ this.oneProduct._id }`)
    }
  }
}
</script>

<style>
.bg-brown-1 {
  background-color: #4B3838;
}

.bg-brown-1:hover {
  background-color: #786362;
}
</style>
