const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("./config/database");

var jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const path = require("path");

const admin = require("./admin/routes/is_admin");
const user = require("./users/routes/user");

// =========================
// PRIVATE ROUTES WITH AUTH
// ========================

// ===== ADMIN =====
const news = require("./admin/routes/news");
const category = require("./admin/routes/category");

// ===== USER =====
const comments = require("./users/routes/comments");
const replyComments = require("./users/routes/reply_comments");
const likes = require("./users/routes/likes");
const views = require("./users/routes/views");
const followers = require("./users/routes/followers");
const message = require("./users/routes/message");
const txtspeech = require("./users/routes/txtspeech");
const txtDocxSpeech = require("./users/routes/txtDocx");
const subscription = require("./users/routes/subscription")

//    ======  EMAIL =====

app.use(cors());

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "client/build")));

app.set("secretKey", "acadatrends123"); // JWT secret key

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

//Public route
app.use("/api/admin", admin);
app.use("/api/user", user);
app.use("/api/updates & trends", updates & trends);
app.use("/api/dp", admin);
app.use("/api/category", category);
app.use("/api/comments", comments);
app.use("/api/reply-comments", replyComments);
app.use("/api/likes", likes);
app.use("/api/views", views);
app.use("/api/followers", followers);
app.use("/api/message", message);
app.use("/api/pdf", txtspeech);
app.use("/api/docx", txtDocxSpeech);
app.use("/api/subscription", subscription)


app.get("/api/uploads/:imgName", (req, res) => {
  console.log("My image path is", req.path);
  res.sendFile(path.join(__dirname + req.path));
});

app.get("/api/uploads/user/:imgName", (req, res) => {
  console.log("My image path is", req.path);
  res.sendFile(path.join(__dirname + req.path));
});

app.get("/api/uploads/updates & trends/:imgName", (req, res) => {
  console.log("My image path is", req.path);
  res.sendFile(path.join(__dirname + req.path));
});

//  ========   PRIVATE ROUTES  ==========

app.use("/api/admin/updates & trends", validateUser, updates & trends);
app.use("/api/admin/category", validateUser, category);
app.use("api/users/comments", validateUser, comments);
app.use("/api/users/reply-comments", validateUser, replyComments);
app.use("api/users/likes", validateUser, likes);
app.use("api/users/views", validateUser, views);
app.use("api/users/followers", validateUser, followers);

app.get("/favicon.ico", (req, res) => {
  res.sendStatus(204);
});

function validateUser(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    (err, decoded) => {
      if (err) {
        res.json({ status: "Error", message: err.message, data: null });
      } else {
        //add user id to request
        req.body.userId = decoded.id;
        next();
      }
    }
  );
}

//for production use only
//get all request that are not /api and returns index file
//client app will take care of other routes i.e loaclhost:4000/somepage
//somepage will be taken care of by the server


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
//express doesn't really consider  not found 404 as an error so we need to handle 404 explicitly

//handle 404 error
app.use((req, res, next) => {
  let err = new Error("Not found!");
  err.status = 404;
  next(err);
});

//handle errors
app.use((err, req, res, next) => {
  console.log(err);
  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something went wrong" });
});

let port = process.env.PORT || 4000;
app.listen(port, () => {
  // console.log(port)
  console.log(`We are live on port ${port}`);
});
