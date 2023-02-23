// Import the required modules and functions from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the User model
const UserSchema = new Schema(
  {
    // Define the username property of the User model
    username: {
      type: String,
      unique: true,
      trim: true,
      required: "You must create a User name first.",
    },

    email: {
      type: String,
      unique: true,
      required: "You must create a User email first.",
      match: [/.+@.+\..+/],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Define a virtual property 'friendCount' for the User model
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
