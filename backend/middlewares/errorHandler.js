function errorHandler(err, req, res, next) {
  if (err) {
    console.log(err.message);
  }
  process.exit(1);
}

module.exports = {
    errorHandler
}