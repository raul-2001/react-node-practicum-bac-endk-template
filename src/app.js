const express = require('express');
const app = express();
const cors = require('cors')
// const favicon = require('express-favicon');
const logger = require('morgan');


const authRouter = require("./routes/auth.js");
const mainRouter = require('./routes/mainRouter.js');
const carRouter = require('./routes/cars.js')
const hotelRouter = require('./routes/hotels.js')
const destinationRouter = require("./routes/destinationRouter.js");
const roomRouter = require('./routes/room.js')
const bookingRouter = require('./routes/booking.js')
const errorHandlerMiddleware = require("./middleware/error-handler.js");



// middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static('public'))
// app.use(favicon(__dirname + '/public/favicon.ico'));
const AuthenticateUser = require("./middleware/authentication.js");

// //Testing the server
// app.get('/', (req, res) => {
//     res.send('<h1>I am testing my server now')
// })


// routes
app.use('/api/v1', mainRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/destinations", AuthenticateUser, destinationRouter);
app.use('/api/v1/hotels', AuthenticateUser, hotelRouter)
app.use('/api/v1/rooms', AuthenticateUser, roomRouter)
app.use('/api/v1/booking', AuthenticateUser, bookingRouter)


app.use(errorHandlerMiddleware)

module.exports = app;