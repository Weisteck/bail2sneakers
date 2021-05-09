const express = require('express')
const {
	getAllCommentsService,
	getCommentByIdService,
	postCommentService,
	putCommentService,
	deleteCommentService
} = require("../services/commentService");
const router = express.Router()

const {} = require('../services/commentService')

router.get('/get-all', (req, res) => {
	getAllCommentsService()
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.get('/', (req, res) => {
	getCommentByIdService(req.query.id)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.post('/', (req, res) => {
	postCommentService(req.body)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.put('/', (req, res) => {
	putCommentService(req.query.id, req.body)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

router.delete('/', (req, res) => {
	deleteCommentService(req.query.id,)
		.then(result => res.send(result))
		.catch(err => console.error(err))
})

module.exports = router
