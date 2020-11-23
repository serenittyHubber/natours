class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filtered() {
    const queryObj = { ...this.query };
    const deleteUnusedItems = ['page', 'sort', 'limit', 'fields'];
    deleteUnusedItems.forEach(el => delete queryObj[el]);
    let queryString = JSON.stringify(queryObj);

    queryString = queryString.replace(
      '/\b(gte|gt|let|lt)\b/g',
      match => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  sortBy() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__');
    }
    return this;
  }
  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = req.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
  }
}

module.exports = APIFeatures;
