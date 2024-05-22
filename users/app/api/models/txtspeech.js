const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TxtspeechSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true,

    },

    title: {
        type: String,
        required: true,
        trim: true,

    },

    file: {
        type: String,
        require: true,
        trim: true,
    }


}, { timestamps: true })

module.exports = mongoose.model("Txtspeech", TxtspeechSchema)