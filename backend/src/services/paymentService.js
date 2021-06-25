const stripe = require('stripe')('sk_test_51J4S4HC2Kud8irFw2YvIgWGrZczNQ2PN1kpq59XMQTtHcUyjxpxEbrJbq0BRE8JW2YXDSzqKfdFVFDJ1pfLKqVgK00tsHHEtW7')

const createCheckoutSessionService = async (items) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [ 'card' ],
      line_items: items,
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout/success',
      cancel_url: 'http://localhost:3000/checkout/cancel'
    })

    return ({ id: session.id })
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  createCheckoutSessionService: createCheckoutSessionService,
}
