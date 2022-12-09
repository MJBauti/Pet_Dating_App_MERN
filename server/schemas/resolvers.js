const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/')

const resolver = {
    Query: {
        me: async (parent, args, context) => {
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
                    throw new AuthenticationError('Incorrect credentials');
                }
                // Validating password on database
                const correctPw = await user.isCorrectPassword(password);
                if (!correctPw) {
                    throw new AuthenticationError('Incorrect crendentials');
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
    },
};

module.exports = resolvers;