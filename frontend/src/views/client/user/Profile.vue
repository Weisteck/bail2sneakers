<template>
  <div class="card">

  </div>
  {{ user }}


  <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>


  {{ carts }}
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: {},
      carts: []
    }
  },
  beforeMount() {
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        const response = await this.$store.dispatch('getUser')
        this.user = response.data

        await this.getCartsByUserId(response.data.id)
      } catch (e) {
        console.error(e)
      }
    },

    async getCartsByUserId(userId) {
      try {
        const response = await this.$store.dispatch('getCartsByUserId', { userId: userId })
        this.carts = response.data
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
