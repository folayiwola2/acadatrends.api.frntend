const commentModel = require('../models/comments')
const replyCommentModel = require("../models/reply_comment");
module.exports = {

    create: async (req, res, next) => {
        let { comment, userId, posted_by, newsId } = req.body;

        if (!comment || !userId || !posted_by || !newsId) {
            res.json({ status: "error", statuscode: 404, message: "One or more feilds missen. Please check and try again!" })
        }
        else {
            await commentModel.create({
                comment, userId, posted_by, newsId
            }, (err, result) => {
                console.log("likes body", result)

                if (err) throw err
                res.json({ status: "Success", statuscode: 200, message: "Comment Successfully created", data: result })
            })
        }

    },

    getById: (req, res, next) => {
        console.log(req.body);
        commentModel.findById(req.params.commentId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "comment found", statuscode: 200, data: catInfo })
        })
    },
    getAll: async (req, res, next) => {
        try {
            let all_comments = await commentModel.find({});

            for (let comments of all_comments) {

                let reply_comments = await replyCommentModel.find({ commentId: comments._id });
                comments.replied_comment = reply_comments;

            }
            res.json({ status: "Success", statuscode: 200, message: "Comments list found!!!", data: all_comments })
        } catch (e) {
            console.log(e)
        }




    },
    updateById: (req, res, next) => {
        commentModel.findOneAndUpdate(req.params.commentId, { comment: req.body.comment }, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "comment successfully updated", statuscode: 200, data: catInfo })
        })
    },
    deleteById: (req, res, next) => {
        commentModel.findByIdAndRemove(req.params.commentId, (err, catInfo) => {
            if (err) throw err
            else res.json({ status: "Success", message: "comment successfully deleted", statuscode: 200, data: catInfo })
        })
    }
}