<template>
  <div class="container mx-auto">
    <div class="card">
      <h2 class="text-base text-2xl">Inormation du profil</h2>
      <br>
      <p>Prenom: <span>{{user.firstName}}</span> </p>
      <p>Nom de Famille: <span>{{user.lastName}}</span> </p>
      <p>Role: <span>{{user.role}}</span> </p>

      <p>Email: <span>{{user.mail}}</span> </p>

      <div class="overflow-auto mt-10" v-if="carts.length > 0">
        <table class="w-full">
          <thead>
          <tr class="font-bold uppercase border-b border-gray-300">
            <th>User ID</th>
            <th>PRIX HTC</th>
            <th>Progressed at</th>
            <th>Ordered at at</th>
            <th>Ordered preparation at</th>
            <th>Delivered at</th>
            <th>Ended at</th>
            <th>canceled at at</th>
          </tr>
          </thead>
          <tr class="text-left border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer"
              v-for="cart in carts"
              @click="$router.push(`/cart/${cart._id}`)">
            <td>{{ cart.userId }}</td>
            <td>{{ cart.order.priceExclTax }}</td>
            <td>{{ cart.order.history.progressedAt }}</td>
            <td>{{ cart.order.history.orderedAt || "null" }}</td>
            <td>{{ cart.order.history.orderedPreparationAt || "null" }}</td>
            <td>{{ cart.order.history.deliveredAt || "null" }}</td>
            <td>{{ cart.order.endedAt || "null" }}</td>
            <td>{{ cart.order.canceledAt || "null" }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
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
        console.log(userId)
        const response = await this.$store.dispatch('getCartsByUserId', { userId: userId })
        this.carts = response.data
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
