const express = require('express');
const router = express.Router();

const {
  postUserService,
  getAllUsersService,
  getUserByIdService,
  putUserService,
  deleteUserService
} = require('../services/userService');

router.post('/', (req, res) => {
  postUserService(req.body)
    .then(result => res.send(result))
    .catch(err => console.error(err))
});

router.get('/get-all', (req, res) => {
  getAllUsersService()
    .then(result => res.send(result))
    .catch(err => console.error(err))
});

router.get('/', (req, res) => {
  getUserByIdService(req.query.id)
    .then(result => res.send(result))
    .catch(err => console.error(err))
});

router.put('/', (req, res) => {
  putUserService(req.query.id, req.body)
    .then(result => res.send(result))
    .catch(err => console.error(err))
});

router.delete('/', (req, res) => {
  deleteUserService(req.query.id)
    .then(result => res.send(result))
    .catch(err => console.error(err))
});

module.exports = router;
