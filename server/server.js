const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {path, resolve} = require('path');
const { authMiddleware } = require('./utils/auth');
require('dotenv').config();
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const stripe = require('stripe')(process.env.YOUR_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();


// Serve up static assets
// app.use('/images', express.static(path.join(__dirname, '../client/images')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Stripe 

app.post('/create-checkout-session', async (req, res) => {
  try{
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: 'usd',
            unit_amount: parseInt(req.body.price)*100,
            product_data: {
              name: 'donate'
            },
          },
          
          // price: req.body.price,
          quantity: 1,

        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3001?success=true`,
      cancel_url: `http://localhost:3001?canceled=true`,
    });


    res.redirect(303, session.url);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err);
  };
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);