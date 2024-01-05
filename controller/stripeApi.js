const stripe = require('stripe')(process.env.Secret_key)

const stripePaymentApi = async(req,res) => {
    const { purchase, total_amount, shipping_fee } = req.body;
    // console.log(req.body);

    const calculateOrderAmount = () => {
        return total_amount + shipping_fee
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
        description: 'Software development services',
        shipping: {
            name: 'Jenny Rosen',
            address: {
              line1: '510 Townsend St',
              postal_code: '98140',
              city: 'San Francisco',
              state: 'CA',
              country: 'US',
            },
        },
        payment_method_types: ['card'],
    });
    // console.log(paymentIntent);
    res.json({clientSecret: paymentIntent.client_secret})
    // res.send('stripe route');
}

module.exports = stripePaymentApi;