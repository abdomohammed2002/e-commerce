class ApiFetchers {
  constructor(query) {
    this.query = query;
  }
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    return queryObj;
  }
  sort() {
    if (!this.query.sort) {
      return (this.query.sort = "-createdAt");
    }
  }
}
module.exports = ApiFetchers;
