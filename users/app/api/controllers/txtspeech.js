const txtspeechModel = require("../models/txtspeech");
const fs = require("fs");
const pdf = require('pdf-parse');
const User = require('../models/user')

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

module.exports = {

    create: async (req, res) => {
        try {
            let filePath = req.file.path,
                title = req.file ? req.file.originalname.replace('pdf', '') : ''
            const read = fs.readFileSync(filePath)
            let { userId, file } = req.body;
            pdf(read).then((data) => {
                console.log("Success data", data)
                file = data.text;
                txtspeechModel.create({ userId, file, title }, (err, result) => {
                    if (err) {
                        res.json({ error: err });
                    }
                    if (!result) { res.json({ status: "error", statuscode: 404, message: `Something went wrong, please try again` }) } else {
                        res.json({ status: "Success", statuscode: 200, message: `Successfully save your text file`, data: result });
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error(err)
                                return
                            }

                            console.log("File removed")
                        })
                    }
                })

            }).catch(err => {
                console.log("The error", err)
            })
        } catch (error) {
            console.log("The error", error)
        }

    },


    getAllPdf: async (req, res, next) => {
        txtspeechModel.find({}, (err, result) => {
            console.log(result)
            if (!result) { res.json({ status: "error", statuscode: 501, message: `Something went wrong,please try again` }) }
            else
                res.json({ status: "Success", statuscode: 200, message: "All PDFs found!", statuscode: 200, data: result })
        });

    },

    getPdfById: (req, res, next) => {
        console.log(req.body);
        txtspeechModel.findById(req.params.pdfId, (err, result) => {
            console.log("result", result)
            if (err) return res.json({ err })
            else res.json({ status: "Success", message: "Pdf found", statuscode: 200, data: result })
        })
    },

    getPdfByUserId: async (req, res, next) => {
        try {
            let user = await User.findById(req.params.userId)
            let pdf = await txtspeechModel.find({});
            let userPdf = pdf.filter(o => user._id == o.userId)
            if (userPdf.length < 1) {
                return res.json({ status: "success", statuscode: 204, message: 'This user does not have a PDF' })
            } else {
                return res.json({ status: "Success", message: "PDF found", statuscode: 200, data: userPdf })
            }
        } catch (error) {
            return res.json({ status: "error", message: error, statuscode: 400 })

        }
    },


    deletePdf: async (req, res) => {
        await txtspeechModel.findByIdAndRemove(req.params.pdfId, (err, result) => {
            if (err) { return res.json({ err }) }
            else res.json({ status: "Success", message: `Successfully deleted pdf`, statuscode: 200, data: null })
        })
    },

}