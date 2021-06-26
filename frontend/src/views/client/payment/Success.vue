<template>
  <p>Payment success</p>

  <div class="container mx-auto">
    <pre class="card text-left">
    {{ sessionData.metadata }}
  </pre>
    <pre class="card text-left">
    {{ sessionData }}
  </pre>
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
