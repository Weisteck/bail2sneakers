const stripe = require('stripe')('sk_test_51J4S4HC2Kud8irFw2YvIgWGrZczNQ2PN1kpq59XMQTtHcUyjxpxEbrJbq0BRE8JW2YXDSzqKfdFVFDJ1pfLKqVgK00tsHHEtW7')
const {
  putCartService
} = require('./cartService');
const createCheckoutSessionService = async (items, cartId) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [ 'card' ],
      line_items: items,
      metadata: {
        'cartId': cartId
      },
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout/success?id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/checkout/cancel'
    })

    //const putCartServiceResponse = await putCartService(cartId)
    //console.log(putCartServiceResponse)

    return ({ id: session.id })
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  createCheckoutSessionService: createCheckoutSessionService,
}
