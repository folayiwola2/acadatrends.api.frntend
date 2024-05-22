const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TxtDocxspeechSchema = new Schema({
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

    docxText: {
        type: String,
        require: true,
        trim: true,
    }


}, { timestamps: true })

module.exports = mongoose.model("TxtDocxspeech", TxtDocxspeechSchema)