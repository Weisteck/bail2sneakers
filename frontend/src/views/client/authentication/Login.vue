<template>
  <div
    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

      <div v-if="errors" class="bg-red-200 w-full h-25 p-3 rounded mb-5">
        {{ errors }}
      </div>


      <div class="flex items-start">
        <div
          class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
          <UserIcon class="h-6 w-6 text-blue-600" aria-hidden="true"/>
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:mr-4 sm:text-left w-full">
          <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 mb-10 mt-2">
            Connexion
          </DialogTitle>
          <div class="mt-2">
            <div class="w-full">
              <form @submit.prevent="login" class="w-full">
                <label class="label pb-5">
                  Email
                  <input class="input mt-2" type="email" name="email" v-model="user.email">
                </label>

                <label class="label">
                  Mot de passe
                  <input class="input mt-2" type="password" name="password" v-model="user.password">
                </label>
              </form>
            </div>
          </div>
        </div>
        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 sm:mx-0 sm:h-10 sm:w-10"/>
      </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
      <button type="button"
              class="disabled:bg-blue-200 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="login"
              :disabled="!user.email || !user.password"
      >
        Se connecter
      </button>
      <router-link :to="{name: 'signup'}" type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="close" ref="cancelButtonRef">
        S'inscrire
      </router-link>
    </div>
  </div>
</template>
<script>
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { UserIcon } from '@heroicons/vue/outline'
import axios from "axios"

export default {
  name: 'Login',
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    UserIcon,
  },
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      errors: null
    }
  },
  props: [ 'open' ],
  methods: {
    async login() {
      try {
        const response = await axios.post('/api/authentication/login', {
          email: this.user.email,
          password: this.user.password
        })

        response.status === 202
          ? this.$router.push('/')
          : this.errors = response.data
      } catch (e) {
        this.errors = e.message
        console.error(e)
      }
    },
  }
}
</script>

