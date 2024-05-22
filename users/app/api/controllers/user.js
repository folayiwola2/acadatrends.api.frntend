const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const followersModel = require('../models/followers')
const txtspeechModel = require("../models/txtspeech")
const sendMail = require('../../../../sendForgetMail')
const verifyMail = require('../../../../sendVerifyMail')

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'chukwuma',
  api_key: '182225648222874',
  api_secret: 'vY9VPdqh8g_mxwO6MkjXftuhnF0'
});



const saveImage = (imageFile, user_id, key) => {
  console.log("this is my image", imageFile)
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageFile, function (err, result) {
      console.log("from here", result, err);
      if (err) return err;
      userModel.findByIdAndUpdate(user_id, { [key]: result.secure_url }, (err, result) => {
        console.log("Result()=>", result)
        if (err) return reject(err);
        resolve({ status: "Success", message: `User successfully got ${result.secure_url}`, data: result })
      })
    });

  })
}


module.exports = {


  create: async (req, res, next) => {
    let { firstname, othernames, email, phone, dob, school, state, address, password } = req.body;
    console.log(firstname, othernames, email, phone, dob, school, state, address, password)
    if (!firstname || !othernames || !email || !phone || !school || !password) {
      res.json({ status: "error", statuscode: 404, message: "One or more feilds missen. Please check and try again!" })
    }
    let all_data = await userModel.findOne({ email });

    if (all_data) {
      return res.json({ message: "Email already exist" })
    }
    await userModel.create({ firstname, othernames, email, phone, dob, school, state, address, password }, async (err, result) => {
      console.log(err, result)
      let { image } = req.body;
      if (image) {
        try {
          await saveImage(image, result._id, "user_dp");
        } catch (error) {
          // console.log(error);
        }
      }
      userModel.findOne({ email: req.body.email }, async (err, userInfo) => {
        if (!userInfo) {
          return res.json({ status: "error", statuscode: 404, message: "Error in getting data. Please check and try again!" })
        }
        if (err) {
          next(err);
        } else {
          if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            console.log("Yesh", userInfo)
            const token = jwt.sign(
              { id: userInfo._id },
              "secretKey",
              { expiresIn: "1d" }
            );
            let tokenURL = `http://www.acadatrends.com/api/user/verify/${token}`
            let name = userInfo.firstname
            try {
              const sent = await verifyMail(userInfo.email, name, tokenURL)
            } catch (error) {
              console.log("error", error)
              throw new Error(error.message)
            }

            res.json({
              status: "Success",
              statuscode: 200,
              message: "User Successfully Created!",
              data: { user: userInfo, token: token }
            });




          } else {
            res.json({
              status: "error",
              message: "Invalid Registration action! Please re-check and try again.",
              data: userInfo
            });
          }
        }
      });
    }
    );
  },

  resendVerificationMail: async (req, res) => {
    let { email } = req.body;
    userModel.findOne({ email }, async (err, userInfo) => {
      console.log("response", userInfo)
      if (!userInfo) {
        return res.json({ status: "error", statuscode: 200, message: "This email doesn't exist" })
      }
      if (err) {
        return res.json({ status: "error", message: err })
      } else {
        const token = jwt.sign({ id: userInfo._id }, "secretKey", { expiresIn: "1d" });
        let tokenURL = `http://www.acadatrends.com/api/user/verify/${token}`
        let name = userInfo.firstname
        try {
          await verifyMail(userInfo.email, name, tokenURL)
          res.json({
            status: "Success",
            statuscode: 200,
            message: "Notification sent successfully",
            data: { user: userInfo, token }
          });
        } catch (error) {
          throw new Error(error.message)
        }


      }
    });
  },

  googleCreate: async (req, res) => {
    const { google_token, email, name } = req.body;
    if (!email || !google_token || !name) {
      res.json({ status: "error", statuscode: 404, message: "One or more feilds missen. Please check and try again!" })
    }
    let all_data = await userModel.findOne({ email });
    if (all_data) { return res.json({ status: "error", message: "Email already exist" }) }

    await userModel.create({
      google_token,
      email,
      name,
      phone: 000000,
      firstname: 'default',
      othernames: 'default',
      dob: Date.now(),
      school: 'default',
      state: 'default',
      address: 'default',
      password: 'default'

    }, (err, result) => {
      res.json({ status: "Success", statuscode: 200, message: "User Successfully Created!", data: { user: result } });
    });

  },

  googleAuthenticate: (req, res) => {
    let { email, google_token } = req.body;
    try {
      userModel.findOne({ email }, (err, result) => {
        if (err) { return res.json({ err }) }
        if (!result) { return res.json({ status: "error", statuscode: 404, message: `User ${req.body.email} does not exist`, data: result }) }
        res.json({ status: "Success", statuscode: 200, message: `User ${result.email} found`, data: result });
      })
    } catch (error) {
      res.json({ error })
    }
  },

  getToken: async (req, res) => {
    let token = req.params.token;
    try {
      let decoded = await jwt.verify(token, 'secretKey');
      // console.log("Id", decoded)
      let data = await userModel.findOne({ _id: decoded.id });
      console.log("Data", data)
      await userModel.findByIdAndUpdate(data._id, { isVerify: true }, (err, result) => {
        console.log(result)
        if (err) { return res.json({ err }) }
        res.writeHead(200, { 'Content-Type': `text/html` })
        let myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8')
        myReadStream.pipe(res);
      })

    } catch (err) {

    }
  },

  authenticate: async (req, res, next) => {
    await userModel.findOne({ email: req.body.email }, (err, userInfo) => {
      if (userInfo === null) {
        return res.json({
          status: "error",
          statuscode: 404,
          message: "Invalid email/password",
          data: userInfo
        });
      }

      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo.id },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          return res.json({
            status: "Success",
            statuscode: 200,
            message: "User found and Login Successful!",
            data: { user: userInfo, token: token }
          });
        } else {
          return res.json({
            status: "error",
            statuscode: 304,
            message:
              "The password for this email is Incorrect, please try again!",
            data: userInfo
          });
        }
      }
    });
  },


  getAll: async (req, res, next) => {
    let all_users = await userModel.find({});

    for (let user of all_users) {
      let follower = await followersModel.find({ userId: user._id });
      user.followers = follower;

      let pdfs = await txtspeechModel.find({ userId: user._id })
      user.pdfs = pdfs;
    }

    if (!all_users) {
      res.json({
        status: "info",
        statuscode: 200,
        message: "No user found",
        data: null
      });
    }
    console.log("all", all_users)
    return res.json({
      status: "Success",
      statuscode: 200,
      message: "All Users Found!",
      data: all_users.reverse()
    });

  },

  getById: async (req, res, next) => {
    console.log(req.body);
    let all_followers = await followersModel.find({});
    let all_pdf = await txtspeechModel.find({});
    let data = all_followers.filter(o => req.params.userId === o.userId);
    let pdf_data = all_pdf.filter(o => req.params.userId === o.userId);
    await userModel.findById(req.params.userId, (err, result) => {
      if (result === null) {
        return res.json({
          status: "error",
          statuscode: 404,
          message: "User not Found!",
          data: result
        });
      }

      if (err) throw err;

      else
        result.followers = data;
      result.pdfs = pdf_data;
      res.json({
        status: "Success",
        statuscode: 200,
        message: "User Successfully Found!",
        data: result
      });
    });
  },

  updateById: async (req, res, next) => {
    let reqst = req.body;
    console.log("req", reqst);
    await userModel.findByIdAndUpdate(
      req.params.userId,
      {
        firstname: reqst.firstname,
        othernames: reqst.othernames,
        email: reqst.email,
        phone: reqst.phone,
        school: reqst.school,
        address: reqst.address,
        dob: reqst.dob,
        image: reqst.image
      },
      (err, result) => {
        console.log("Updated result", result);
        if (err) return err;
        else
          res.json({
            status: "Success",
            statuscode: 200,
            message: "User profile successfully Updated!",
            data: result
          });
      }
    ); //pictures are not updatiing
  },

  deleteById: async (req, res, next) => {
    await userModel.findByIdAndDelete(req.params.userId, (err, result) => {
      if (err) throw err;
      else
        res.json({
          status: "Success",
          statuscode: 200,
          message: "User has been successfully deleted!",
          data: null
        });
    });
  },


  forgotPassword: async (req, res, next) => {
    let { email } = req.body;
    if (!email) {
      return res.json({ status: "error", statuscode: 404, message: `Email can not be empty` })
    }
    userModel.findOne({ email }, async (err, user) => {
      if (user === null) {
        res.json({ status: "error", statuscode: 404, message: `User does not exist` })
      }
      if (user) {
        const token = jwt.sign({ id: user.id }, req.app.get('secretKey'), { expiresIn: '1h' });
        let tokenURL = `http://www.acadatrends.com/user/reset-password/${token}`
        let name = user.firstname
        try {
          await sendMail(user.email, name, tokenURL)
          return res.json({ status: "Success", statuscode: 200, message: `A mail has been sent to ${email} for password reset` })
        } catch (error) {
          console.log("error", error)
          throw new Error(error.message)
        }

      }
    })
  },

  resetPassword: (req, res, next) => {
    let { token, password } = req.body;
    console.log("token", token, password)
    jwt.verify(token, req.app.get('secretKey'), function (err, decoded) {
      console.log("decoded", decoded, err);
      if (err) return res.json({ status: "error", message: err });
      userModel.findById(decoded.id, (err, user) => {
        let { firstname, othernames, email, phone, _id } = user
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) return res.json({ status: "error", message: err });
          else {
            console.log(hash, firstname, othernames, email, phone, _id)
            userModel.findByIdAndUpdate(_id, {
              firstname, othernames, email, phone, password: hash
            }, (err, result) => {
              console.log(result)
              if (err) return res.json({ status: "error", message: err });
              else return res.json({ status: "Success", statuscode: 200, message: "User record updated successfully", data: result })
            })
          }
        });
      })
    });
  },

  deleteAll: async (req, res, next) => {
    await userModel.remove({}, (res, err) => {
      console.log(res)
      if (err) throw err;
      else res.json({
        status: "Success",
        statuscode: 200,
        message: "User has been successfully deleted!",
        data: null
      });
    })
  },

  createImage: async (req, res, next) => {
    try {
      let imageFile = req.body.image;
      let user_id = req.body.userid;
      let response = await saveImage(imageFile, userid, "user_dp");
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  },



};


