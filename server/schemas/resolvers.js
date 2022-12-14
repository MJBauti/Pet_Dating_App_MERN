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
        dog: async (parent, { _id }, context) => {
            return await Dog.findById(_id).populate('dog');
        },
        categories: async () => {
            return await Category.find();
        },
        products: async (parent, { category, name }) => {
            const params = {};
      
            if (category) {
              params.category = category;
            }
      
            if (name) {
              params.name = {
                $regex: name
              };
            }
      
            return await Product.find(params).populate('category');
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id).populate('category');
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];
      
            const { products } = await order.populate('products');
      
            for (let i = 0; i < products.length; i++) {
              const product = await stripe.products.create({
                name: products[i].name,
                description: products[i].description,
                images: [`${url}/images/${products[i].image}`]
              });
      
              const price = await stripe.prices.create({
                product: product.id,
                unit_amount: products[i].price * 100,
                currency: 'usd',
              });
      
              line_items.push({
                price: price.id,
                quantity: 1
              });
            }
      
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`
            });
      
            return { session: session.id };
        }
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
        addDog : async (parent, args) => {
            try {
                const dog = await Dog.create(args);
                return dog;
            } catch (err) {
                console.log('Something went wrong. Could not add dog', err)
            }
        },
        addOrder: async (parent, { products }, context) => {
            console.log(context);
            if (context.user) {
              const order = new Order({ products });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      
              return order;
            }
      
            throw new AuthenticationError('Not logged in');
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw new AuthenticationError('Not logged in');
        },
        updateDog: async (parent, { _id, dogName, profilePicture, pictures, gender, breed, birthday, preferences }, context) => {
            return await Dog.findByIdAndUpdate(_id, {dogName, profilePicture, pictures, gender, breed, birthday, preferences}, {new: true});
        },
        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
      
            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },     
    },
};

module.exports = resolvers;