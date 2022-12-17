const { AuthenticationError } = require('apollo-server-express');
const { User, Dog, Product, Category, Order } = require('../models');
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
        // async follow(parent, args, context, info) {
        //     if (!context.req.user) {
        //         throw new Error('You must be logged in to follow a user. Try clicking Log Out.')
        //     }
        //     const following = await User.findById(args.followingId);
        //     if (!following) {
        //         throw new Error('User not found');
        //     }
        //     const follow = new Follow({
        //         follower: context.req.user._id,
        //         following: following._id
        //     });
        //     await follow.save();

        //     context.req.user.following.push(follow._id);
        //     following.followers.push(follow._id);
        //     await context.req.user.save();
        //     await following.save();

        //     return follow;
        // }
    },
};

module.exports = resolvers;