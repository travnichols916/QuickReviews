const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Product.js
const productSchema = require('./Product');

const userSchema = new Schema(
  {
    _id:{
      type: Number,
      unique: true,
      require: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true
    },
    reviews: [],
    // set savedProducts to be an array of data that adheres to the productSchema
    savedProducts: [productSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `productCount` with the number of saved products we have
userSchema.virtual('productCount').get(function () {
  return this.savedProducts.length;
});

const User = model('User', userSchema);

module.exports = User;
