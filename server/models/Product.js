const { Schema, model } = require('mongoose');

const reviewSchema = require('./Review');

const productSchema = new Schema(
  {
  description: {
    type: String,
    required: true,
  },
  // saved api id 
  isbn: {
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
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
});

const Product = model('Product', productSchema);

module.exports = Product;
