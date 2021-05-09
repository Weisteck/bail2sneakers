const Comment = require('../models/Comment')
const ObjectId = require('mongoose').Types.ObjectId;

const postCommentRepository = (comment) => {
	return Comment.create(comment)
		.then(() => true)
		.catch(err => console.error(err))
}

const getAllCommentsRepository = async () => {
	return Comment.find()
}
const getCommentByIdRepository = (id) => {
	return Comment.findOne({"_id": new ObjectId(id)})
}
const putCommentRepository = (id, comment) => {
	return Comment.updateOne({
		"_id": new ObjectId(id)
	},
		comment
	)
}

const deleteCommentRepository = (id) => {
	return Comment.deleteOne({ "_id": new ObjectId(id)})
}

module.exports = {
	postCommentRepository: postCommentRepository,
	getAllCommentsRepository: getAllCommentsRepository,
	getCommentByIdRepository: getCommentByIdRepository,
	putCommentRepository: putCommentRepository,
	deleteCommentRepository: deleteCommentRepository
}
