const db = require("../models");

module.exports = {
    findAll: function(req, res){
        db.Listing
            .find(req.query)
            .sort({data: -1})
            // add database name in .then function
            .then(dbOffice => res.json(dbOffice))
            .catch(err => res.status(422).json(err))
    },
    findById: function(req, res){
        db.Listing
            .findById(req.params.id)
            .then(dbOffice => res.json(dbOffice))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res){
        db.Listing
            .create(req.body)
            .then(dbOffice => res.json(dbOffice))
            .catch(err => res.status(422).json(err))
    },
    update: function(req, res){
        db.Listing
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbOffice => res.json(dbOffice))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res){
        db.Listing
            .findById({ _id: req.params.id })
            .then(dbOffice => dbOffice.remove())
            .then(dbOffice => res.json(dbOffice))
            .catch(err => res.status(422).json(err));
    }
};