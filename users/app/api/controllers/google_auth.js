const googleModel = require('../models/user');
module.exports = {
    create: async (req, res) => {
        const { google_token, email, name } = req.body;
        googleModel.findOne({ email }, (err, userInfo) => {
            if (err) res.json({ error: err });
            if (userInfo) {
                return res.json({ status: "error", message: `Email ${email} already exist! Please check and try again` })
            } else {
                googleModel.create({
                    google_token,
                    email,
                    name,
                    phone: 000000,
                    dob: Date.now(),
                    school: 'default',
                    state: 'default',
                    address: 'default',
                    password: 'default'

                }, (err, result) => {
                    res.json({ status: "Success", statuscode: 200, message: "User Successfully Created!", data: { user: result } });
                });
            }
        })
    },

    getUserByEmail: (req, res) => {
        try {
            googleModel.findOne({ email: req.body.email }, (err, result) => {
                if (!result) { return res.json({ status: "error", statuscode: 404, message: `User ${req.body.email} was does not exist`, data: result }) }
                res.json({ status: "Success", statuscode: 200, message: `User ${result.email} found`, data: result });
            })
        } catch (error) {
            res.json({ error })
        }
    }



}