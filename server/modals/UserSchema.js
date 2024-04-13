const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,

    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const UserModal = mongoose.model("users",UserSchema)

module.exports = UserModal