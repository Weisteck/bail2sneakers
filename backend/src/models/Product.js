const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
	categories: [ String ],
	brand: {
		name: String,
		brandDescription: String,
		logo: String
	},
	model: String,
	details: {
		description: String,
		materials: [ String ],
		origin: String
	},
	rating: Number,
	priceExclTax: Number,
	images: [ String ],
	variants: [
		{
			color: String,
			sizes: [
				{
					size: Number,
					stock: Number
				}
			]
		}
	]
})

module.exports = mongoose.model('product', ProductSchema)
