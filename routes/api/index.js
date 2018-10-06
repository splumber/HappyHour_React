const router = require("express").Router();
const listingRoutes = require("./listingRoutes");

router.use("/listing", listingRoutes);

module.exports = router;