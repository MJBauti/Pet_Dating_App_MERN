const db = require('../config/connection');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');
const Dog = require('../models/Dog');


db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Gifts' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Chuckit!',
      description:
        'Ultra Rubber Ball Tough Dog Toy.',
      image: 'chuckit-ball.png',
      category: categories[0]._id,
      price: 4.99,
      quantity: 300
    },
    {
      name: 'Nylabone',
      description:
        'Strong Chew Stick Maple Bacon Flavored Dog Chew Toy.',
      image: 'nylabone.png',
      category: categories[0]._id,
      price: 15.99,
      quantity: 100
    },
    {
      name: 'Kong Balls',
      category: categories[0]._id,
      description:
        'SqueakAir Balls Packs Dog Toy, Medium, 6 count.',
      image: 'kong-ball.png',
      price: 10.99,
      quantity: 200
    },
    {
      name: 'Kong Toy',
      category: categories[0]._id,
      description:
        'Classic Dog Toy.',
      image: 'kong-toy.png',
      price: 11.99,
      quantity: 50
    },
    {
      name: 'Frisco Plush',
      category: categories[0]._id,
      description:
        'Plush with Inside Rope Squeaking Cow Dog Toy.',
      image: 'cow-plush.png',
      price: 7.99,
      quantity: 100
    },
    {
      name: 'Chuckit! Launcher',
      category: categories[0]._id,
      description:
        'Classic Launcher Dog Toy, Color Varies, Original.',
      image: 'chuckit-launch.png',
      price: 9.99,
      quantity: 60
    },
    {
      name: 'Kong Bear',
      category: categories[0]._id,
      description:
        'Wild Knots Bear Dog Toy.',
      image: 'kong-bear.png',
      price: 19.99,
      quantity: 50
    },
    {
      name: 'Bones & Chews Toy',
      category: categories[0]._id,
      description:
        'Rope Whale Crinkle with Bone Dog Toy, 12".',
      image: 'rope-whale.png',
      price: 8.99,
      quantity: 100
    },
    {
      name: 'American Journey Dog Treats',
      category: categories[0]._id,
      description: 'Peanut Butter Recipe Grain-Free Oven Baked Crunchy Biscuit Dog Treats.',
      image: 'american-treat.png',
      price: 4.99,
      quantity: 100
    },
    {
      name: 'Pup-Peroni Treats',
      category: categories[0]._id,
      description:
        'Pup-Peroni Original Beef Flavor Dog Treats.',
      image: 'pupperoni.png',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Milk Bone Treats',
      category: categories[0]._id,
      description:
        'Milk-Bone Original Small Biscuit Dog Treats.',
      image: 'milkbone1.png',
      price: 3.99,
      quantity: 100
    },
    {
      name: 'PetSafe Dog Leash',
      category: categories[0]._id,
      description:
        'PetSafe Premier Nylon Dog Leash.',
      image: 'petsafe-leash.png',
      price: 7.99,
      quantity: 600
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Philip',
    lastName: 'Fry',
    email: 'fry@testmail.com',
    password: 'password12345',
    
  });

  await User.create({
    firstName: 'John',
    lastName: 'Zoidberg',
    email: 'jzoid@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  await Dog.deleteMany();

  // await Dog.create({
  //   userId: '1',
  //   dogName: 'Princess Leia',
  //   profilePicture: 'leia-snow.jpg',
  //   pictures: 'leia-snow.jpg',
  //   gender: 'Girl',
  //   breed: 'Golden Retriever',
  //   birthday: '05/07/2017',
  //   preferences: ['must be fixed', 'not aggressive', 'has all shots'],
  //   petParent: [User.user.name]
  // });

  console.log('Dogs seeded');
  
  process.exit();
});