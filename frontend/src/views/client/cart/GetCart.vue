<template>
  <DeleteProduct v-if="deleteProductModal" :product="productToDelete" v-on:eventConfirmDelete="removeProduct"/>

  <div class="container mx-auto">

    <div class="my-8">
      <h1 class="text-4xl">PANIER</h1>
    </div>

    <form @submit.prevent="proceedToCheckout">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-1">
          <div class="card h-60">
            <h1 class="sub-title">Adresse de livraison</h1>

            <div class="-mx-3 md:flex mb-2">
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="label" for="delivery-city">
                  Ville
                </label>
                <input v-model="order.address.city"
                       class="input"
                       id="delivery-city"
                       type="text"
                       placeholder="Lyon"
                >
              </div>
              <div class="md:w-1/2 px-3">
                <label class="label" for="delivery-address">
                  Adresse
                </label>
                <input v-model="order.address.address"
                       class="input"
                       id="delivery-address"
                       type="text"
                       placeholder="27 Rue Raoul Servant"
                >
              </div>
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="label" for="delivery-zip">
                  Code postal
                </label>
                <input v-model="order.address.zipCode"
                       class="input"
                       id="delivery-zip"
                       type="text"
                       placeholder="69007"
                >
              </div>
              <div class="md:w-1/2 px-3">
                <label class="label" for="delivery-country">
                  Pays
                </label>
                <input v-model="order.address.country"
                       class="input"
                       id="delivery-country"
                       type="text"
                       placeholder="France"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="card h-60">
            <div class="grid grid-cols-10 grid-flow-col mb-1">
              <h1 class="sub-title col-span-4">Adresse de facturation</h1>

              <div class="text-right col-span-5">
                <label for="invoice" class="text-right">Utiliser la même adresse que pour la livraison</label>
              </div>

              <div class="text-right col-span-1">
                <input v-model="invoiceSameAsDelivery" type="checkbox" id="invoice" class="text-gray-600">
              </div>
            </div>

            <div class="-mx-3 md:flex mb-2">
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="label" for="city">
                  Ville
                </label>
                <input v-model="invoiceAddress.city"
                       :disabled="invoiceSameAsDelivery"
                       class="input"
                       id="city"
                       type="text"
                       placeholder="Lyon"
                >
              </div>
              <div class="md:w-1/2 px-3">
                <label class="label" for="address">
                  Adresse
                </label>
                <input v-model="invoiceAddress.address"
                       :disabled="invoiceSameAsDelivery"
                       class="input"
                       id="address"
                       type="text"
                       placeholder="27 Rue Raoul Servant"
                >
              </div>
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="label" for="zip">
                  Code postal
                </label>
                <input v-model="invoiceAddress.zipCode"
                       :disabled="invoiceSameAsDelivery"
                       class="input"
                       id="zip"
                       type="text"
                       placeholder="69007"
                >
              </div>
              <div class="md:w-1/2 px-3">
                <label class="label" for="country">
                  Pays
                </label>
                <input v-model="invoiceAddress.country"
                       :disabled="invoiceSameAsDelivery"
                       class="input"
                       id="country"
                       type="text"
                       placeholder="France"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h1 class="sub-title">Produits sélectionnées</h1>

        <div class="grid grid-cols-12 grid-flow-col mb-1 font-bold">
          <div class="col-span-3">

          </div>
          <div class="col-span-3">
            Produit
          </div>
          <div class="col-span-2">
            Prix HT
          </div>
          <div class="col-span-2">
            Prix TTC
          </div>
          <div class="col-span-2">
            Actions
          </div>
        </div>

        <hr>

        <div v-for="(product, index) in selectedProducts" :key="product.productId">
          <div class="grid grid-cols-12 grid-flow-col">
            <div class="col-span-3">
              <img :src="product.image" alt="image" class="w-40"/>
            </div>
            <div class="col-span-3 text-left self-center ">
              <span class="font-bold">{{ product.model }} - {{ product.brand }}</span>
              <br>
              <span>{{ product.color }} -  {{ product.size }}</span>
            </div>
            <div class="col-span-2 self-center">
              {{ fixPriceHt(product.priceHt, 0) }}
            </div>
            <div class="col-span-2 self-center">
              {{ fixPriceTtc(product.priceHt, 0) }}
            </div>
            <div class="col-span-2 self-center">
              <button @click="showDeleteProductModal(product, index)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-500" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
          <hr>
        </div>

        <div class="text-right mt-10">
          <p>
            Frais de livraison:
            {{ fixPriceDelivery(priceDelivery) }}
          </p>
          <p>
            Total HT:
            {{ fixPriceHt(order.priceExclTax, priceDelivery) }}
          </p>
          <p class="font-bold">
            Total TTC (+20% TVA):
            {{ fixPriceTtc(order.priceExclTax, priceDelivery) }}
          </p>
        </div>

        <div class="w-40 mx-auto">
          <button type="submit" class="mt-8 btn btn-primary mr-2">
            PAYER
          </button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
