require('dotenv').config()

const config = {
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  connectString: process.env.HOST,
};

module.exports = config;