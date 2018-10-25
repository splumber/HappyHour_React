const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userId: { type: String, required: false }, // The id of the user
  name: { type: String, required: false }, //the name of the user
  deals: { type: Array, required: false }, // array of deals
  upvotes: { type: Array, required: false }, //upvotes
  downvotes: { type: Array, required: false }, //downvotes




})

const User = mongoose.model('User', userSchema)

module.exports = User
