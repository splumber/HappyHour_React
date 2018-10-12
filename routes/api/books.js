const router = require("express").Router();
const happyController = require("../../controllers/happyController");

//NEED TO UPDATE ROUTES FOR APP, I DON'T REALLY GET HOW THIS WORK LIKE WHY IS IT API/BOOKS

// Matches with "/api/books"
router.route("/")
  .get(happyController.getAllRest)
  // .post(happyController.create);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(happyController.findById)
//   .put(happyController.update)
//   .delete(happyController.remove);

module.exports = router;
