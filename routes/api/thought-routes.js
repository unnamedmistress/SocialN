// Import necessary functions from the thought-controller file
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// Create a new router object
const router = require("express").Router();

// Define endpoints for the thoughts API

// /api/thoughts
// Handle GET and POST requests for getting all thoughts and creating a new thought
router.route("/").get(getAllThought).post(createThought);

// /api/thoughts/:id
// Handle GET, PUT, and DELETE requests for a specific thought by ID
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// Handle POST requests for adding a reaction to a specific thought
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
// Handle DELETE requests for removing a reaction from a specific thought
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

// Export the router object so it can be used in other files
module.exports = router;
