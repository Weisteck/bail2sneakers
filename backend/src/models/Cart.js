const mongoose = require('mongoose')
const schema = mongoose.Schema



const CartSchema = new schema({
	selectedProducts: [ {
		productId: { type: String },
		brand: { type: String },
		model: { type: String },
		price: { type: Number },
		image: { type: String },
		color: { type: String },
		size: { type: Number },
	} ],
	userId: { type: mongoose.ObjectId },
	order: {
		history: {
			progressedAt: { type: Date },
			orderedAt: { type: Date },
			orderedPreparationAt: { type: Date },
			deliveredAt: { type: Date },
			endedAt: { type: Date },
			canceledAt: { type: Date },
			operatorId: { type: mongoose.ObjectId }
		},
		priceExclTax: { type: Number },
		address: {
			city: { type: String },
			address: { type: String },
			zipCode: { type: String },
			country: { type: String }
		}
	}
})

module.exports = mongoose.model('cart', CartSchema)
