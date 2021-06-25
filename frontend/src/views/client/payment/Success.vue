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
      console.log("id: ", this.$route.query.id)
      try {

        const response = await this.$store.dispatch('getSessionData', this.$route.query.id)
        console.log(response)
        this.sessionData = response.data
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
