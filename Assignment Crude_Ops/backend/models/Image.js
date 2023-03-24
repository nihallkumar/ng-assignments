const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    imageName: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('image', imageSchema);