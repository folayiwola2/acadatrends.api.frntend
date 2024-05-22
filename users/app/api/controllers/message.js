const messsageModel = require("../models/message");
const userModel = require('../models/user')

module.exports = {

    createMessage: async (req, res) => {
        let { userId, followerId, messageContent } = req.body;
        await messsageModel.create({ userId, followerId, messageContent }, (err, result) => {
            console.log("follower body", result)
            if (err) throw err
            res.json({ status: "Success", user: userId, message: `Message Successfully sent...`, statuscode: 200, data: result })
        })
    },

    getMessage: async (req, res) => {
        messsageModel.find({}, (err, result) => {
            console.log(result)
            if (err) throw err
            else
                res.json({ status: "Success", message: "All Messages found!", statuscode: 200, data: result })
        });
    },

    getMessageById: async (req, res) => {
        let all_message = await messsageModel.find({});
        // console.log(all_message)
        await userModel.findById(req.params.userId, (err, result) => {
            // console.log(result._id)
            let all_data = all_message.filter(o => o.userId === result._id)
            // console.log("My data", data)
            res.json({ status: "Success", message: "All Messages found!", statuscode: 200, data: all_data })
        })

    },

    deleteMessage: async (req, res) => {
        await messsageModel.findByIdAndRemove(req.params.messageId, (err, result) => {
            if (err) throw err;
            else res.json({ status: "Success", message: `Message Successfully deleted`, statuscode: 200, data: result })
        })
    }
}