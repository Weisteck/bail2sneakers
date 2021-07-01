<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" @close="close" :open="open">
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
              <div v-if="errors" class="bg-red-200 w-full h-25 p-3 rounded mb-5">
                {{ errors }}
              </div>
              <div class="flex items-start">
                <div
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ShoppingCartIcon class="h-6 w-6 text-blue-600" aria-hidden="true"/>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:mr-4 sm:text-left w-full">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 mb-10 mt-2">
                    Modifier le status d'une commande
                  </DialogTitle>
                  <div class="mt-2">
                    <div class="w-full">
                      <div class="grid grid-cols-2">
                        <div class="col-span-2">
                          <p class="font-bold">Statut actuel</p>
                          {{ lastStatus[Object.keys(lastStatus)[0]].status }}
                          {{ lastStatus[Object.keys(lastStatus)[0]].date }}

                          <div v-if="cart.order" v-for="(value, name) in cart.order.history">
                            {{ name }}: {{ value || "null" }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 sm:mx-0 sm:h-10 sm:w-10"/>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button"
                      class="disabled:bg-blue-200 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      @click="nextStep"
              >
                PASSER A L'ETAPE SUIVANTE
              </button>
              <button type="button"
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      @click="close" ref="cancelButtonRef">
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
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { UserIcon, ShoppingCartIcon } from '@heroicons/vue/outline'
//import axios from "axios"

export default {
  name: 'ChangeOrderStatus',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    UserIcon,
    ShoppingCartIcon
  },
  props: [ 'open', 'cartSelected' ],
  data() {
    return {
      errors: null,
      actualStatus: null,
      cart: this.cartSelected,
      lastStatus: null,
      statusList: [ "progressedAt", "orderedAt", "orderedPreparationAt", "deliveredAt", "endedAt", "canceledAt" ]
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },

    async getStatus() {
      let editedCart = {}
      const dateList = []

      for (const [ key, value ] of Object.entries(this.cart.order.history)) {
        if (value !== null) {
          editedCart[key] = new Date(value).toLocaleDateString("fr-FR")
          dateList.push({ status: key, date: value })
        }
      }

      this.lastStatus = dateList.reduce((a, b) => new Date(a.date) > new Date(b.date) ? a : b)

      if (editedCart.endedAt === undefined)
        if (editedCart.deliveredAt === undefined)
          if (editedCart.orderedPreparationAt === undefined)
            if (editedCart.orderedAt === undefined)
              this.lastStatus = { progressedAt: { date: editedCart.progressedAt, status: "Pannier créer le" } }
            else this.lastStatus = { orderedAt: { date: editedCart.orderedAt, status: "Payé le " } }
          else this.lastStatus = { orderedPreparationAt: editedCart.orderedPreparationAt }
        else this.lastStatus = { deliveredAt: editedCart.deliveredAt }
      else this.lastStatus = { endedAt: editedCart.endedAt }
    },

    async nextStep() {
      try {
        await this.$store.dispatch("putCart", {
          id: this.cart._id,
          status: this.statusList[this.statusList.indexOf(Object.keys(this.lastStatus)[0]) + 1]
        })

        this.$emit('reload')
      } catch (e) {
        console.error(e)
      }
    },
  },
  beforeMount() {
    this.getStatus()
  },
}
</script>
