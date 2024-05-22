const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoogleAuthSchema = new Schema({
    google_token: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model("User", GoogleAuthSchema)