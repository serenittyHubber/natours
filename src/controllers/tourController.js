const Tour = require('./../models/tourModel.js');
const { catchAsync } = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.limit = '-ratingsAverage,price';
  req.query.fields = 'name,price,duration';
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  // const queryObj = { ...req.query };
  // const deleteUnusedItems = ['page', 'sort', 'limit', 'fields'];
  // deleteUnusedItems.forEach(el => delete queryObj[el]);
  // let queryString = JSON.stringify(queryObj);

  // queryString = queryString.replace(
  //   '/\b(gte|gt|let|lt)\b/g',
  //   match => `$${match}`,
  // );

  // let query = Tour.find(JSON.parse(queryString));

  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   query = query.sort(sortBy);
  // } else {
  //   query = query.sort('-createdAt');
  // }

  // if (req.query.fields) {
  //   const fields = req.query.fields.split(',').join(' ');
  //   query = query.select(fields);
  // } else {
  //   query = query.select('-__');
  // }

  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 100;
  // const skip = (page - 1) * limit;
  // query = query.skip(skip).limit(limit);

  const apiFeatures = new APIFeatures(
    Tour.find(),
    req.query,
  ).sortBy();
  const tours = await apiFeatures.query;

  res.status(200).json({
    status: 'Success',
    ['All best results']: tours.length,
    data: { tours },
  });
});

exports.createTour = async (req, res) => {
  const tours = await Tour.create(req.body);
  res.status(201).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: 'Success',
    results: tour,
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'Success',
    results: tour,
    data: {
      tour,
    },
  });
});
