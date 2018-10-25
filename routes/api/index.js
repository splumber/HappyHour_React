const router = require('express').Router()
const restaurants = require('./restaurants')

// NEED TO UPDATE ROUTES FOR APP

// Book routes
router.use('/restaurants', restaurants)

module.exports = router
