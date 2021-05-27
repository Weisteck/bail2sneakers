const mongoose = require('mongoose')
const schema   = mongoose.Schema

const ProductsSchema = new schema({
    categories: { type:String, lowercase: true},
    brand: {
        name: { type:String},
        brandDescription: { type:String},
        logo : { type:String}
    },
    model: { type:String},
    details: {
        description: { type:String},
        materials: [String],
        origin: { type:String}
    },
    rating: { type:Number},
    priceExclTax: { type:Number},
    images: [String],
    variants: [{
        color: { type:String},
        sizes: [{
            size:{ type:Number},
            stock: { type:Number}
        }]
    }]
})

module.exports=ProductsSchema=mongoose.model('products', ProductsSchema)