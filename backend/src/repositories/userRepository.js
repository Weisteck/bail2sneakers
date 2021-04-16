import users from '../models/users'

const postUserRepository = (user) => {
  const newUser = new User(user)

  newUser.save()
    .then(res => res)
    .catch(err => console.log(err))
}

export {
  postUserRepository
}