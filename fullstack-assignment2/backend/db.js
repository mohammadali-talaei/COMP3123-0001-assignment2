const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;


const db = async () => {
  try {
    const con = await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = db;
