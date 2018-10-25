const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
    password: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: ''
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

// DONT NEED BCRYPT SINCE WE ARE USING FB AUTH

// UserSchema.methods.generateHash = function(password){
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// }

// UserSchema.methods.validPassword = function(password){
//     return bcrypt.compareSync(password, this.password);
// }

const User = mongoose.model("User", UserSchema);

module.exports = User;