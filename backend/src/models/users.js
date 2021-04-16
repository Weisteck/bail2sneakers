const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
  users: [
    {
      interest: {
        man: { type: Boolean },
        woman: { type: Boolean }
      },
      lastName: { type: String },
      firstName: { type: String },
      role: { type: String },
      mail: { type: String },
      phoneNumber: { type: String },
      deliveryAdresses: [
        {
          city: { type: String },
          adress: { type: String },
          zipCode: { type: String },
          country: { type: String },
        }
      ],
      birthday: { type: Date },
    }
  ]
})

module.exports = mongoose.model('users', userSchema)