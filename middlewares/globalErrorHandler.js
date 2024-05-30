const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.statusText = err.statusText || "error";
  if (process.env.NODE_ENV === "development") {
    errorDevEnv(err, res);
  } else {
    errorProdEnv(err, res);
  }
};
const errorDevEnv = (err, res) => {
  return res.status(err.statusCode).json({
    code: err.statusCode,
    message: err.message,
    statusText: err.statusText,
    error: err,
    stack: err.stack,
  });
};

const errorProdEnv = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
};

module.exports = globalErrorHandler;
