const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  _id: { type: String, required: true }, //the id of the business
  restaurantName: { type: String, required: true }, //the display name of the business
  restaurantAlias: { type: String, required: true }, //the alias that seperates businesses's of the same franchise (Chili's 1 from Chili's 324)
  address: {type: Array, required: true}, 
  coordinates: { //Restaraunt coordinates. This is what we will actually use to put restaraunts on to our map
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  categories: Array,
  hasFood: { type: Boolean, required: true }, //Whether or not this restaraunt has a food special currently loaded
  hasDrink: { type: Boolean, required: true }, //Whether or not this restaraunt has a drink special currently loaded
  phone: { type: String, required: true }, //Restaraunt phone number
  image: { type: String, required: true }, //Image for the restraunt
  url: { type: String, required: true }, //Link to yelp page
  rating: { type: Number, required: true }, //Current rating
  review_count: { type: Number, required: true }, //Current number of reviews
  deals: {type: Array, required: false}
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
