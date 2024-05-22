const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true,

    },

    followerId: {
        type: [],
        required: true,
        trim: true,
    },


    messageContent: {
        type: String,
        required: true,
        trim: true
    },

    message_dp: {
        type: String,
        required: false,
        trim: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema)