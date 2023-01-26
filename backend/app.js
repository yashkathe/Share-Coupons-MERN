const express = require('express');
const bodyParser = require('body-parser');

const couponsRoutes = require('./routes/coupons-routes');

const app = express();

app.use('/api/coupons', couponsRoutes);

app.use((error, req, res, next) => {
    if(res.headerSend) {
        // check if response is already sent
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occured" });
});

app.listen(5000);