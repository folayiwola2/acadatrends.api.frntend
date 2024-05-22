const adminModel = require('../models/is_admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
const welcomeMail = require("../../../../adminWelcome")
const sendAdminForgotMail = require("../../../../sendAdminForgotMail")
cloudinary.config({
    cloud_name: 'chukwuma',
    api_key: '182225648222874',
    api_secret: 'vY9VPdqh8g_mxwO6MkjXftuhnF0'
});
require("dotenv").config();

const saveImage = (imageFile, user_id, key) => {
    // console.log("this is my image", imageFile)
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imageFile, function (err, result) {
            // console.log("from here", result, err);
            if (err) return err;
            adminModel.findByIdAndUpdate(user_id, { [key]: result.secure_url }, (err, result) => {
                // console.log("Result()=>", result)
                if (err) return reject(err);
                resolve({ status: "Success", message: `Admin successfully got ${result.secure_url}`, data: result })
            })
        });

    })
}

module.exports = {
    create: async (req, res, next) => {
        let { firstname, othernames, email, phone, password } = req.body;
        let data = await adminModel.find({})
        let isEmail = data.some(o => o.email === email);
        // console.log(firstname, othernames, email, phone, password)
        if (firstname === undefined || othernames === undefined || email === undefined || phone === undefined || password === undefined) {
            return res.json({ status: "error", message: "Missen Feild, please check and try again." });
        } else if (isEmail) {
            return res.json({ status: "error", message: `This email ${email} already exist, please check and try again.` });
        } else {
            email = email.toLowerCase();
            adminModel.create({ firstname, othernames, email, phone, password }, async (err, result) => {
                if (err) return next(err);
                let { image } = req.body;

                if (image) {
                    try {
                        await saveImage(image, result._id, 'admin_dp');
                    } catch (error) {
                        console.log(error);
                    }
                }

                //when reg is successful then authenticate user

                adminModel.findOne({ email: req.body.email }, async (err, adminInfo) => {

                    if (err) {
                        next(err)
                    } else {
                        if (bcrypt.compareSync(req.body.password, adminInfo.password)) {
                            const token = jwt.sign({ id: adminInfo.id }, req.app.get('secretKey'), { expiresIn: '7d' });

                            res.json({ status: "Success", statuscode: 200, message: "Admin Successfully Created!", data: { admin: adminInfo, token: token } });
                            console.log("AdminInfo()=>", adminInfo)

                            // const verifyToken = jwt.sign({ id: adminInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                            // let html = htmlTemmplate.verification(adminInfo.firstname, `http://localhost:3000/reset-password/${verifyToken}`);
                            // mailer.send(adminInfo.email, "Just a test now", html);

                            let tokenURL = `http://www.acadatrends.com/api/user/verify/${token}`
                            let name = adminInfo.firstname
                            try {
                                await welcomeMail(adminInfo.email, name)
                            } catch (error) {
                                console.log("error", error)
                                throw new Error(error.message)
                            }

                        } else {
                            res.json({ status: "error", message: "Invalid email/password", data: adminInfo });
                        }

                    }
                })
            });
        }

    },
    authenticate: (req, res, next) => {
        adminModel.findOne({ email: req.body.email }, (err, adminInfo) => {
            console.log("err ()=>", req.body);
            console.log("adminInfo ()=>", adminInfo)
            if (adminInfo === null) {
                return res.json({ status: "error", statuscode: 400, message: "Invalid email/password", data: adminInfo });
            }

            if (err) {
                next(err)
            } else {
                if (bcrypt.compareSync(req.body.password, adminInfo.password)) {
                    const token = jwt.sign({ id: adminInfo.id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    return res.json({ status: "Success", statuscode: 200, message: "Admin found and Login Successful!", data: { admin: adminInfo, token: token } })
                } else {
                    return res.json({ status: "error", statuscode: 200, message: "The password for this email is Incorrect, please try again!", data: adminInfo });
                }
            }
        })
    },
    updateById: (req, res, next) => {
        console.log(req.body);
        adminModel.findByIdAndUpdate(req.params.adminId, {
            name: req.body.name,
            email: req.body.email, phone: req.body.phone, admin_dp: admins.admin_dp
        }, (err, result) => {
            if (err) throw err
            else res.json({ status: "Success", statuscode: 200, message: "Admin record updated successfully", data: result })
        })
    },
    deleteById: (req, res, next) => {
        console.log(req.body);
        adminModel.findByIdAndDelete(req.params.adminId, (err, result) => {
            if (err) throw err
            else res.json({ status: "Success", statuscode: 200, message: "Admin has been successfully deleted", data: result })
        })
    },
    getById: async (req, res, next) => {
        await adminModel.findById(req.params.adminId, (err, result) => {
            console.log("One admin ()=>", result)
            if (err) throw err
            else res.json({ status: "Success", statuscode: 200, message: "Admin successfully found!", data: result });
        })
    },
    getAll: (req, res, next) => {
        // console.log(req.body);
        const adminList = [];
        adminModel.find({}, (err, result) => {
            // console.log(result)
            if (err) throw err
            else
                for (let admins of result) {
                    adminList.push({
                        id: admins._id,
                        firstname: admins.firstname, othernames: admins.othernames,
                        email: admins.email, phone: admins.phone, admin_dp: admins.admin_dp, date_created: admins.date_created
                    })
                }
            res.json({ status: "Success", statuscode: 200, message: "All Admins found", data: result.reverse() })
        })
    },
    forgotPassword: async (req, res, next) => {
        await adminModel.findOne({ email: req.body.email }, async (err, user) => {
            console.log("The user is", user)
            if (user === null) {
                res.json({ status: "error", statuscode: 404, message: `User does not exist! Please retry`, data: null })
            }

            if (user) {
                const token = jwt.sign({ id: user.id }, req.app.get('secretKey'), { expiresIn: '1h' });
                let tokenURL = `http://www.acadatrends.com/reset-password/${token}`
                let name = user.firstname
                try {
                    await sendAdminForgotMail(user.email, name, tokenURL)
                    return res.json({ status: "Success", statuscode: 200, message: `A mail has been sent to ${user.email} for password reset` })
                } catch (error) {
                    console.log("error", error)
                    throw new Error(error.message)
                }

            }



        })
    },
    resetPassword: async (req, res, next) => {
        let { token, newPassword } = req.body;
        jwt.verify(token, req.app.get('secretKey'), async function (err, decoded) {
            if (err) return res.json({ status: "error", message: err });
            await adminModel.findById(decoded.id, async (err, user) => {
                let { firstname, othernames, email, phone, _id } = user
                await bcrypt.hash(newPassword, 10, async function (err, hash) {
                    if (err) return res.json({ status: "error", message: err });
                    else {
                        console.log(hash, firstname, othernames, email, phone, _id)
                        await adminModel.findByIdAndUpdate(_id, {
                            firstname, othernames, email, phone, password: hash
                        }, (err, result) => {
                            if (err) return res.json({ status: "error", message: err });
                            else return res.json({ status: "Success", statuscode: 200, message: "Admin record updated successfully", data: result })
                        })
                    }
                });
            })
        });
    },
    createImage: async (req, res, next) => {
        try {
            let imageFile = req.body.image;
            let user_id = req.body.adminid
            // imageFile = imageFile.replace(/^data:image\/[a-z]+;base64,/, "");
            //  console.log("ImageFile()=>", imageFile); 
            // let name = `${Math.random().toString(36).slice(-5)}.png`
            let response = await saveImage(imageFile, adminid, 'admin_dp');
            res.json(response);
        } catch (error) {
            console.log(error)
        }

    }
}

