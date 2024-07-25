//connection to database
// require("dotenv").config();
const mongoose = require("mongoose");

// mongoose connects this way: 
function connectDb() {
const dbURI = 'mongodb://localhost:27017/SocialDB';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));
}
// export the connection
module.exports = connectDb;
// module.exports = connection;