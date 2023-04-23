const express = require('express');
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');
const forecastRoutes = require('./routes/forecast-routes');

const HttpError = require('./models/http-error')

app.use('/api/forecasts', forecastRoutes); // => /api/places/...

//All other routes
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    next(error);

});

//Send back any errors
app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error ocurred.'});
})

mongoose
    .connect('mongodb+srv://patrick:<password>@cluster0.on3jv4w.mongodb.net/doom_forecasts?retryWrites=true&w=majority')
    .then(app.listen(5000))
    .catch(err =>{
        console.log(err);
    });
