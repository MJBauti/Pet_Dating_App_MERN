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
    },
};

module.exports = resolvers;