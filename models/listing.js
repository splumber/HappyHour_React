const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    venue: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true,
        hour: {
            type: Number,
            required: true
        },
        day: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        }
    },
    capacity: {
        type: Number,
        required: true
    },
    spaceType: {
        type: String,
        required: true,
        Coworking_space: {
            type: String
        },
        Corportate_office:{
            type: String
        },
        Business_center: {
            type: String
        },
        Hotel: {
            type: String
        },
        Startup_office: {
            type: String
        },
        Studio: {
            type: String
        },
        Private_office: {
            type: String
        }
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Country: {
        required: true
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing