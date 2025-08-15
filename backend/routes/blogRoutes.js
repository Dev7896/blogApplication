const express = require("express");
const {
  createBlog,
  getAllBlogs,
  deleteBlog,
  getBlogById,
  updateBlog,
  toggleLike,
} = require("../controllers/blogControllers");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/create", createBlog);
router.delete("/:id", deleteBlog);
router.get("/:id", getBlogById);
router.patch("/:id", updateBlog);
router.patch("/like/:id", toggleLike);

module.exports = router;
