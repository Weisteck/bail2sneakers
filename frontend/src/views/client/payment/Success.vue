<template>
  <div class="container mx-auto">
      <div class="card w-1/3 mx-auto">
        <h1 class="title">
          Félicitation, votre commmande à bien été passé !
        </h1>
    </div>

  </div>

</template>

<script>
export default {
  name: 'success',
  data() {
    return {
      sessionData: null
    }
  },
  created() {
    this.getSessionData()
  },
  methods: {
    async getSessionData() {
      console.log("in getSessionData")
      try {
        console.log("try")
        const response = await this.$store.dispatch('getSessionData', this.$route.query.id )

        console.log("response :", response)
        this.sessionData = response.data

        await this.$store.dispatch('putCart', response.data.metadata.cartId)

      } catch (e) {
        console.log("ERROR: ")
        console.error(e)
      }
    }
  }
}
</script>
