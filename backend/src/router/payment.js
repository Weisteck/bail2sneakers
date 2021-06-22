const express = require('express')
const router = express.Router()
const { createCheckoutSessionService } = require("../services/paymentService")

router.post('/create-checkout-session', async (req, res) => {
  try {
    const response = await createCheckoutSessionService(req.body)
    res.json(response)
  } catch (e) {
    console.error(e)
  }
})

module.exports = router
