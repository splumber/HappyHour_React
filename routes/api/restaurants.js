const router = require("express").Router();
const happyController = require("../../controllers/happyController");
const axios = require("axios");
const db = require('../../models');


//NEED TO UPDATE ROUTES FOR APP, I DON'T REALLY GET HOW THIS WORK LIKE WHY IS IT API/BOOKS

// Matches with "/api/restaurants"

router.get("/", (req, res) => {
  console.log('It got to the route');

  db.Restaurant
    .find({
      // 'hasFood': req.params.hasFood,
      // 'hasDrink': req.params.hasDrink,
      // 'categories.title': req.params.hasCategory 
    })
    .then(dbModel => {
      console.log('It tried to run the db command');
      // console.log('mydbModel', dbModel);
      // console.log(dbModel);
      res.json(dbModel)
    })
    .catch(err => res.status(422).json(err));

});

router.get("/deals", (req, res) => {
  console.log('It got to the route');

  db.Deal
    .find({
      // 'hasFood': req.params.hasFood,
      // 'hasDrink': req.params.hasDrink,
      // 'categories.title': req.params.hasCategory 
    })
    .then(dbModel => {
      console.log('It tried to run the db command for OURS DEALS MUTHA');
      // console.log('mydbModel', dbModel);
      // console.log(dbModel);
      res.json(dbModel)
    })
    .catch(err => res.status(422).json(err));

});

router.post("/update", (req, res) => {
  //This needs to get the deal, but it also needs to update the restaurant with the new deal
  console.log('It got to the update route');
  // console.log(req.body.Restaurant);
  // console.log(req.body.Deal);

  var sentBoolFood = false;
  var sentBoolDrink = false;

  console.log('myREQBODY', req.body);

  //If the current deals are both false, send whatever is new, BUT NEVER SET A CURRENT TRUE TO FALSE

  //basically you can only set a false to false

  //examples: We are sending a hasFood true and has Drink false to a restaurant with both as false false. This conditional should do nothing
  //We are sending a drink to something that already has food FOOD: TRUE DRINK: FALSE, The drink special comes in as not having food, but because it is already set to true the bool will now come in as true

  if (req.body.Restaurant.hasFood == true) {
    sentBoolFood = true;
  }
  else {
    sentBoolFood = req.body.Deal.happyFood
  }

  if (req.body.Restaurant.hasDrink == true) {
    sentBoolDrink = true;
  }
  else {
    sentBoolDrink = req.body.Deal.happyDrink
  }



  db.Deal
    .create(req.body.Deal)
    .then(dbModel => {
      console.log('It tried to run the update db command for OURS DEALS MUTHA');
      // console.log('mydbModel', dbModel);
      // console.log(dbModel);
      // res.json(dbModel)
    })
    .catch(err => res.status(422).json(err));

  //think this fixes it
  db.Restaurant
    .findOneAndUpdate(
      // 'hasFood': req.params.hasFood,
      { _id: req.body.Restaurant.id },
      {
        hasFood: sentBoolFood,
        hasDrink: sentBoolDrink,
        $push: { deals: req.body.Deal }
      },
      { new: true }
    )
    .then(dbModel => {
      console.log('It tried to run the update db command for OURS DEALS MUTHA');
      // console.log('mydbModel', dbModel);
      // console.log(dbModel);
      res.json(dbModel)
    })
    .catch(err => res.status(422).json(err));



  db.User
    .findOneAndUpdate(
      // 'hasFood': req.params.hasFood,
      { userId: req.body.User.userId },
      {
        $push: { deals: req.body.Deal }
      },
      { new: true }
    )
    .then(dbModel => {
      console.log('Updated user with deals');
    })
    .catch(err => res.status(422).json(err));



});

// router.put("/votes/good", (req, res) => {
//   console.log('It got to the good votes route');
//   console.log(req.body)

//   //We will probably have to write our logic into here...

//   var goodUser = true;

//   db.Deal.findOne({
//     _id: req.body.Id
//   }
//   ).then(dbModel => {

//     console.log('I FOUND THIS', dbModel);

//     dbModel.isGoodUsers.forEach(user => {
//       if (user.userId == req.body.user.userId) {
//         console.log('YOU CANNOT UPDATE TWICE YOU JERK!', user)
//         goodUser = false;
//       }
//       if (user == null) {
//         console.log('Ignore that shit')
//       }
//     })

//     console.log('WHAT GOOD USER IS CURRENTLY', goodUser);

//     if (goodUser == false) {
//       responseObject = {
//         userId: 'failed'
//       }
//       res.json(responseObject);
//     }
//     else if (goodUser == true) {
//       db.Deal
//         .findOneAndUpdate(
//           // 'hasFood': req.params.hasFood,
//           // { businessId: req.body.busId,
//           //   _id: req.body.Id
//           //  },
//           {
//             _id: req.body.Id
//           },
//           {
//             isGood: req.body.newUp,
//             $push: { isGoodUsers: req.body.user }
//           },
//           { new: true }
//         )
//         .then(dbModel => {
//           console.log('It tried to run the update db command for OURS DEALS MUTHA');
//           // console.log('mydbModel', dbModel);
//           // console.log(dbModel);
//           res.json(dbModel)
//         })
//         .catch(err => res.status(422).json(err));
//     }



//   })

