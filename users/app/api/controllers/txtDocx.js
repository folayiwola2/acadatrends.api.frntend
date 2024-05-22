const txtDocxModel = require("../models/txtDocx");
const fs = require("fs");
const docx = require('pdf-parse');
const path = require("path")
const User = require('../models/user')

const docxParser = require('docx-parser');

module.exports = {

    create: async (req, res) => {
        try {
            // return console.log("path", req.file)
            if (!req.file) {
                return res.json({ status: "error", statuscode: 404, message: `File not found` });

            }
            let { path, title, size } = req.file
            title = req.file ? req.file.originalname.replace('.docx', '') : ''
            let { userId } = req.body;
            docxParser.parseDocx(path, function (data) {
                txtDocxModel.create({ userId, docxText: data, title }, (err, result) => {
                    if (err) {
                        res.json({ error: err });
                    }
                    if (!result) { res.json({ status: "error", statuscode: 404, message: `Something went wrong, please try again` }) } else {
                        res.json({ status: "Success", statuscode: 200, message: `Successfully save your text file`, data: result });
                        fs.unlink(path, (err) => {
                            if (err) {
                                console.error(err)
                                return
                            }
                            console.log("File removed")
                        })
                    }
                })
            })

        } catch (error) {
            console.log("req.error", error)
        }
    },

    getAllDocx: async (req, res, next) => {
        await txtDocxModel.find({}, (err, result) => {
            if (result.length < 1) {
                return res.json({ status: "success", statuscode: 204, message: 'Docx is empty' })
            }
            if (err) return res.json({ error: err })
            if (!result) { res.json({ status: "error", statuscode: 501, message: `Something went wrong,please try again` }) }
            else
                res.json({ status: "Success", statuscode: 200, message: "All Docxs found!", statuscode: 200, data: result })
        });

    },

    getDocxById: (req, res, next) => {
        txtDocxModel.findById(req.params.docxId, (err, result) => {
            if (result === null) {
                return res.json({ status: "success", statuscode: 204, message: 'Docx is empty' })
            }
            if (err) return res.json({ status: "error", message: err })
            else res.json({ status: "Success", message: "Docx found", statuscode: 200, data: result })
        })
    },

    getDocxByUserId: async (req, res, next) => {
        try {
            let user = await User.findById(req.params.userId)
            let docx = await txtDocxModel.find({});
            let userDocx = docx.filter(o => user._id == o.userId)
            if (userDocx.length < 1) {
                res.json({ status: "success", statuscode: 204, message: 'This user does not have a docx' })
            } else {
                return res.json({ status: "Success", message: "Docx found", statuscode: 200, data: userDocx })
            }
        } catch (error) {
            return res.json({ status: "error", message: error, statuscode: 400 })

        }
    },

    deleteDocx: async (req, res) => {
        let isExist = await txtDocxModel.findById(req.params.docxId)
        if (isExist === null) {
            return res.json({ status: "success", statuscode: 204, message: 'Docx is empty' })
        }
        await txtDocxModel.findByIdAndDelete(req.params.docxId, (err, result) => {
            if (err) return res.json({ status: "error", message: err })
            else res.json({ status: "Success", message: `Successfully deleted docx`, statuscode: 200, data: null })
        })
    },



}