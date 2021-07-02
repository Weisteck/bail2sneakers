const {
	postCommentRepository,
	getAllCommentsRepository,
	getCommentByIdRepository,
	putCommentRepository,
	deleteCommentRepository
} = require("../repositories/commentRepository")

const postCommentService = async (comment) => {
	return await postCommentRepository(comment)
		.then(res => res)
		.catch(err => console.error(err))
}

const getAllCommentsService = async () => {
	return await getAllCommentsRepository()
		.then(res => res)
		.catch(err => console.error(err))
}

const getCommentByIdService = async (id) => {
	return await getCommentByIdRepository(id)
		.then(res => res)
		.catch(err => console.error(err))
}

const putCommentService = async (id, comment) => {
	return await putCommentRepository(id, comment)
		.then(res => res)
		.catch(err => console.error(err))
}

const deleteCommentService = async (id) => {
	return await deleteCommentRepository(id)
		.then(res => res)
		.catch(err => console.error(err))
}

module.exports = {
	postCommentService: postCommentService,
	getAllCommentsService: getAllCommentsService,
	getCommentByIdService: getCommentByIdService,
	putCommentService: putCommentService,
	deleteCommentService: deleteCommentService
}
