// import functions that control what happens when we use the routes
const {
  getAllUser, //get all users
  getUserById, //get one user by id
  createUser, //create user
  updateUser, //update user by id
  deleteUser, //delete user by id
  addFriend, //add friend to user's friend list
  removeFriend, //remove friend from user's friend list
  } = require("../../controllers/user-controller");
  
  // make a new Router
  const router = require("express").Router();
  
  // define what happens when we use the routes
  // /api/users
  router.route("/").get(getAllUser).post(createUser);
  
  // /api/users/:id
  router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
  
  // /api/users/:userId/friends/:friendId
  router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);
  
  // export our router so that other parts of the app can use it
  module.exports = router;