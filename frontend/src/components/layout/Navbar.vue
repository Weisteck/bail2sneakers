<template>
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/cart">Cart</router-link>
      |
      <router-link to="/product/get-all">Product</router-link>
      |
      <router-link to="/product/60acf6a894832a6396b9e9ab">Product details</router-link>
      |
      <router-link to="/product/create">Create product</router-link>
      |
      <router-link to="/product/edit/60acf6a894832a6396b9e9ab">Edit product</router-link>
      |
      <router-link to="/back-office/product/get-all">Get all products back office</router-link>
      |

      <button v-if="!user" class="btn cursor-pointer hover:text-blue-600 transition" @click="login">login</button>

      <div v-else>
        Bonjour {{ user.mail }}
        <button class="btn cursor-pointer hover:text-blue-600 transition" @click="logout"> | logout</button>
      </div>
    </div>

  <TransitionRoot as="template" :show="open">
    <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" @close="open = false" :open="open">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                         leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300"
                         enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                         enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                         leave-from="opacity-100 translate-y-0 sm:scale-100"
                         leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true"/>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                    Connexion
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Veuillez saisir vos identifiants
                    </p>
                  </div>

                  <form @submit.prevent="login">
                    <label class="label pb-5">
                      Email
                      <input class="input" type="email" name="email">
                    </label>

                    <label class="label">
                      Mot de passe
                      <input class="input" type="password" name="password">

                    </label>
                  </form>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      @click="open = false">
                Connexion
              </button>
              <button type="button"
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      @click="open = false" ref="cancelButtonRef">
                Annuler
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import axios from "axios"
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationIcon } from '@heroicons/vue/outline'

export default {
  name: 'Navbar',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationIcon,
  },
  data() {
    return {
      user: null,
      open: true
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        const response = await axios.get('/api/authentication/profile')
        this.user = response.data
      } catch (e) {
        this.user = null
        console.error(e.response.data)
      }
    },

    async login() {
      try {
        const response = await axios.post('/api/authentication/login', {
          email: "test@gmail.com",
          password: "trouDuCul"
        })

        this.user = response.data
      } catch (e) {
        console.error(e)
      }
    },

    async logout() {
      try {
        const response = await axios.get('/api/authentication/logout')
        this.user = null
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
