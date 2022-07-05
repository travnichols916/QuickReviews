const { Schema } = require('mongoose');


const reviewSchema = new Schema(
  {
    
    // _id: {
    //   type: Schema.types.ObjectId,
    //   // default: ()=> new Types.ObjectId()
    // },
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    reviewId:[{
      type: Schema.Types.ObjectId,
      // default: () => new Types.ObjectId()
    }],
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
const productSchema = new Schema({
  // authors: [
  //   {
  //     type: String,
  //   },
  // ],

  // Alan Did this...
  // _id: {
  //   type: Schema.types.ObjectId,
  //   // default: ()=> new Types.ObjectId()
  // },
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



module.exports = productSchema;
