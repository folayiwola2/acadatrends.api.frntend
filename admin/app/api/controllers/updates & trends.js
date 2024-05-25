const updates & trendsModel = require("../models/updatesntrends");
const commentModel = require("../../../../users/app/api/models/comments");
const likesModel = require("../../../../users/app/api/models/likes");
const viewsModel = require("../../../../users/app/api/models/views");

const search = require('libnpmsearch')

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'chukwuma',
  api_key: '182225648222874',
  api_secret: 'vY9VPdqh8g_mxwO6MkjXftuhnF0'
});

// const saveImage = (name, imageFile, user_id, key) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile("./uploads/updatesntrends/" + name, imageFile, "base64", err => {
//       console.log("name", name);
//       if (err) return reject(err);
//       updates & trendsModel.findByIdAndUpdate(user_id, { [key]: name }, (err, result) => {
//         console.log("Results()=>", result);
//         if (err) return reject(err);
//         resolve({
//           status: "Success",
//           message: `updates & trends  successfully got ${name}`,
//           data: result
//         });
//       });
//     });
//   });
// };

const saveImage = (imageFile, updates & trends_id, key) => {
  console.log("this is my image", imageFile)
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageFile, function (err, result) {
      console.log("from here", result, err);
      if (err) return err;
      newsModel.findByIdAndUpdate(updates & trends_id, { [key]: result.secure_url }, (err, result) => {
        // console.log("Result()=>", result)
        if (err) return reject(err);
        resolve({ status: "Success", message: `Updates & trends successfully got ${result.secure_url}`, data: result })
      })
    });

  })
}

module.exports = {
  create: (req, res, next) => {
    const obj = req.body;
    updates & trendsModel.create(
      {
        title: obj.title,
        category: obj.category,
        content: obj.content,
        author: obj.author
      },
      async (err, result) => {
        console.log("My updates & trends", result)
        if (err) throw err;

        let { image } = req.body;


        if (image) {
          try {
            await saveImage(image, result._id, "updates & trends_dp");
          } catch (error) {
            console.log(error);
          }
        }
        res.json({
          status: "Success",
          statuscode: 200,
          message: "Updates & trends successfully created!!!",
          data: result
        });
      }
    );
  },
  getById: (req, res, next) => {
    Updates & trendsModel.findById(req.params.updatesntrendsId, (err, result) => {
      console.log(result);

      if (err) throw err;
      else res.json({ status: "Success", statuscode: 200, message: "Updates & trends found", data: result });
    });
  },
  getAll: async (req, res, next) => {
    let all_updates & trends = await updates & trendsModel.find({}).sort({ createdAt: -1});

    for (let updates & trends of all_updates & trends) {
      let comment = await commentModel.find({ updates & trendsId: updates & trends._id });
      updates & trends.comments = comment;

      let like = await likesModel.find({ updates & trendsId: updates & trends._id });
      news.likes = like;

      let view = await viewsModel.find({ updates & trendsId: updates & trends._id });
      updates & trends.views = view;
    }
    res.json({
      status: "Success",
      statuscode: 200,
      message: "Updates & trends list found!!!",
      data: all_updates & trends.sort({ createdAt: -1 })
    });
  },
  getPaginated: async (req, res) => {
    // console.log(req.query)
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
      res.json({ status: "error", statuscode: 200, message: "invalid page number, should start with 1" })
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    query.sort = {
      createdAt: -1
    }
    // Find some documents
    updates & trendsModel.count({}, async (err, totalCount) => {
      if (err) {
        res.json({ status: "error", message: "Error fetching data" })
      }
      updates & trends.find({}, {}, query, async (err, all_updatesntrends) => {

        // Mongo command to fetch all data from collection.
        if (err) {
          res.json({ status: "error", message: "Error fetching data" })
        } else {
          var totalPages = Math.ceil(totalCount / size)
          for (let updates & trends of all_updates & trends) {
            let comment = await commentModel.find({ updates & trendsId: updates & trends._id });
            updates & trends.comments = comment;

            let like = await likesModel.find({ updates & trendsId: updates & trends._id });
            updates & trends.likes = like;

            let view = await viewsModel.find({ updates & trendsId: updates & trends._id });
            updates & trends.views = view;
          }
          res.json({
            status: "Success",
            statuscode: 200,
            pages: totalPages,
            size,
            pageNo,
            message: "All updates & trends found",
            data: all_updates & trends //.sort((a, b) => a.createdAt - b.createdAt)
          });
        }
      });


    })
  },
  updateById: (req, res, next) => {
    const obj = req.body;
    updates & trendsModel.findOneAndUpdate(
      req.params.updates & trendsId,
      {
        title: obj.title,
        category: obj.category,
        content: obj.content,
        author: obj.author
      },
      (err, result) => {
        if (err) {
          return res.json({
            status: "error",
            message: err
          });
        }
        else
          res.json({
            status: "Success",
            statuscode: 200,
            message: "Updates & trends updated successfully!!!",
            data: result
          });
      }
    );
  },
  deleteById: (req, res, next) => {
    updates & trendsModel.findByIdAndRemove(req.params.updates & trendsId, (err, result) => {
      if (err) {
        if (err) {
          return res.json({
            status: "error",
            message: err
          });
        }
      }
      else
        res.json({
          status: "Success",
          message: "updates & trends deleted successfully!!!",
          data: result
        });
    });
  },



  createImage: async (req, res, next) => {
    try {
      let imageFile = req.body.image;
      let updates & trends_id = req.body.updates & trendsid;
      let response = await saveImage(imageFile, updates & trendsid, "updates & trends_dp");
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  }


};
