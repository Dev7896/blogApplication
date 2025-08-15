const mongoose = require("mongoose");

async function dbconfig(dburl) {
  return await mongoose
    .connect(dburl)
    .then(() => console.log("database connection is successful"))
    .catch((err) => console.log(err.message));
}

module.exports = dbconfig ;