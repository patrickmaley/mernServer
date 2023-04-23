const express = require('express');

const router = express.Router();
const forecastController = require('../controllers/forecast-controllers');

router.get('/:_id',forecastController.getForecastById);
router.get('/user/:uid', forecastController.getUserById );
router.post('/', forecastController.createForecast);
//router.patch('/:pid', forecastController.updateForecast());
//router.delete('/:pid',forecastController.deleteForecast())
module.exports = router;