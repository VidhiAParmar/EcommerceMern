const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const AdminModal = mongoose.model("admins",AdminSchema)

module.exports = AdminModal