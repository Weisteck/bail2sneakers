const {
  postUserRepository,
  getAllUsersRepository,
  getUserByIdRepository,
  putUserRepository,
  deleteUserRepository
} = require('../repositories/userRepository');

const postUserService = async(user) => {
  return await postUserRepository(user)
    .then(res => res)
    .catch(err => console.error(err))
};

const getAllUsersService = async() => {
  return await getAllUsersRepository()
    .then(res => res)
    .catch(err => console.error(err))
};

const getUserByIdService = async(id) => {
  return await getUserByIdRepository(id)
    .then(res => res)
    .catch(err => console.error(err))
};

const putUserService = async(id, user) => {
  return await putUserRepository(id, user)
    .then(res => res)
    .catch(err => console.error(err))
};

const deleteUserService = async(id) => {
  return await deleteUserRepository(id)
    .then(res => res)
    .catch(err => console.error(err))
};

module.exports = {
  postUserService: postUserService,
  getAllUsersService: getAllUsersService,
  getUserByIdService: getUserByIdService,
  putUserService: putUserService,
  deleteUserService: deleteUserService
}
