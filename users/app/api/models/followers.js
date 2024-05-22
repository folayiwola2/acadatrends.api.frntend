const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followerSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true,

    },

    followerId: {
        type: String,
        required: true,
        trim: true,

    },

    followerName: {
        type: String,
        require: true,
        trim: true,
    }


}, { timestamps: true })

module.exports = mongoose.model("Followers", followerSchema)