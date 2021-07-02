<template>
  <div class="card">
    <h2 class="text-base text-2xl">Inormation du profil</h2>
    <br>
    <p>Prenom: <span>{{user.firstName}}</span> </p>
    <p>Nom de Famille: <span>{{user.lastName}}</span> </p>
    <p>Role: <span>{{user.role}}</span> </p>

    <p>Email: <span>{{user.mail}}</span> </p>



     <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
<div class="overflow-auto">
        <table class="w-full">
          <thead>
          <tr class="font-bold uppercase border-b border-gray-300">
            <th>Date de Commande</th>
            <th>Adresse</th>
            <th>Produit Selectionné</th>
          </tr>
          </thead>
          <tr class="text-left border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer">
            <td>{{}}</td>
            <td>{{  }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ new Date(user.birthday).toLocaleDateString() }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </table>
      </div>
  </div>





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
