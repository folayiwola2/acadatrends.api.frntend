const subscriptiontModel = require('../models/subscription')
const userModel = require("../../../app/api/models/user")
const paystack = require('paystack')('sk_test_bc6cf629da7646bb9655154feff2fdfbcee0c82e');

const setStatus = async (result, res) => {
    try {
        await userModel.findByIdAndUpdate(result.userId, { isSubscribed: true }, { useFindAndModify: false }, (err, updateResponse) => {
            // console.log("update response", updateResponse)
            if (err) return res.json({ status: "error", message: err, data: null })
            if (updateResponse) {
                res.json({ status: "success", message: "Payment successfully confirmed", data: updateResponse })
            } else {
                res.json({ status: "error", message: "Payment was not confirmed", data: null })
            }
        })
    } catch (error) {
        console.log("catch err", error)
    }

}

module.exports = {

    confirmPayment: async (req, res) => {
        try {
            let { txn_ref, userId, sub_interval_type } = req.body;
            // console.log(txn_ref, userId, sub_interval_type)
            let _user = await userModel.findById(userId)
            // return console.log("user", _user)
            if (_user) {
                let last_sub_date = Date.now();

                await paystack.transaction.verify(txn_ref, async (error, response) => {

                    let { amount, paid_at, status } = response.data;
                    let paymentDetails = { amount, paid_at, status }
                    if (status === "success") {
                        console.log(txn_ref, userId, sub_interval_type, last_sub_date, amount, paid_at)
                        await subscriptiontModel.create({ txn_ref, userId, sub_interval_type, last_sub_date, amount, paid_at }, async (err, result) => {
                            console.log("create", result)
                            if (result) {
                                console.log("create result", result)
                                setStatus(result, res)
                            }
                        })
                    }
                });
            } else {
                res.json({ status: "error", message: "User does not exist", data: null })
            }
        } catch (error) {
            console.log(error)
            res.json({ status: "error", message: "from catch", data: error })
        }
    },


    getById: async (req, res, next) => {
        await subscriptiontModel.findById(req.params.subscriptiontId, (err, data) => {
            if (err) throw err
            if (data) {
                res.json({ status: "Success", statuscode: 200, message: "subscriptionts  found!!!", data })
            } else {
                res.json({ status: "success", statuscode: 200, message: "No data found!!!", data: null })
            }
        })
    },
    getAll: async (req, res, next) => {
        try {
            await subscriptiontModel.find({}, (err, data) => {
                if (err) throw err;
                if (data) {
                    res.json({ status: "Success", statuscode: 200, message: "subscriptionts list found!!!", data })
                } else {
                    res.json({ status: "success", statuscode: 200, message: "No data found!!!", data: null })
                }
            });


        } catch (e) {
            console.log(e)
        }
    }
}