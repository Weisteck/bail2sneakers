<template>
  <ChangeOrderStatus v-if="changeOrderStatusModal" @editOrderStatus="editOrderStatus" v-bind:open="changeOrderStatusModal" @close="changeOrderStatusModal = false"/>

  <div class="container mx-auto">
    <div class="card">
      <div class="flex pb-16 justify-between">
        <h1 class="title text-left uppercase font-bold">Gestion des commandes</h1>
      </div>

      <div class="grid grid-cols-4 mb-10 text-left">
        <label class="label col-span-1 mt-3">
          Filtrer les commandes par status
        </label>
        <select class="input-select col-span-3" name="orderHistory" id="orderHistory" v-model="orderStatus">
          <option value="">ALL</option>
          <option value="progressedAt">Progressed at</option>
          <option value="orderedAt">Ordered at</option>
        </select>
      </div>

      <div class="overflow-auto">
        <table class="table-auto">
          <thead>
          <tr class="font-bold uppercase border-b border-gray-300">
            <th>User ID</th>
            <th>PRIX HTC</th>
            <th>Progressed at</th>
            <th>Ordered at at</th>
            <th>canceled at at</th>
            <th>Delivered at</th>
            <th>Ended at</th>
            <th>Ordered preparation at</th>
            <th>Changer le status</th>
          </tr>
          </thead>
          <tr class="text-left border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer" v-for="cart in carts"
              @click="$router.push(`/cart/${cart._id}`)">
            <td>{{ cart.user_id }}</td>
            <td>{{ cart.order.priceExclTax }}</td>
            <td>{{ cart.order.history.progressedAt }}</td>
            <td>{{ cart.order.history.orderedAt || "null" }}</td>
            <td>{{ cart.order.history.canceledAtc || "null" }}</td>
            <td>{{ cart.order.history.deliveredAt || "null" }}</td>
            <td>{{ cart.order.endedAt || "null" }}</td>
            <td>{{ cart.order.orderedPreparationAt || "null" }}</td>

            <td class="flex justify-center">
              <button @click.stop="">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                </svg>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GetCarts',
  components: {ChangeOrderStatus},
  data() {
    return {
      carts: [],
      orderStatus: null,
      changeOrderStatusModal: false
    }
  },
  watch: {
    async orderStatus(status) {
      status.length > 0
        ? this.carts = await this.getCartsByStatus(status)
        : await this.getCarts()
    }
  },
  created() {
    this.getCarts()
  },
  methods: {
    async getCartsByStatus(status) {
      try {
        const getCartByStatusResponse = await this.$store.dispatch("getCartsByStatus", { status: status })
        return getCartByStatusResponse.data
      } catch (e) {
        console.error(e)
      }
    },

    async getCarts() {
      try {
        const getCartsResponse = await this.$store.dispatch("getCarts")
        this.carts = getCartsResponse.data
      } catch (e) {
        console.error(e)
      }
    },

    async getOrdersByStatus(status) {
      try {
        this.carts = await this.$store.dispatch("getCartsByStatus", { status: status })
      } catch (e) {
        console.error(e)
      }
    },

    async editOrderStatus(cartId) {
      try {
        const response = await this.$store.dispatch("putCart", cartId)
        console.log(response)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
