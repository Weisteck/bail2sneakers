const User = require('../models/users')
const ObjectId = require('mongoose').Types.ObjectId;

const postUserRepository = (user) => {
  return User.create(user)
    .then(() => {
      return { message: "L'utilisateur à bien été créer.", status: 200 }
    })
    .catch(err => {
      console.error(err)
      return { status: 409 }
    })
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
