const UserModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const PassHash = require("../helpers/PasswordHasher");
const ConversationModel = require("../models/Conversation");
module.exports = {
  getAll: (req, res) => {
    UserModel.find({}, (err, data) => {
      if (err) throw err;
      let newData = data.filter((el) => el._id != req.body._id);
      res.status(200).json(newData);
    });
  },
  create: (req, res) => {
    const Profile = { ...req.body };
    Profile.UserName = Profile.UserName.toLowerCase();
    PassHash.hashPass(Profile.Password)
      .then((hash) => {
        Profile.Password = hash;
        Profile.Status = "Online";
        let newUser = new UserModel(Profile);
        UserModel.find()
          .populate()
          .then((Users) => {
            Users.map((el) => {
              let newConversation = new ConversationModel({
                Users: [el, newUser],
              });
              newConversation.save();
            });
            newUser
              .save()
              .then(() => {
                const token = jwt.sign({ ...newUser }, process.env.SECRET_KEY);
                res.cookie("token", token, { httpOnly: "true" });
                res.json(newUser);
              })
              .catch((error) => {
                console.log(error.message);
                res.status(500).send(error.message.substring(0, 6));
              });
          });
      })
      .catch(() => res.status(500).send("something is wrong"));
  },
  edit: (req, res) => {
    let updateProfile = req.body;
    updateProfile.UserName = req.body.UserName.toLowerCase();
    PassHash.hashPass(updateProfile.Password)
      .then((hash) => {
        updateProfile.Password = hash;
        UserModel.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: updateProfile },
          { new: true },
          (err, data) => {
            if (err) console.log(err);
            res.json(data);
          }
        );
      })
      .catch(() => res.status(500).send("something is wrong"));
  },

  StatusUpdate: (req, res) => {
    UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { Status: req.body.Status } },
      { new: true }
    )
      .then((data) => (err, data) => {
        res.json(data);
      })
      .catch((err) => res.status(500).send("something is wrong"));
  },
  delete: (req, res) => {
    UserModel.findByIdAndDelete({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(500).send("Can't delete User, try again later")
      );
  },
  getLogged: (req, res) => {
    let mytoken = req.cookies.token;

    let decoded = jwt.verify(mytoken, process.env.SECRET_KEY);

    UserModel.findById({
      _id: decoded._doc ? decoded._doc._id : decoded._id,
    }).then((data) => {
      res.send(data);
    });
  },
  profilePicEdit: (req, res) => {
    const myfile = req.file;
    UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { picture: myfile.originalname } },
      { new: true }
    )
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(500).send("somthing wrong has happened");
      });
  },
};
