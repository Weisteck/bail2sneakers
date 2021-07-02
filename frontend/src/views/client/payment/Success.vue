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
      try {
        const response = await this.$store.dispatch('getSessionData', this.$route.query.id)

        this.sessionData = response.data

        console.log(response.data)

        await this.$store.dispatch('putCart', { id: response.data.metadata.cartId, status: 'orderedAt' })

      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
