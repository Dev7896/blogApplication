const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters long"],
    },
    slug: {
      type: String,
      required: [true, "subtitle is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters long"],
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Blog image is required"],
    },
    imageFileId: {
      type: String, // optional, to reference ImageKit file if you want to delete/update
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming you have a User model
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // reference to the user who commented
          required: true,
        },
        text: {
          type: String,
          required: [true, "Comment text is required"],
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
