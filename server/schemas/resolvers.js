const { AuthenticationError, UserInputError } = require('apollo-server-express');
const User = require('../models/User');
const Post = require('../models/graphQL/Post');

const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                try {
                    // get a user by id
                    const user = await User.findOne({ _id: context.user._id });
                    return user;
                } catch (err) {
                    console.log('Unable to find user', err);
                }
            }
            throw new AuthenticationError('Not logged in');
        },
        getPosts: async() => {
            try {
              const posts = await Post.find().sort({ createdAt: -1 });
              return posts;
            } catch (err) {
              throw new Error(err);
            }
          },
      
        getPost: async(_, { postId }) => {
            try {
                const post = await Post.findById(postId);
        
                if (post) {
                return post;
                } else {
                throw new Error("Post not Found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    
    Mutation: {
        login: async (parent, { email, password }) => {
            try {
                // Validating email on database
                const user = await User.findOne({ email });
                if (!user) {
                    throw new AuthenticationError('Incorrect email');
                }
                // Validating password on database
                const correctPw = await user.isCorrectPassword(password);
                if (!correctPw) {
                    throw new AuthenticationError('Incorrect password');
                }
                
                const token = signToken(user);
                return {token, user};
            }   catch (err) {
                console.log('Something went wrong. Could not log in.', err)
            }
        },
        addUser: async (parent, args) => {
            try {
                // Our args will be email, password, and username.
                const user = await User.create(args);
                const token = signToken(user);

                return { token, user };
                
            }   catch (err) {
                console.log('Something went wrong. Could not sign up.', err);
            }
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw new AuthenticationError('Not logged in');
        },
        createPost: async(_, { body }, context) => {
            const user = (context);
            console.log(user);
      
            if (body.trim() === "") {
              throw new Error("Post body must not be empty");
            }
      
            const newPost = new Post({
              body,
              user: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              createdAt: new Date().toISOString(),
            });
      
            const post = await newPost.save();
      
      
            return post;
        },
        // deletePost: async(_, { postId }, context) => {
        //     const user = (context);
      
        //     try {
        //       const post = await Post.findById(postId);
        //       if (user._id === post._id) {
        //         await post.delete();
        //         return "Post deleted successfully";
        //       } else {
        //         throw new AuthenticationError("Action not allowed");
        //       }
        //     } catch (err) {
        //       throw new Error(err);
        //     }
        // },
        likePost: async(_, { postId }, context) => {
            const { email } = (context);
      
            const post = await Post.findById(postId);
      
            if (post) {
              if (post.likes.find((likes) => likes.email === email)) {
                post.likes = post.likes.filter((like) => like.email !== email);
              } else {
                post.likes.push({
                    email,
                  createdAt: new Date().toISOString(),
                });
              }
              await post.save();
              return post;
            } else throw new UserInputError("Post Not Found");
        },
        createComment: async (_, { postId, body }, context) => {
            const { email } = (context);
            if (body.trim() === "") {
              throw new UserInputError("Empty comment", {
                errors: {
                  body: "Comments body must not empty",
                },
              });
            }
      
            const post = await Post.findById(postId);
      
            if (post) {
              post.comments.unshift({
                body,
                email,
                createdAt: new Date().toISOString(),
              });
              await post.save();
              return post;
            } else throw new UserInputError("Post not found");
        },
        // deleteComment: async(_, { postId, commentId }, context) => {
        //   const { email } = (context);
    
        //   const post = await Post.findById(postId);
    
        //   if (post) {
        //     const commentIndex = post.comments.findIndex((c) => c.id === commentId);
    
        //     if (post.comments[commentIndex].email === email) {
        //       post.comments.splice(commentIndex, 1);
        //       await post.save();
        //       return post;
        //     } else {
        //       throw new AuthenticationError("Action not allowed");
        //     }
        //   } else {
        //     throw new UserInputError("Post not found");
        //   }
        // },
    },
    // Subscription: {
    //     newPost: {
    //       subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    //     },
    //   },
};

module.exports = resolvers;
