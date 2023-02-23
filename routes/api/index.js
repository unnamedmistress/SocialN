// import the Express module and create a new router
const router = require("express").Router();

// import the user and thought routes
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// use the userRoutes and thoughtRoutes when a request is made to /users or /thoughts
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

// export the router for use in other files
module.exports = router;

// This code imports userRoutes and thoughtRoutes, and sets up the routes for "/users" and "/thoughts" using router.use(). It then exports the router so that other files can use it.