const User = require("../models/userModel");
const mongoose = require("mongoose");


async function getUserDetails(req, res, next) {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(404).json({ error: true, message: "user not found" });
    }
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });

    return res.json({ success: true, data: { user } });
  } catch (error) {
    return next(error);
  }
}



module.exports = getUserDetails;
