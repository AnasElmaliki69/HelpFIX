require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the database connection
const userRoutes = require('./routes/user');
const prestationRoutes = require('./routes/prestation');


const app = express();
app.use(bodyParser.json());
app.use(express.json());



const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));



// Connect to the database
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`APP LISTENING ON http://localhost:${process.env.PORT}/`);
  });
}).catch(err => console.error(err));


//middleware
app.use(express.json());


// routes
app.use('/api/user', userRoutes);
app.use('/api/prestation', prestationRoutes);


app.use(express.static(path.join(__dirname, 'public')));
