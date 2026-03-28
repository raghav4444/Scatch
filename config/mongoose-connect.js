const mongoose = require('mongoose');
const config = require("config");

const dbgr = require("debug")("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(()=> {
  dbgr('Connected to MongoDB');
})
.catch((err) => {
  dbgr('Error connecting to MongoDB:', err);
});

module.exports = mongoose.connection;

//to print that message in the terminal, we need to set the environment variable DEBUG to development:mongoose before running the application. This can be done by running the following command in the terminal:
//On Windows:
//set or export DEBUG=development:mongoose or development:* && node app.js
//On Linux or macOS:
//export DEBUG=development:mongoose or development:* && node app.js
//If you want to hide the debug messages, you can set the DEBUG environment variable to an empty string:
//On Windows:
//set or export DEBUG= && node app.js
//On Linux or macOS:
//export DEBUG= && node app.js