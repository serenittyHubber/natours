eslint(prettier / prettier);
const Tour = require('./../models/tourModel.js');

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find();

  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: { tours },
  });
};

exports.createTour = async (req, res) => {
  const tours = await Tour.create(req.body);

  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
