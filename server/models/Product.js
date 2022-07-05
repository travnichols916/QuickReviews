const { Schema, model } = require('mongoose');

const reviewSchema = require('./Review');

const productSchema = new Schema(
  {
  description: {
    type: String,
    required: true,
  },
  // saved product id 
  productId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  // Alan add this
  reviews: [reviewSchema],
});

const Product = model('Product', productSchema);

module.exports = Product;
