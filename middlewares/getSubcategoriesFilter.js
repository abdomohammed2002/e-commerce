const getSubcategoriesFilter = (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) {
    filter = { category: req.params.categoryId };
  }
  req.filter = filter;
  next();
};

module.exports = getSubcategoriesFilter;
