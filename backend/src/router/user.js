const express = require('express');
const router = express.Router();

const {
  postUserService,
  getAllUserService,
  getUserByService,
  putUserService,
  deleteUserService
} = require('../services/userService');

const users = require('../models/users');

router.get('/users', (req, res) => {
  const users = await
})

router.post('/', (req, res) => {
  postUser(req.body)
})