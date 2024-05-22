const followersModel = require("../models/followers");


module.exports = {
    follow: async (req, res) => {
        let { userId, followerId, followerName } = req.body;
        if (!userId || !followerId || !followerName) {
            res.json({ status: "Success", statuscode: 404, message: `One or more feilds missen, please try again` })
        } else {
            await followersModel.create({ userId, followerId, followerName }, (err, result) => {
                console.log("follower body", result)
                if (!result) { res.json({ status: "Success", statuscode: 404, message: `Something went wrong,please try again` }) } else {
                    res.json({ status: "Success", statuscode: 404, message: `Successfully followed ${result.followerName}`, data: result })
                }

            })
        }


    },

    unFollow: async (req, res) => {
        await followersModel.findByIdAndRemove(req.params.followerId, (err, result) => {
            if (!result) { res.json({ status: "Success", statuscode: 404, message: `Something went wrong,please try again` }) }
            else res.json({ status: "Success", message: `Successfully unfollowed ${req.params.followerId}`, statuscode: 200, data: result })
        })
    },


    getAllFollowers: async (req, res, next) => {
        followersModel.find({}, (err, result) => {
            console.log(result)
            if (!result) { res.json({ status: "Success", statuscode: 404, message: `Something went wrong,please try again` }) }
            else
                res.json({ status: "Success", statuscode: 200, message: "All Followers found!", statuscode: 200, data: result })
        });

    }

}