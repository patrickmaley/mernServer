const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forecastSchema = new Schema({
    name: String,
    security: String,
    security_abbr: String,
    forecast: Number,
    forecast_length: Number,
    forecast_type: String,
    bullish: Boolean,
    forecast_date: Date,
    prediction_date: Date
});

module.exports = mongoose.model('Forecast', forecastSchema);