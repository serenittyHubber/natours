const express = require('express');
const tourController = require('./../controllers/tourController.js');

const router = express.Router();
router
  .route('/top5tours')
  .get(tourController.aliasTopTours)
  .get(tourController.getAllTours);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/stats')
  .get(tourController.getStats)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
