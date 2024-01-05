require('dotenv').config();
require('express-async-errors');

const express = require('express');
const server = express();

// stripeApi controller
const stripePaymentService = require('./controller/stripeApi');

// error handler middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

server.use(express.json());

// static file hoisting
server.use(express.static('./public'));

// stripe home route
server.get('/', (req,res) => {
    res.send('<h2>Using Stripe Payment Service</h2>')
})

// stripe payment route
server.post('/stripe-payment', stripePaymentService);

server.use(notFoundMiddleware);
server.use(errorHandlerMiddleware);

const portNo = process.env.PORT || 7373;

const start = async () => {
    try {
        server.listen(portNo, () => {
            console.log(`Server is listening on port: ${portNo}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
