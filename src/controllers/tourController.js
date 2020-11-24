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

exports.getStats = async (req, res, next) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 2.5 } },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
        },
      },
    ]);
    res.status(200).json({
      status: 'Success',
      stats,
    });
  } catch (err) {
    res.status(404).json({
      status: 'ok',
      message: 'fail',
    });
  }
};
