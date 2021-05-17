const mongoose = require('mongoose')
const schema = mongoose.Schema

const BasketSchema = new schema({
	selectedProducts: [{
		_id: false,
		productId: { type: String },
		brand: { type: String },
		model: { type: String },
		price: { type: Number },
		image: { type: String },
		color: { type: String },
		size: { type: Number },
	}],
	userId: { type: mongoose.ObjectId },
	order: {
		status: { type: String },
		priceExclTax: { type: Number },
		address: {
			city: { type: String },
			address: { type: String },
			zipCode: { type: String },
			country: { type: String }
		}
	}
})

module.exports = mongoose.model('basket', BasketSchema)
