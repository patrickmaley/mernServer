var HttpError = require('../models/http-error');

let DUMMY_FORECASTS = [{
    "_id": "6440bfe403cf09ecec3249cd",
    "name": "Gareth Soloway",
    "uid": 1,
    "security": "gold",
    "security_abbr": "gld",
    "forecast": 2300.0,
    "forecast_length": 0,
    "forecast_type": "days",
    "bullish": true,
    "forecast_date": 2023 - 12 - 31
}]
const Forecast = require('../models/forecast');

const getForecastById = (req, res, next) => {
    const forecastId = req.params._id; //{pid: '6440bfe403cf09ecec3249cd'}
    const forecast = DUMMY_FORECASTS.find(p => {
        return p._id === forecastId;
    })

    if (!forecast) {

        return next(new HttpError("Could not find forecast", 404));
    } else {
        res.json({forecast});
    }

};

const getUserById = (req, res, next) => {
    const userId = req.params.uid;
    const user = DUMMY_FORECASTS.find(p => {
        return p.uid === parseInt(userId);
    })
    if (!user) {

        return next(new HttpError("Could not find user", 404));
    } else {
        res.json({forecast});
    }
    res.json({user});
}

const createForecast = async (req, res, next) => {
    const {
        name,
        security,
        security_abbr,
        forecast,
        forecast_length,
        forecast_type,
        bullish,
        forecast_date,
        prediction_date
    } = req.body;

    const createdForecast = new Forecast({
        name: name,
        security: security,
        security_abbr: security_abbr,
        forecast: forecast,
        forecast_length: forecast_length,
        forecast_type: forecast_type,
        bullish: bullish,
        forecast_date: forecast_date,
        prediction_date: prediction_date
    })

    try {
        await createdForecast.save();
    } catch (e) {
        const error = new HttpError('Creating forecast failed, please try again', 404);
    }

    res.status(201).json({createdForecast});
};

// const updateForecast = (req, res, next) => {
//     const {
//         name,
//         uid,
//         security,
//         security_abbr,
//         forecast,
//         forecast_length,
//         forecast_type,
//         bullish,
//         forecast_date
//     } = req.body;
//
//     const forecastId = req.params.pid;
//     const updatedForecast = {...DUMMY_FORECASTS.find(p => [p._id === forecastId])};
//     const forecastIndex = DUMMY_FORECASTS.findIndex(p => p._id === forecastId);
//     updatedForecast.forecast = forecast;
//
//     DUMMY_FORECASTS[forecastIndex] = updatedForecast;
//     res.status(200).json({forecast: updatedForecast});
//     next();
//
// };

// const deleteForecast = (req, res, next) => {
//     const forecastId = req.params.pid;
//     DUMMY_FORECASTS = DUMMY_FORECASTS.filter(p => p._id !== forecastId);
//     res.status(200).json({message: 'Deleted Forecast'});
// };

exports.getForecastById = getForecastById;
exports.getUserById = getUserById;
exports.createForecast = createForecast;
//exports.updateForecast = updateForecast;
//exports.deleteForecast = deleteForecast;