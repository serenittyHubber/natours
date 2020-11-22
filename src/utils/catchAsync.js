exports.catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => {
      res.status(404).json({
        status: 'Fail',
        message: err,
      });
    });
  };
};
