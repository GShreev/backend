// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const dotenv = require('dotenv').config();

// Create a new instance of the express server
const app = express();

// Configure the bodyParser middleware to handle JSON data
app.use(bodyParser.json());

// for tme beign allowed all origin for development. this needs to be changed to specific.
app.use(cors({origin: '*'}));

// Define the routes
const userRoutes = require('./routes/userRoutes.js');
const referralRoutes = require('./routes/referralRoutes.js');

app.use('/users', userRoutes);
app.use('/referrals', referralRoutes);




mongoose.connect(process.env.MONGO_URL).then(result => {
  app.listen(3001, function () {
   console.log('The SERVER HAS STARTED ON PORT: 3001');
 })
   //Fix the Error EADDRINUSE
   .on("error", function (err) {
     process.once("SIGUSR2", function () {
       process.kill(process.pid, "SIGUSR2");
     });
     process.on("SIGINT", function () {
       // this is only called on ctrl+c, not restar
       process.kill(process.pid, "SIGINT");
     });
   });
}).catch(err => {
 console.log(err);
})