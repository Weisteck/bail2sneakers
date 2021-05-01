<template>
  <div class="container mx-auto">
    <h1 class="form-title">PANIER</h1>

    <div class="form-card">
      <h1 class="form-sub-title">Adresse de livraison</h1>

      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="form-label" for="delivery-city">
            Ville
          </label>
          <input v-model="order.address.city"
                 class="form-input"
                 id="delivery-city"
                 type="text"
                 placeholder="Lyon"
          >
        </div>
        <div class="md:w-1/2 px-3">
          <label class="form-label" for="delivery-address">
            Adresse
          </label>
          <input v-model="order.address.address"
                 class="form-input"
                 id="delivery-address"
                 type="text"
                 placeholder="27 Rue Raoul Servant"
          >
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="form-label" for="delivery-zip">
            Code postal
          </label>
          <input v-model="order.address.zipCode"
                 class="form-input"
                 id="delivery-zip"
                 type="text"
                 placeholder="69007"
          >
        </div>
        <div class="md:w-1/2 px-3">
          <label class="form-label" for="delivery-country">
            Pays
          </label>
          <input v-model="order.address.country"
                 class="form-input"
                 id="delivery-country"
                 type="text"
                 placeholder="France"
          >
        </div>
      </div>
    </div>

    <div class="form-card">
      <div class="grid grid-cols-10 grid-flow-col mb-1">
        <h1 class="form-sub-title col-span-4">Adresse de facturation</h1>

        <div class="text-right col-span-5">
          <label for="invoice" class="text-right">Utiliser la même adresse que pour la livraison</label>
        </div>

        <div class="text-right col-span-1">
          <input v-model="invoiceSameAsDelivery" type="checkbox" id="invoice" class="text-gray-600">
        </div>
      </div>


      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="form-label" for="city">
            Ville
          </label>
          <input v-model="invoiceAddress.city"
                 :disabled="invoiceSameAsDelivery"
                 class="form-input"
                 id="city"
                 type="text"
                 placeholder="Lyon"
          >
        </div>
        <div class="md:w-1/2 px-3">
          <label class="form-label" for="address">
            Adresse
          </label>
          <input v-model="invoiceAddress.address"
                 :disabled="invoiceSameAsDelivery"
                 class="form-input"
                 id="address"
                 type="text"
                 placeholder="27 Rue Raoul Servant"
          >
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="form-label" for="zip">
            Code postal
          </label>
          <input v-model="invoiceAddress.zipCode"
                 :disabled="invoiceSameAsDelivery"
                 class="form-input"
                 id="zip"
                 type="text"
                 placeholder="69007"
          >
        </div>
        <div class="md:w-1/2 px-3">
          <label class="form-label" for="country">
            Pays
          </label>
          <input v-model="invoiceAddress.country"
                 :disabled="invoiceSameAsDelivery"
                 class="form-input"
                 id="country"
                 type="text"
                 placeholder="France"
          >
        </div>
      </div>
    </div>

    <div class="form-card">
      <h1 class="form-sub-title">Produits sélectionnées</h1>

      <div class="grid grid-cols-12 grid-flow-col mb-1 font-bold">
        <div class="col-span-3">

        </div>
        <div class="col-span-2">
          Produit
        </div>
        <div class="col-span-2">
          Quantité
        </div>
        <div class="col-span-2">
          Prix HT
        </div>
        <div class="col-span-2">
          Prix TTC
        </div>
        <div class="col-span-1">
          Actions
        </div>
      </div>

      <hr>

      <div v-for="(product, index) in selectedProducts" :key="product.productId">
        <div class="grid grid-cols-12 grid-flow-col">
          <div class="col-span-3">
            <img :src="product.image" alt="image" class="w-40"/>
          </div>
          <div class="col-span-2 text-left self-center ">
            <span class="font-bold">{{ product.model }} - {{ product.brand }}</span>
            <br>
            <span>{{ product.color }} -  {{ product.size }}</span>
          </div>
          <div class="col-span-2 self-center">
            <div class="custom-number-input">
              <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button @click="decrementQuantity(product)"
                        class="form-input-number-decrement"
                        :disabled="product.quantity <= 1"
                >
                  <span class="m-auto text-2xl font-thin">−</span>
                </button>
                <input type="number"
                       class="form-input-number"
                       name="custom-input-number"
                       v-model="selectedProducts[selectedProducts.indexOf(product)].quantity"
                       @change="editProduct(product)"
                       :disabled="product.quantity <= 1"
                >
                <button @click="incrementQuantity(product)"
                        class="form-input-number-increment">
                  <span class="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-span-2 self-center">
            {{ fixPriceHt(product.priceHt, 0) }}
          </div>
          <div class="col-span-2 self-center">
            {{ fixPriceTtc(product.priceHt, 0) }}
          </div>
          <div class="col-span-1 self-center">
            <button @click="removeProduct(product, index)" class="">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-500" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
        <hr>
      </div>

      <div class="text-right">
        <p>
          Frais de livraison:
          {{ fixPriceDelivery(priceDelivery) }}
        </p>
        <p>
          Total HT:
          {{ fixPriceHt(order.priceExclTax, priceDelivery) }}
        </p>
        <p class="font-bold">
          Total TTC:
          {{ fixPriceTtc(order.priceExclTax, priceDelivery) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateBasket',
  data() {
    return {
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
    }
  },
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
    this.createFakeData()
  },
  methods: {
    createFakeData() {
      this.selectedProducts = [
        {
          productId: 0,
          brand: "Converse",
          model: "All Star",
          price: 5999,
          image: "https://www.converse.com/on/demandware.static/-/Sites-ConverseMaster/default/dwbebed5b9/images/hi-res/M9160C_standard.jpg",
          color: "black",
          size: 42,

          quantity: 1,
        },
        {
          productId: 1,
          brand: "Nike",
          model: "Air Force 1",
          price: 8999,
          image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ebad848a-13b1-46d5-a85e-49b4b6a4953c/chaussure-air-force-1-le-pour-plus-age-cJV32q.png",
          color: "white",
          size: 42,
          quantity: 1,
        }
      ]

      this.selectedProducts.forEach(product => {
        product.priceHt = (product.price * product.quantity)
        product.priceTtc = (product.price * product.quantity) * 1.2

        this.order.priceExclTax = this.order.priceExclTax + product.priceHt
      })
    },

    decrementQuantity(product) {
      product.quantity = product.quantity -= 1
      this.editProduct(product)
    },

    incrementQuantity(product) {
      product.quantity = product.quantity += 1
      this.editProduct(product)
    },

    editProduct(product) {
      product.priceHt = (product.price * product.quantity)
      product.priceTtc = (product.price * product.quantity) * 1.2

      this.order.priceExclTax = 0

      this.selectedProducts.forEach(product => {
        this.order.priceExclTax = this.order.priceExclTax + product.priceHt
      })
    },

    removeProduct(product, index) {
      this.selectedProducts.splice(index, 1)
      this.editProduct(product)
    },

    fixPriceHt(priceHt, priceDelivery) {
      priceHt += priceDelivery
      return priceHt.toString().substring(0, priceHt.toString().length - 2)
        + "."
        + priceHt.toString().slice(-2)
        + " €"
    },

    fixPriceTtc(priceHt, priceDelivery) {
      priceHt += priceDelivery
      return (Number(
          priceHt.toString().substring(0, priceHt.toString().length - 2)
          + '.'
          + priceHt.toString().slice(-2)
          ) * 1.20
        ).toFixed(2)
        + " €"
    },

    fixPriceDelivery(priceDelivery) {
      return priceDelivery.toString().substring(0, priceDelivery.toString().length - 2)
        + "."
        + priceDelivery.toString().slice(-2)
        + " €"
    },
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
