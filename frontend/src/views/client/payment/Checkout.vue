<template>
  <section>
    <div class="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div class="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <button type="button" @click="checkout">Checkout</button>
  </section>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
  name: 'checkout',
  methods: {
    async checkout() {
      try {
        const stripePromise = loadStripe("pk_test_51J4S4HC2Kud8irFwiMr7d1bEaVMAyivRya7v2DmUK5FdMPnXkquSnSg3uaENJDOB5DBrbXNnB2tQvPwNsqC3EdPm002GE9ZmyY")

        const stripe = await stripePromise;

        const response = await this.$store.dispatch('createCheckoutSession')

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
