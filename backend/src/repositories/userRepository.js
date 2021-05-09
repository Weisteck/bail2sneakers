const User = require('../models/users')
const ObjectId = require('mongoose').Types.ObjectId;

const postUserRepository = (user) => {
  const { save } = new User(user)

  return save()
    .then(() => true)
    .catch(err => console.error(err))
};

const getAllUsersRepository = async () => {
  return User.find()
};

const getUserByIdRepository = (id) => {
  return User.findOne({ "_id": new ObjectId(id) });
};

const putUserRepository = (id, user) => {
  return User.updateOne({
    "_id": new ObjectId(id)
  },
    user
  )
};

const deleteUserRepository = (id) => {
  return User.deleteOne({ "_id": new ObjectId(id) });
};

module.exports = {
  postUserRepository: postUserRepository,
  getAllUsersRepository: getAllUsersRepository,
  getUserByIdRepository: getUserByIdRepository,
  putUserRepository: putUserRepository,
  deleteUserRepository: deleteUserRepository
}