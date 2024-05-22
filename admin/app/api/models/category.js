const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: String,
        trim: true,
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model("Category", CategorySchema)