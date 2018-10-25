const db = require('../models')

// Defining methods for the happyController
module.exports = {
  getAllRest: function (req, res) {
    db.Restaurant
      .find({
        'hasFood': req.params.hasFood,
        'hasDrink': req.params.hasDrink,
        'categories.title': req.params.hasCategory // This will be defaulted to All if nothing is specified or if All is specified, which should return All since all categories will contain an All category
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  updateRestFoodDrink: function (req, res) { // think these are correct, just have to make sure the ID is correct or whatever. I guess we can put the id in the req.body as well. Basically, the req.body will have the id of the Restaurant and will also have the true boolean value for hasDrink or hasFood. Should be able to use this model for both.
    db.Restaurant
      .findByIdAndUpdate(
        req.params.id, // where to update
        req.body, // the object that will contain the new values
        { new: true } // a config to say return the new stuff not the old stuff
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  getDeals: function (req, res) { // Not sure how were gonna get the stuff to display dynamically or if we have to do that here ... I guess we just do it in the state and when our left nav gets pulled up it will bring those up from the state where that ID is equal to the given nav data's ID.
    db.Deal
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  createDeal: function (req, res) {
    db.Deal
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  updateDeal: function (req, res) { // the method to update someone else's isGood or isBad values (upvote or downvote)
    db.Deal
      .findByIdAndUpdate(
        req.params.id, // where to update
        req.body, // the object that will contain the new values
        { new: true } // a config to say return the new stuff not the old stuff
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
