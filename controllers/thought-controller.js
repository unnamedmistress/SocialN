const { User, Thought } = require("../models");

const userController = {
  // get all users
  getAllUser(req, res) {
    // Find all users in the User model
    User.find({})
      .populate({
        // Populate the friends array, excluding the version field
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      // Sort by descending ID
      .sort({ _id: -1 })
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    // Find one user with the given ID in the User model
    User.findOne({ _id: params.id })
      .populate({
        // Populate the thoughts array, excluding the version field
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        // Populate the friends array, excluding the version field
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          // If no user is found with the given ID, return a 404 response with an error message
          return res
            .status(404)
            .json({ message: "No user found with this id, do not pass Go!" });
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create user
  createUser({ body }, res) {
    // Create a new user in the User model with the provided data in the request body
    User.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    // Update a user with the given ID in the User model with the new data provided in the request body
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          // If no user is found with the given ID, return a 404 response with an error message
          res.status(404).json({ message: "No user found with this id do not pass go!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    // Delete a user with the given ID in the User model, as well as their associated thoughts
    User.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          // If no user is found with the given ID, return a 404 response with an error message
          return res.status(404).json({ message: "No user with this id, do not pass go!" });
        }
        // Delete all thoughts associated with the user being deleted
        return Thought.deleteMany({ _id: { $in: dbUsersData.thoughts } });
      })
      .then(() => {
        // Respond with a success message after deleting the user and their thoughts
        res.json({ message: "User and associated thoughts deleted, no one cares!" });
      })
      .catch((err) => res.json(err));
  },


  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No user Do not pass go" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  // delete friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          return res.status(404).json({ message: "No user Do not pass Go" });
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
};
module.exports = userController;