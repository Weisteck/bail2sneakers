const express = require('express')
const router = express.Router()
const { createCheckoutSessionService } = require("../services/paymentService")
const { putCartService } = require("../services/cartService")
const stripe = require('stripe')('sk_test_51J4S4HC2Kud8irFw2YvIgWGrZczNQ2PN1kpq59XMQTtHcUyjxpxEbrJbq0BRE8JW2YXDSzqKfdFVFDJ1pfLKqVgK00tsHHEtW7')

router.post('/create-checkout-session', async (req, res) => {
  try {
    const response = await createCheckoutSessionService(req.body.items, req.body.cartId)
    res.json(response)
  } catch (e) {
    console.error(e)
  }
})

router.get('/checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.id, {
    expand: ['line_items']
  })
  res.json(session)
})


router.get('/checkout-success', async (req, res) => {
  console.log("in checkout success api")
  const session = await stripe.checkout.sessions.retrieve(req.query.id, {
    expand: ['line_items']
  })

  const putCartServiceResponse = await putCartService(session.data.metadata.cartId)
  res.send(`<html lang="en"><body><h1>Thanks for your order!</h1></body></html>`);
})

module.exports = router
