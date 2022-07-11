const { AuthenticationError } = require("apollo-server-express");
const  User = require("../models/User");
const  Product = require("../models/Product");
const  Review = require("../models/Review");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Me
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate ("reviews");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    //   User
    user: async (parent, { username }) => {
      return (
        User.findOne({ username })
          .select("-__v -password")
          .populate("reviews")
          // // Saved Products
          // .populate("savedProducts")
      );
    },
    users: async () => {
        return (
          User.find()
            .select("-__v -password")
            .populate("reviews")
            // Saved Products
            .populate("savedProducts")
        );
    },

    // Product Reviews
    reviews: async (parent, { username, productIsbn }) => {
      
      const params = username ? { username, productIsbn } : {};
      return Review.find(params).sort({ createdAt: -1 });
    },
    reviewsByUser: async (parent,  { username }) => {
      const params = username ? { username } : {};
      return User.find(params).sort({ createdAt: -1 })
      // .populate(reviews);
    },

    reviewsByIsbn: async (parent,  { productIsbn }) => {
      console.log(productIsbn)
      const params = productIsbn ? { productIsbn } : {};
      console.log(params);
      const results = await Review.find(params); 
      console.log(results.json);
      return results;
      
      // .sort({ dateCreated: -1 })
      
    }
  },

  Mutation: {
    // Add User
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    // saveProduct: async (parent, args, context) => {
    //   if (context.user) {
    //     const product = await Product.create({ ...args, username: context.user.username });
    //     console.log(product);
        
    //     const updatedUser = await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { savedProducts: product  } },
    //       { new: true }
    //     );
    //       console.log(updatedUser)
    //      return updatedUser;
    //     return product;
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
    // removeProduct: async (parent, { productId }, context) => {
    //   if (context.user) {
        
    //     const updateUser = await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { savedProducts: productId } },
    //       { new: true }
    //     );
    //     const removedProduct = await Product.findByIdAndRemove(productId)
    //     console.log(removedProduct)
    //     return updateUser;
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
    //   Create a Review
    addReview: async(parent, args, context) => {
        if(context.user) {
          // Create Review
          const { productIsbn, productTitle, reviewTitle, reviewText, rating, recommended } = args;
          console.log(recommended, "recommended");
          const review = await Review.create({productIsbn, productTitle, reviewTitle, reviewText, rating, recommended, username: context.user.username})
          console.log(review)
          // Add Review to USEr
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { reviews: review  } },
            { new: true }
          );
//           dateCreated: null
// productIsbn: null
// recommend: null
// reviewText: null
// reviewTitle: null
// userId: null
          console.log(updatedUser)
          // Add Review to Product
          // const updateProduct = await Product.findByIdAndUpdate(
          //   //API ID 
          //   { _id: isbn },
          //   { $push: { reviews: review } },
          //   { new: true }
          //    );
          // console.log(updateProduct)
          return updatedUser;
       }
       throw new AuthenticationError('You need to be logged in!');
    },
    //  Update a Review
    updateReview: async (parent, args, context) =>{
        if(context.review) {
              
            const updateReview = await Review.findByIdAndUpdate(
                 { _id: context.review._id },
                 { $push: { reviewText: review._id } },
                 { new: true }
               );
       
               return updateUser;
         }
         throw new AuthenticationError('You need to be logged in!');
    },
    //  Remove a Review
    deleteReview: async(parent, args, context) => {
        if(context.user) {
          //  Delete Review from User
          // Delete review from rpoduct
              // Delete Review from review
          // const updateProduct = await Product.findByIdAndUpdate(
          //      { _id: context.user._id },
          //      { $pull: { reviews: review._id } },
          //      { new: true }
          //    );
     
             return updateUser;
       }
       throw new AuthenticationError('You need to be logged in!');
    }
  },
};
   
  

  
module.exports = resolvers;
