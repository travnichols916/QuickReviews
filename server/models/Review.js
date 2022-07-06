const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
    {
       
    reviewText:{
        type: String,
        required: true,
        maxLength: 280,
      },
      rating:{
        type: String,
        required: true,
        minLength: 0,
        maxLength: 5,
      },
      recommended: {Boolean},
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      // prevents virtuals from creating duplicate of _id as `id`
      id: false
    }
  )

  const Review = model('Review', reviewSchema);

  module.exports = Review;