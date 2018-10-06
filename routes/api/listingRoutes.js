const router = require("express").Router();
const listingController = require("../../controllers/listingController");

router.route("/")
    .get(listingController.findAll)
    .post(listingController.create);

router.route("/:id")
    .get(listingController.findById)
    .put(listingController.update)
    .delete(listingController.remove)

module.exports = router;