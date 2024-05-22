const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

//Define a schema

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true
    },
    othernames: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: Number,
      trim: true,
      required: true
    },
    school: {
      type: String,
      trim: true,
      required: false
    },
    state: {
      type: String,
      trim: true,
      required: false
    },
    google_token: {
      type: String,
      trim: true
    },
    name: {
      type: String,
      trim: true,
    },
    user_dp: {
      type: String,
      required: false
    },
    dob: {
      type: Date,
      required: false
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      default: "none",
      trim: true
    },
    isVerify: {
      type: Boolean,
      default: false
    },
    isSubscribed: {
      type: Boolean,
      default: false
    },
    sub_date: {
      type: Date,
      default: Date.now()
    },

    sub_interval_type: {
      type: String,
      default: false
    },
    last_sub_date: {
      type: Date,
      default: Date.now()
    },
    followers: {
      type: Array,
      default: [],
    },
    pdfs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// hash admin password before saving into database
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("User", UserSchema);
