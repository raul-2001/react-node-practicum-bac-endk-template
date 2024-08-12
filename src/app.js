const express = require('express');
const app = express();
const cors = require('cors')
const favicon = require('express-favicon');
const logger = require('morgan');
require('dotenv').config();
const connectDB = require('./db/connect')

const mainRouter = require('./routes/mainRouter.js');
const carRouter = require('./routes/cars.js')
const hotelRouter = require('./routes/hotels.js')

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'))
app.use(favicon(__dirname + '/public/favicon.ico'));

// routes
// app.use('/api/v1/auth', authRouter)
app.use('/api/v1/cars', 
    //authhenticateUser, 
    carRouter
)
app.use('/api/v1/hotels', 
    //authhenticateUser, 
    hotelRouter
)

// routes
app.use('/api/v1', mainRouter);


const port = process.env.PORT || 8000


const start = async () => {
    try {
        await connectDB(process.env.MANGO_URI);
        app.listen(port, console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();

module.exports = app;