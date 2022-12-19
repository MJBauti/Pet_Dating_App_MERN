
const db = require('../config/connection');
const User = require('../models/User');
const Post = require('../models/graphQL/Post');


db.once('open', async () => {

  await User.deleteMany();
  await Post.deleteMany();

  await User.create({
    firstName: 'Philip',
    lastName: 'Fry',
    email: 'fry@testmail.com',
    password: 'password12345',
    dogName: "String",
    gender: "String",
    breed: "String",
    birthday: "String",
    
  });

  await User.create({
    firstName: 'John',
    lastName: 'Zoidberg',
    email: 'jzoid@testmail.com',
    password: 'password12345',
    dogName: "String",
    gender: "String",
    breed: "String",
    birthday: "String",
  });

  console.log('users seeded');

  process.exit();
});