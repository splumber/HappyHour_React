const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dealSchema = new Schema({
  userId: { type: String, required: false }, // The id of the user who posted,
  businessId: { type: String, required: true }, // the id of the business this is attached to. WE WILL LET MONGODB MAKE IT'S UNIQUE PRIMARY KEY ID FOR THIS SINCE IT'S NOT SPECIFIED.
  restaurantAlias: { type: String, required: true }, // the display name of the business this is attached to for our own navigation purposes (just to make the db easier to read.)
  happyFood: { type: Boolean, required: true }, // Whether it has a food special
  happyDrink: { type: Boolean, required: true }, // Whether it has a drink special
  timeDay: { type: String, required: false }, // Day of deal SET FALSE NOW BUT WHEN WE IMPLMENET TIME THIS WILL BE TRUE
  timeStart: { type: Number, required: false }, // Beginning of deal time SET FALSE NOW BUT WHEN WE IMPLMENET TIME THIS WILL BE TRUE
  timeEnd: { type: Number, required: true }, // End of deal time
  timeStartPresent: { type: String, required: false }, // Beginning of deal time in presentable fashion SET FALSE NOW BUT WHEN WE IMPLMENET TIME THIS WILL BE TRUE
  timeEndPresent: { type: String, required: false }, // End of deal time in presentable fashion
  summary: { type: String, required: false }, // User write up on food
  isBeer: { type: Boolean, required: false }, // Whether or not it is a beer special
  isWine: { type: Boolean, required: false }, // Whether or not it is a wine special
  isLiquor: { type: Boolean, required: false }, // Whether or not it is a liquor special
  isOther: { type: Boolean, required: false }, // Whether or not it is some kind of other special
  isGood: { type: Number, required: true }, // The current number of upvotes,
  isGoodUsers: { type: Array, required: false }, // The current users who upvoted,
  isBad: { type: Number, required: true }, // The current number of downvotes,
  isBadUsers: { type: Array, required: false } // The current users who downvoted,

})

const Deal = mongoose.model('Deal', dealSchema)

module.exports = Deal
