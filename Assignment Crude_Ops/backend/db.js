const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/crude-operations';

const connectToMongo = (error) => {
    if (error)
        console.log(error)
    else {
        mongoose.connect(mongoURI);
        console.log('Connected to database successfully')
    }
}

module.exports = connectToMongo;