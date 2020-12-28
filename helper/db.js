const mongoose = require('mongoose');

module.exports = (URL) => {
    mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB Connection error:', err);
    });
}