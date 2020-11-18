const Tour = require('./../models/tourModel.js');

exports.getAllTours = async (req, res) => {
  const tours = await Tour.find();

  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
