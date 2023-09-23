require('dotenv').config();

const mongoose = require('mongoose');

const {MONGODB_URI} = process.env;

mongoose.set("strictQuery", false);

async function connectToDatabase() {
  await mongoose.connect(MONGODB_URI, {
    dbName: 'pandemic'
  });
  console.log("Connected to the Database.");
}

module.exports = connectToDatabase;