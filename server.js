//start express app
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
//connect to connection.js
const connection = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

connection();

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`))
