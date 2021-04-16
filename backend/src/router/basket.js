import { postBasketService } from "../services/basketService";

const express = require('express')
const router = express.Router()

const Basket = require('../models/Basket')

router.get("/", (req, res) => {

})

router.post("/", (req, res) => {
	postBasketService(req.body)
})
