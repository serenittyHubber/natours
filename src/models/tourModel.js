const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Name cannot be null'],
    },
    price: {
      type: Number,
      require: [true, 'Price cannot be empty'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return this.price > val;
        },
        message: `Discount price {VALUE} is bigger that the price`,
      },
    },
    secreteTour: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      required: [true, 'Duration cannot be null'],
    },
    maxGroupSize: Number,
    difficulty: {
      type: String,
      required: [true, 'Difficult cannot be empty'],
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty must be easy, hard, medium',
      },
    },
    summary: String,
    description: String,
    guides: [],
    images: ['String'],
    startDates: [Date],
    ratingsAverage: {
      type: Number,
      min: [2, 'Must be bigger that 1'],
      max: [5, 'Must be lesser that 6'],
    },
    ratingsQuantity: Number,
    imageCover: String,
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// tourSchema.pre(/^find/, function(next) {
//   this.find({ secreteTour: { $eq: true } });
//   next();
// });

tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('aggregate', function(next) {
//   this.pipeline.unshift({ $match: { secreteTour: { $ne: true } } });
//   next();
// });

//model middleWare
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
