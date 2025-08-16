const Blog = require("../models/blogModel.js");
const mongoose = require("mongoose");
const imageKit = require("../utils/imagekit");

const createBlog = async (req, res) => {
  try {
    console.log(req.body);
    const { title, content, imageUrl, slug, tags, author } = req.body;

    if (!title || !content || !imageUrl || !slug || !tags || !author) {
      return res.status(403).json({ error: true, message: "missing data" });
    }

    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.json({
        error: true,
        message: "user is not valid",
      });
    }

    const newBlog = new Blog({
      title,
      content,
      imageUrl,
      slug,
      author, // comes from auth middleware
      tags,
    });

    const savedBlog = await newBlog.save();

    return res.status(200).json({
      success: true,
      message: "Blog created successfully",
      data: savedBlog,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

// GET ALL BLOGS
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "username email") // populate author details
      .sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching blogs",
    });
  }
};

// GET BLOG BY ID
const getBlogById = async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid blog ID",
    });
  }

  try {
    const blog = await Blog.findById(id).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching the blog",
    });
  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: true,
      message: "Invalid blog ID",
    });
  }

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }


    // Delete image from ImageKit if fileId exists
    if (blog.imageFileId) {
      try {
        await imageKit.deleteFile(blog.imageFileId);
      } catch (imgErr) {
        console.error("Error deleting image from ImageKit:", imgErr);
        // Not blocking blog deletion if image delete fails
      }
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      error: true,
      message: "Server error while deleting the blog",
    });
  }
};

// UPDATE BLOG
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid blog ID",
    });
  }

  try {
    const blog = await Blog.findById(id).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.comments.push({ user, text });
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "comment added succesfully",
    });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return res.status(500).json({
      error: true,
      message: "Server error while fetching the blog",
    });
  }
};


const toggleLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { userId } = req.body; // assuming authentication middleware
    if(!userId){
      return res.status(400).json({error : true , message  : 'Register your self '})
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const hasLiked = blog.likes.includes(userId);

    if (hasLiked) {
      // Unlike
      blog.likes.pull(userId);
    } else {
      // Like
      blog.likes.push(userId);
    }

    await blog.save();
    res.status(200).json({
      message: hasLiked ? "Blog unliked" : "Blog liked",
      totalLikes: blog.likes.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
  toggleLike,
};
