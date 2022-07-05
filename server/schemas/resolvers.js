const { AuthenticationError } = require("apollo-server-express");
const { User, Review, Product } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Me
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate
          // "reviews"
          // ();

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    // //   User
    // user: async (parent, { username }) => {
    //   return (
    //     User.findOne({ username })
    //       .select("-__v -password")
    //       .populate("reviews")
    //       // Saved Products
    //       .populate("savedProducts")
    //   );
    // },
    // users: async () => {
    //     return (
    //       User.find()
    //         .select("-__v -password")
    //         .populate("reviews")
    //         // Saved Products
    //         .populate("savedProducts")
    //     );
    // },

    // // Product Reviews
    // reviews: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Review.find(params).sort({ createdAt: -1 });
    // },
    // // Review by Id
    // review: async (parent, { _id }) => {
    //   return Review.findOne({ _id });
    // },
  },

  Mutation: {
    // Add User
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // login
  //   login: async (parent, { email, password }) => {
  //     const user = await User.findOne({ email });

  //     if (!user) {
  //       throw new AuthenticationError("Incorrect credentials");
  //     }

  //     const correctPw = await user.isCorrectPassword(password);

  //     if (!correctPw) {
  //       throw new AuthenticationError("Incorrect credentials");
  //     }

  //     const token = signToken(user);
  //     return { token, user };
  //   },
  //   saveProduct: async (parent, args, context) => {
  //     if (context.user) {
  //       const updatedUser = await User.findByIdAndUpdate(
  //         { _id: context.user._id },
  //         { $push: { products: product._id } },
  //         { new: true }
  //       );

  //       return upatedUser;
  //     }
  //     throw new AuthenticationError("You need to be logged in!");
  //   },
  //   removeProduct: async (parent, args, context) => {
  //     if (context.user) {
  //       const updateUser = await User.findByIdAndUpdate(
  //         { _id: context.user._id },
  //         { $pull: { products: product._id } },
  //         { new: true }
  //       );

  //       return updateUser;
  //     }
  //     throw new AuthenticationError("You need to be logged in!");
  //   },
  //   //   Create a Review
  //   addReview: async(parent, args, context) => {
  //       if(context.user) {
              
  //         const updateProduct = await Product.findByIdAndUpdate(
  //              { _id: context.product._id },
  //              { $push: { reviews: review._id } },
  //              { new: true }
  //            );
     
  //            return updateUser;
  //      }
  //      throw new AuthenticationError('You need to be logged in!');
  //   },
  //   //  Update a Review
  //   updateReview: async (parent, args, context) =>{
  //       if(context.review) {
              
  //           const updateReview = await Review.findByIdAndUpdate(
  //                { _id: context.review._id },
  //                { $push: { reviewText: review._id } },
  //                { new: true }
  //              );
       
  //              return updateUser;
  //        }
  //        throw new AuthenticationError('You need to be logged in!');
  //   },
  //   //  Remove a Review
  //   deleteReview: async(parent, args, context) => {
  //       if(context.user) {
              
  //         const updateProduct = await Product.findByIdAndUpdate(
  //              { _id: context.user._id },
  //              { $pull: { reviews: review._id } },
  //              { new: true }
  //            );
     
  //            return updateUser;
  //      }
  //      throw new AuthenticationError('You need to be logged in!');
  //   }
  },
};
   
  

  
  module.exports = resolvers;
  