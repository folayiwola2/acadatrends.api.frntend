const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({

    userId: {
        type: String,
        required: true
    },
    txn_ref: {
        type: String,
        default: false
    },

    sub_interval_type: {
        type: String,
        default: false
    },
    last_sub_date: {
        type: Date,
        default: Date.now()
    },
    paymentDetails: {
        type: Object
    },
    amount: {
        type: Number,
        required: true
    },


}, { timestamps: true })

module.exports = mongoose.model("Subscription", SubscriptionSchema)