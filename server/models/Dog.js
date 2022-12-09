const { Schema } = require('mongoose');
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
            type: Array,
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
            type: Array,
        },
        petParent: [User.schema]
    }
)

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;