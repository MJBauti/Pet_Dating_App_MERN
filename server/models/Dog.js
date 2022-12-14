const mongoose = require('mongoose')
const { Schema } = mongoose;
const User = require('./User');

const dogSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        dogName: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            required: true,
        },
        pictures: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        breed: {
            type: Date,
            required: true,
        },
        birthday: {
            type: String,
            required: true,
        },
        preferences: {
            type: String,
        },
        petParent: [{type: Schema.Types.ObjectId, ref: 'User'}]
    }
)

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;