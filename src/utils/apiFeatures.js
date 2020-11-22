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
}

module.exports = APIFeatures;
