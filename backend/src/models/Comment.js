const mongoose = require('mongoose')
const schema = mongoose.Schema

const CommentSchema = new schema({
	productId: { type: String },
	userId: { type: String },
	comment: { type: String },
	rate: { type: Number }
})

module.exports = mongoose.model('comment', CommentSchema)
