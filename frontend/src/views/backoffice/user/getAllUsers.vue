<template>
  <div class="container mx-auto">
    <div class="card">
      <div class="flex pb-16 justify-between">
        <h1 class="title text-left uppercase font-bold">Gestion des utilisateurs</h1>
        <router-link :to="{ name: 'createUser' }" class="button uppercase">Créer un utilisateur</router-link>
      </div>

      <table class="table-auto">
        <thead>
        <tr class="font-bold uppercase border-b border-gray-300">
          <th>Mail</th>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Num. téléphone</th>
          <th>Date de naissance</th>
          <th>Role</th>
        </tr>
        </thead>
        <tr class="text-left border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer" v-for="user in users"
            @click="$router.push(`/user/${user._id}`)">
          <td>{{ user.mail }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.phoneNumber }}</td>
          <td>{{ new Date(user.birthday).toLocaleDateString() }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GetAllUsers',
  data() {
    return {
      users: []
    }
  },
  methods: {
    async getUsers() {
      try {
        const response = await this.$store.dispatch('getUsers')
        this.users = response.data
      } catch (e) {
        console.error(e)
      }
    }
  },
  created() {
    this.getUsers()
  }
}
</script>
