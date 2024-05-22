const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UpdatesntrendsSchema = new Schema({

    title: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    likes: {
        type: Array,
        default: [],
    },
    views: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: []
    },
    updatesntrends_dp: {
        type: String,
        required: false,
        trim: true
    },


}, { timestamps: true })

module.exports = mongoose.model('Updatesntrends', UpdatesntrendsSchema);
