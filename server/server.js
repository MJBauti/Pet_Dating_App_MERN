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


// app.use(express.static(process.env.STATIC_DIR));
// app.use((req, res, next) => {
//   if (req.originalUrl === '/webhook') {
//     next();
//   } else {
//     bodyParser.json()(req, res, next);
//   }
// });

// app.get('/', (req, res) => {
//   const path = resolve(process.env.STATIC_DIR + '../client/build/index.html');
//   res.sendFile(path);
// });

// app.get('/config', (req, res) => {
//   res.send({
//     publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
//   });
// });

// app.get('/create-payment-intent', async (req, res) => {
//   const total = req.body.amount
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       currency: 'USD',
//       amount: total,
//       automatic_payment_methods: { enabled: true }
//     });
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (e) {
//     return res.status(400).send({
//       error: {
//         message: e.message,
//       },
//     });
//   }
// });

// app.post('/webhook', async (req, res) => {
//   let data, eventType;

//   if (process.env.STRIPE_WEBHOOK_SECRET) {
//     let event;
//     let signature = req.headers['stripe-signature'];
//     try {
//       event = stripe.webhooks.constructEvent(
//         req.rawBody,
//         signature,
//         webhookSecret
//       );
//     } catch (err) {
//       console.log(`⚠️  Webhook signature verification failed.`);
//       return res.sendStatus(400);
//     }
//     data = event.data;
//     eventType = event.type;
//   } else {
//     data = req.body.data;
//     eventType = req.body.type;
//   }

//   if (eventType === 'payment_intent.succeeded') {
//     console.log('💰 Payment captured!');
//   } else if (eventType === 'payment_intent.payment_failed') {
//     console.log('❌ Payment failed.');
//   }
//   res.sendStatus(200);
// });


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