const updatesntrendsModel = require("../models/updatesntrends");
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
//       updatesntrendsModel.findByIdAndUpdate(user_id, { [key]: name }, (err, result) => {
//         console.log("Results()=>", result);
//         if (err) return reject(err);
//         resolve({
//           status: "Success",
//           message: `Updatesntrends  successfully got ${name}`,
//           data: result
//         });
//       });
//     });
//   });
// };

const saveImage = (imageFile, updatesntrends_id, key) => {
  console.log("this is my image", imageFile)
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageFile, function (err, result) {
      console.log("from here", result, err);
      if (err) return err;
      newsModel.findByIdAndUpdate(updatesntrends_id, { [key]: result.secure_url }, (err, result) => {
        // console.log("Result()=>", result)
        if (err) return reject(err);
        resolve({ status: "Success", message: `Updatesntrends successfully got ${result.secure_url}`, data: result })
      })
    });

  })
}

module.exports = {
  create: (req, res, next) => {
    const obj = req.body;
    newsModel.create(
      {
        title: obj.title,
        category: obj.category,
        content: obj.content,
        author: obj.author
      },
      async (err, result) => {
        console.log("My updatesntrends", result)
        if (err) throw err;

        let { image } = req.body;


        if (image) {
          try {
            await saveImage(image, result._id, "updatesntrends_dp");
          } catch (error) {
            console.log(error);
          }
        }
        res.json({
          status: "Success",
          statuscode: 200,
          message: "Updatesntrends successfully created!!!",
          data: result
        });
      }
    );
  },
  getById: (req, res, next) => {
    updatesntrendsModel.findById(req.params.updatesntrendsId, (err, result) => {
      console.log(result);

      if (err) throw err;
      else res.json({ status: "Success", statuscode: 200, message: "Updatesntrends found", data: result });
    });
  },
  getAll: async (req, res, next) => {
    let all_updatesntrends = await updatesntrendsModel.find({}).sort({ createdAt: -1});

    for (let updatesntrends of all_updatesntrends) {
      let comment = await commentModel.find({ updatesntrendsId: updatesntrends._id });
      updatesntrends.comments = comment;

      let like = await likesModel.find({ updatesntrendsId: updatesntrends._id });
      news.likes = like;

      let view = await viewsModel.find({ updatesntrendsId: updatesntrends._id });
      updatesntrends.views = view;
    }
    res.json({
      status: "Success",
      statuscode: 200,
      message: "Updatesntrends list found!!!",
      data: all_updatesntrends.sort({ createdAt: -1 })
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
    updatesntrendsModel.count({}, async (err, totalCount) => {
      if (err) {
        res.json({ status: "error", message: "Error fetching data" })
      }
      updatesntrendsModel.find({}, {}, query, async (err, all_updatesntrends) => {

        // Mongo command to fetch all data from collection.
        if (err) {
          res.json({ status: "error", message: "Error fetching data" })
        } else {
          var totalPages = Math.ceil(totalCount / size)
          for (let updatesntrends of all_updatesntrends) {
            let comment = await commentModel.find({ updatesntrendsId: updatesntrends._id });
            updatesntrends.comments = comment;

            let like = await likesModel.find({ updatesntrendsId: updatesntrends._id });
            updatesntrends.likes = like;

            let view = await viewsModel.find({ updatesntrendsId: updatesntrends._id });
            updatesntrends.views = view;
          }
          res.json({
            status: "Success",
            statuscode: 200,
            pages: totalPages,
            size,
            pageNo,
            message: "All updatesntrends found",
            data: all_updatesntrends //.sort((a, b) => a.createdAt - b.createdAt)
          });
        }
      });


    })
  },
  updateById: (req, res, next) => {
    const obj = req.body;
    updatesntrendsModel.findOneAndUpdate(
      req.params.updatesntrendsId,
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
            message: "Updatesntrends updated successfully!!!",
            data: result
          });
      }
    );
  },
  deleteById: (req, res, next) => {
    newsModel.findByIdAndRemove(req.params.newsId, (err, result) => {
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
          message: "Updatesntrends deleted successfully!!!",
          data: result
        });
    });
  },



  createImage: async (req, res, next) => {
    try {
      let imageFile = req.body.image;
      let updatesntrends_id = req.body.updatesntrendsid;
      let response = await saveImage(imageFile, updatesntrendsid, "news_dp");
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  }


};
