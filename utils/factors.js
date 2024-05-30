const asyncHandler = require("express-async-handler");

const httpStatusText = require("./httpStatusText");
const AppError = require("./appError");
const ApiFetchers = require("./apiFetchers");
const getAll = (Model) => {
  return asyncHandler(async (req, res, next) => {
    //filter
    const filter = new ApiFetchers(req.query).filter();
    // const queryObj = { ...req.query };
    // const excludeFields = ["page", "sort", "limit", "fields"];
    // excludeFields.forEach((el) => delete queryObj[el]);

    //sort
    const sort = new ApiFetchers(req.query).sort;

    //fields
    const fields = req.query.fields;
    if (fields) {
      fields.split(",").join(" ");
    } else {
      req.query.fields = "-__v";
    }

    //search
    const query = {};
    if (req.query.keyword) {
      query.$or = [
        { name: { $regex: req.query.keyword, $options: "i" } },
        // { categoy: { $regex: req.query.keyword, $options: "i" } },
      ];
    }

    //pagination
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;

    // build mongoose query
    const mongooseQuery = Model.find({ ...query, ...filter })
      .populate({ path: "category", select: "name -_id" })
      .limit(limit)
      .skip(skip)
      .sort(req.query.sort)
      .select(fields);

    // execute query
    const documents = await mongooseQuery;

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { documents },
    });
  });
};
module.exports = {
  getAll,
};
