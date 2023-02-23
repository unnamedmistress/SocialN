const { User, Thought } = require("../models");

const userController = {
  // get all users to make new friends, get reactions and thoughts!
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v", //we don't want that version field
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          return res
            .status(404)
            .json({ message: "No user found with this id, no friend with that ID, Bro!" });
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create user for your network
  createUser({ body }, res) {
    User.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.json(err));
  },

  // update the user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No friend with that Id, Bro!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          return res.status(404).json({ message: "No user with this id, bro" });
        }
        // That moment when you delete a user and all their thoughts go bye bye
        return Thought.deleteMany({ _id: { $in: dbUsersData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted! Good Riddance" });
      })
      .catch((err) => res.json(err));
  },

  // make friends!! yay
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user with this id, wrong turn" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  // friend go bye bye - delete you
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          return res.status(404).json({ message: "No user with this id, bro!" });
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
};
module.exports = userController;