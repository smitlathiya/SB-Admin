const User = require("../models/user");
const Post = require("../models/posts");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("following", "_id email")
    .populate("followers", "_id email")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User Not Fount",
        });
      }

      req.profile = user;

      next();
    });
};

exports.hasAuthorization = (req, res, next) => {
  const authorizad =
    req.profile && req.auth && req.profile._id === req.auth._id;

  if (!authorizad) {
    return res.status(403).json({ error: "user is not Authorised" });
  }
};

exports.allUser = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ users });
  }).select("name email updated created profile_image");
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;

  req.profile.salt = undefined;

  return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err)
      return res.status(400).json({ error: "Photo could not be uploaded" });

    let user = req.profile;

    const data = {
      name: {
        first_name: fields.first_name,
        last_name: fields.last_name,
      },
      email: fields.email,
      designation: fields.designation,
      date_of_birth: fields.date_of_birth,
      address: {
        city: fields.city,
        state: fields.state,
        country: fields.country,
      },
      phoneNo: fields.phone_no,
      website: fields.website,
    };

    user = _.extend(user, data);

    user.updated = Date.now();

    if (files.profile_image) {
      user.profile_image.data = fs.readFileSync(files.profile_image.filepath);

      user.profile_image.contentType = files.profile_image.mimetype;
    }

    const emailExist = await User.findOne({ email: user.email });

    console.log("Header", JSON.stringify(req.headers.email));
    //user validation
    if (emailExist) {
      if (emailExist.email != req.headers.email) {
        return res.status(403).json({ error: "Email is already used!" });
      }
    }

    user.save((err, result) => {
      if (err) return res.status(400).json({ error: err });

      res.json(result);
    });
  });
};

exports.userPhoto = (req, res, next) => {
  if (req.profile.profile_image.data) {
    res.set("Content-Type", req.profile.profile_image.contentType);

    return res.send(req.profile.profile_image.data);
  }

  next();
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;

  //firs of all the post will be deleted

  Post.find({ postedBy: req.profile._id }).remove((err) => {
    if (err) return res.status(400).json({ error: err });

    // then after the user will be deleted

    user.remove((err) => {
      if (err) return res.status(400).json({ error: err });
    });

    res.json({ message: "Data Deleted Successfully" });
  });
};