//   // db.Deal
//   //   .findOneAndUpdate(
//   //     // 'hasFood': req.params.hasFood,
//   //     // { businessId: req.body.busId,
//   //     //   _id: req.body.Id
//   //     //  },
//   //     { 
//   //       _id: req.body.Id
//   //      },
//   //     { isGood: req.body.newUp,
//   //       $push: { isGoodUsers: req.body.user }  },
//   //     {new: true}
//   //   )
//   //   .then(dbModel => {
//   //     console.log('It tried to run the update db command for OURS DEALS MUTHA');
//   //     // console.log('mydbModel', dbModel);
//   //     // console.log(dbModel);
//   //     res.json(dbModel)
//   //   })
//   //   .catch(err => res.status(422).json(err));

//   // db.Restaurant
//   //   .findOneAndUpdate(
//   //     // 'hasFood': req.params.hasFood,
//   //     { _id: req.body.Restaurant.id },
//   //     { $push: { deals: req.body.Deal } }
//   //   )
//   //   .then(dbModel => {
//   //     console.log('It tried to run the update db command for OURS DEALS MUTHA');
//   //     // console.log('mydbModel', dbModel);
//   //     // console.log(dbModel);
//   //     // res.json(dbModel)
//   //   })
//   //   .catch(err => res.status(422).json(err));




// });

router.put("/votes/bad", (req, res) => {
  console.log('It got to the bad votes route');
  console.log(req.body)

  var badUser = true;

  db.Deal.findOne({
    _id: req.body.Id
  }
  ).then(dbModel => {

    console.log('I FOUND THIS', dbModel);
    console.log('REQ BODY BRUH', req.body);

    dbModel.isBadUsers.forEach(user => {
      if (user == null) {
        console.log('Ignore that shit')
      }
      else if (user.userId == req.body.user.userId) {
        console.log('YOU CANNOT UPDATE TWICE YOU JERK!')
        badUser = false;
      }
    })

    console.log('WHAT GOOD USER IS CURRENTLY', badUser);

    if (badUser == false) {
      responseObject = {
        userId: 'failed'
      }
      res.json(responseObject);
    }
    else if (badUser == true) {
      db.Deal
        .findOneAndUpdate(
          // 'hasFood': req.params.hasFood,
          // { businessId: req.body.busId,
          //   _id: req.body.Id
          //  },
          {
            _id: req.body.Id
          },
          {
            isBad: req.body.newDown,
            $push: { isBadUsers: req.body.user }
          },
          { new: true }
        )
        .then(dbModel => {
          console.log('It tried to run the update db command for OURS DEALS MUTHA');
          // console.log('mydbModel', dbModel);
          // console.log(dbModel);
          res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));

        console.log('DEAL DATA PRE-RUN',req.body.dealdata, req.body.user.userId),


      db.User
        .findOneAndUpdate(
          // 'hasFood': req.params.hasFood,
          { userId: req.body.user.userId },
          {
            $push: { downvotes: req.body.dealdata }
          },
          { new: true }
        )
        .then(dbModel => {
          console.log('Updated user with new downvote');
        })
        .catch(err => res.status(422).json(err));
    }



  })



});

router.put("/votes/good", (req, res) => {
  console.log('It got to the good votes route');
  console.log(req.body)

  var goodUser = true;

  db.Deal.findOne({
    _id: req.body.Id
  }
  ).then(dbModel => {

    console.log('I FOUND THIS', dbModel);

    dbModel.isGoodUsers.forEach(user => {
      if (user.userId == req.body.user.userId) {
        console.log('YOU CANNOT UPDATE TWICE YOU JERK!', user)
        goodUser = false;
      }
      if (user == null) {
        console.log('Ignore that shit')
      }
    })

    console.log('WHAT GOOD USER IS CURRENTLY', goodUser);

    if (goodUser == false) {
      responseObject = {
        userId: 'failed'
      }
      res.json(responseObject);
    }
    else if (goodUser == true) {
      db.Deal
        .findOneAndUpdate(
          // 'hasFood': req.params.hasFood,
          // { businessId: req.body.busId,
          //   _id: req.body.Id
          //  },
          {
            _id: req.body.Id
          },
          {
            isGood: req.body.newUp,
            $push: { isGoodUsers: req.body.user }
          },
          { new: true }
        )
        .then(dbModel => {
          console.log('It tried to run the update db command for OURS DEALS MUTHA');
          // console.log('mydbModel', dbModel);
          // console.log(dbModel);
          res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));

        console.log('DEAL DATA PRE-RUN',req.body.dealdata, req.body.user.userId),


        db.User
        .findOneAndUpdate(
          // 'hasFood': req.params.hasFood,
          { userId: req.body.user.userId },
          {
            $push: { upvotes: req.body.dealdata }
          },
          { new: true }
        )
        .then(dbModel => {
          console.log('Updated user with new upvote');
        })
        .catch(err => res.status(422).json(err));

        

        
    



    }



  })



});

router.post("/users", (req, res) => {
  console.log('It got to the usersroute');
  console.log(req.body)

  //We will probably have to write our logic into here...

  var goodUser = true;

  db.User.findOne({
    userId: req.body.userObject.userId
  }
  ).then(dbModel => {

    if (dbModel) {
      console.log('Welcome back :)')
    }
    else {

      db.User.create({
        userId: req.body.userObject.userId,
        name: req.body.userObject.userName
      }
      ).then(dbModel => {
        console.log('A NEW USER IS APPROACHING!');


      });
    }
  })


});



















module.exports = router;