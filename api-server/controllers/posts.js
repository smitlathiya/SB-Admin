const Posts = require("../models/posts");

const formidable = require("formidable");

const fs = require("fs");
const res = require("express/lib/response");
const req = require("express/lib/request");
const _ = require("lodash");

exports.postById = (req, res, next, id) => {
  Posts.findById(id)

    .populate("postedBy", "_id name")

    .exec((err, post) => {
      if (err || !post)
        return res.status(400).json({ error: "something went wrong" });

      req.post = post;

      next();
    });
};

exports.getPosts = (req, res) => {
  Posts.find()

    .select("_id title body photo")

    .populate("postedBy", "_id name username designation profile_image")

    .then((posts) => {
      res.json({ posts });
    })

    .catch((err) => console.log(err));
};

exports.getPost = (req, res) => {
  return res.json(req.post);
};

exports.createPost = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).json({ error: err });

    let post = new Posts(fields);

    req.profile.hashed_password = undefined;

    req.profile.salt = undefined;

    post.postedBy = req.profile;

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.filepath);

      post.photo.contentType = files.photo.mimetype;
    }
    post.save((err, result) => {
      if (err) return res.status(400).json({ error: err });

      res.json({
        message: "Post Successfully",
      });
    });
  });
};

// exports.updatePost = (req, res, next) => {
//     let post = req.post
//     post = _.extend(post, req.body)
//     post.updatePost = Date.now()
//     post.save(err => {
//         if (err) return res.status(400).json({ error: err })
//         res.json({ message: "Post Updated Successfully" })
//     })
// }

exports.updatePost = (req, res, next) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).json({ error: err });

    let post = req.post;

    post = _.extend(post, fields);

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.filepath);

      post.photo.contentType = files.photo.mimetype;
    }

    post.save((err) => {
      if (err) return res.status(400).json({ error: err });

      res.json({ message: "Post Updated Successfully" });
    });
  });
};

exports.postedByUser = (req, res) => {
  Posts.find({ postedBy: req.profile._id })

    .populate("postedBy", "_id name")

    .sort("_created")

    .exec((err, posts) => {
      if (err) return res.status(400).json({ error: err });

      res.json(posts);
    });
};

exports.isPoster = (req, res, next) => {
  let postedById = req.post.postedBy._id
    .toString()
    .replace(/ObjectId\("(.*)"\)/, "$1");

  let isPoster = req.post && req.auth && postedById == req.auth._id;

  if (!isPoster) {
    return res.status(403).json({ error: "User is not Authorized" });
  }

  next();
};

exports.postImage = (req, res, next) => {
  if (req.post.photo.data) {
    res.set("Content-Type", req.post.photo.contentType);

    return res.send(req.post.photo.data);
  }

  next();
};

exports.deletePost = (req, res) => {
  let post = req.post;

  post.remove((err) => {
    if (err) return res.status(400).json({ error: err });

    res.json({ message: "Post deleted Successfully" });
  });
};
