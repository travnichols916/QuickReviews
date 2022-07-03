const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedProducts` array in User.js
const productSchema = new Schema({
  // authors: [
  //   {
  //     type: String,
  //   },
  // ],

  // Alan Did this...
  _id: {
    type: Schema.types.ObjectId,
    default: ()=> new Types.ObjectId()
  },
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


const reviewSchema = new Schema(
  {
    _id: {
      type: Schema.types.ObjectId,
      default: ()=> new Types.ObjectId()
    },
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    reviewId:{
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reviewText:{
      type: String,
      required: true,
      maxLength: 280,
    },
    rating:{
      type: String,
      required: true,
      minLength: 1,
      maxLength: 5,
    },
    recommended: {

    },
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

module.exports = productSchema;