import DeleteProduct from "../../../components/DeleteProduct.vue";
import { loadStripe } from "@stripe/stripe-js";

export default {
  name: 'GetCart',
  components: { DeleteProduct },
  data() {
    return {
      cartId: "",
      selectedProducts: [],
      userId: 0,
      order: {
        status: "",
        priceExclTax: 0,
        address: {
          city: "",
          address: "",
          zipCode: "",
          country: ""
        }
      },
      invoiceAddress: {
        city: "",
        address: "",
        zipCode: "",
        country: ""
      },
      invoiceSameAsDelivery: false,
      priceDelivery: 499,
      deleteProductModal: false,
      productToDelete: null,
      user: {
        id: "",
        firstName: "",
        lastName: "",
        role: "",
        mail: ""
      },
    }
  },
  emits: [ 'confirmDelete' ],
  watch: {
    invoiceSameAsDelivery() {
      this.invoiceSameAsDelivery
        ? this.invoiceAddress = this.order.address
        : this.invoiceAddress = {
          city: "",
          address: "",
          zipCode: "",
          country: ""
        }
    }
  },
  beforeMount() {
    this.getUser()
    this.getCartIdInLocalStorage()
  },
  methods: {
    async getUser() {
      try {
        const response = await this.$store.dispatch('getUser')
        this.user = response.data
      } catch (e) {
        this.user = {
          firstName: "",
          lastName: "",
          role: "",
          mail: ""
        }
        console.error(e.response.data)
      }
    },

    showDeleteProductModal(product, index) {
      this.productToDelete = { product, index }
      this.deleteProductModal = true
    },

    getCartIdInLocalStorage() {
      this.cartId = localStorage.getItem('cartId')

      this.getCartById(this.cartId)
    },

    getCartById(cartId) {
      this.$store.dispatch('getCartById', { id: cartId })
        .then(res => {
          this.selectedProducts = res.data.selectedProducts
          this.selectedProducts.forEach(product => {
            product.priceHt = product.price
            product.priceTtc = product.price * 1.2

            this.order.priceExclTax = this.order.priceExclTax + product.priceHt
          })
        })
        .catch(err => console.error(err))
    },

    editProduct(product) {
      product.priceHt = product.price
      product.priceTtc = product.price * 1.2

      this.order.priceExclTax = 0

      this.selectedProducts.forEach(product => {
        this.order.priceExclTax = this.order.priceExclTax + product.priceHt
      })
    },

    removeProduct() {
      this.$store.dispatch('removeProductFromCart', {
        cartId: this.cartId,
        productSelected: this.productToDelete.product
      })
        .then(() => {
          this.productToDelete = {}
          this.deleteProductModal = false
        })
        .catch(err => console.error(err))

      this.selectedProducts.splice(this.productToDelete.index, 1)
      this.editProduct(this.productToDelete.product)
    },

    fixPriceHt(priceHt) {
      return priceHt.toString().substring(0, priceHt.toString().length - 2)
        + "."
        + priceHt.toString().slice(-2)
        + " €"
    },

    fixPriceTtc(priceHt, priceDelivery) {
      return priceHt === 0
        ? 0
        : (
          (Number(
              Number(
                (
                  priceHt.toString().substring(0, priceHt.toString().length - 2)
                  + '.'
                  + priceHt.toString().slice(-2)
                ) * 1.20
              )
            )
          )
          +
          (Number(
              Number(
                priceDelivery.toString().substring(0, priceDelivery.toString().length - 2)
                + '.'
                + priceDelivery.toString().slice(-2)
              )
            )
          )
        )
          .toFixed(2)
        + " €"
    },

    fixPriceDelivery(priceDelivery) {
      return priceDelivery.toString().substring(0, priceDelivery.toString().length - 2)
        + "."
        + priceDelivery.toString().slice(-2)
        + " €"
    },

    async proceedToCheckout() {
      const items = []

      this.selectedProducts.forEach(product => items.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.brand + '-' + product.model,
            images: [ product.image ]
          },
          unit_amount: product.price
        },
        quantity: 1
      }))

      try {
        await this.$store.dispatch('putCart', {
          status: null,
          id: this.cartId,
          userId: this.user.id,
          userAddress: this.invoiceAddress
        })

        const stripePromise = loadStripe("pk_test_51J4S4HC2Kud8irFwiMr7d1bEaVMAyivRya7v2DmUK5FdMPnXkquSnSg3uaENJDOB5DBrbXNnB2tQvPwNsqC3EdPm002GE9ZmyY")

        const stripe = await stripePromise;

        const response = await this.$store.dispatch('createCheckoutSession', {
          items: items,
          cartId: this.cartId
        })

        const session = await response.data;

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        })

        if (result.error)
          console.error((result.error.message))

      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.custom-number-input input:focus {
  outline: none !important;
}

.custom-number-input button:focus {
  outline: none !important;
}
</style>
