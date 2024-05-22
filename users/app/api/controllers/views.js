const ViewsModel = require('../models/views')
module.exports = {
    view: async (req, res, next) => {
        let reqs = req.body;
        await ViewsModel.create({ userId: reqs.userId, updatesntrendsId: reqs.updatesntrendsId }, (err, views) => {
            console.log("views body", views)
            if (err) throw err
            res.json({ status: "Success", message: "views Successfully created", statuscode: 200, data: views })
        })
    },

    getAll: (req, res, next) => {
        ViewsModel.find({}, (err, viewsInfo) => {
            if (err) throw err
            else
                res.json({ status: "Success", message: "All viewss found!", statuscode: 200, data: viewsInfo })
        })
    },


}
