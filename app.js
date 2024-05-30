const path = require("path");

require("dotenv").config();
const express = require("express");

const dbConnect = require("./database/dbConnect");
const categoryRouter = require("./routes/categoryRoute");
const subcategoryRouter = require("./routes/subcategoryRoute");
const brandRouter = require("./routes/brandRoute");
const productRouter = require("./routes/productRoute");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const httpStatusText = require("./utils/httpStatusText");
const AppError = require("./utils/appError");

dbConnect();

const app = express();

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subcategoryRouter);
app.use("/api/v1/categories/:categoryId/subcategories", subcategoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/products", productRouter);

app.all("*", (req, res, next) => {
  const error = new AppError(
    404,
    httpStatusText.FAIL,
    `page not found ${req.url}`
  );
  next(error);
});

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
  console.log(`http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection: ${err.message}`);
  server.close(() => {
    console.log(`server closed`);
    process.exit(1);
  });
});
