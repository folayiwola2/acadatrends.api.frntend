const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ViewSchema = new Schema({
    userId: {
        type: String,
        trim: true,
        required: true,
    },

    updatesntrendsId: {
        type: String,
        trim: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Views', ViewSchema);
