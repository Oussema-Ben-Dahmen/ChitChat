const ConversationModel = require("../models/Conversation");

module.exports = {
  GetConversation: (req, res) => {
    console.log(req.body);
    console.log("MyID", req.params.id);
    ConversationModel.find({
      $and: [
        { Users: { $in: [req.params.id] } },
        { Users: { $in: [req.body.user_id] } },
      ],
    })
      .populate({
        path: "Messages",
        populate: { path: "SenderId" },
      })
      .then((data) => res.json(data[0]))
      .catch((err) => console.log(err));
  },
};
