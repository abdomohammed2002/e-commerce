const { validationResult } = require("express-validator");

const validationError = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.json({
      errors: result.array(),
    });
  }
  next();
};

module.exports = validationError;
