const logger = (req, res, next) => {
  // Basic request logging - can integrate winston or similar
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logger;
