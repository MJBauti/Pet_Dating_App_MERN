const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    dogName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    // followers: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Follow'
    // }],
    // following: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Follow'
    // }]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// const FollowSchema = new mongoose.Schema({
//   follower: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   following: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// });

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
// const Follow = mongoose.model('Follow', FollowSchema);

module.exports = User;
// module.exports = Follow;