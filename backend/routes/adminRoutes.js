const express = require("express");
const authenticateToken = require("../middlewares/authMiddlware");
const getUserDetails = require("../controllers/adminControllers");

const router = express.Router();

router.get("/admin", authenticateToken, getUserDetails);

module.exports = router ;