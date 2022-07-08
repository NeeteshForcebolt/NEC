const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ctrlUser = require('../controllers/user.controller');
const ctrlCalendar = require('../controllers/calendar.controller');
const ctrlChart = require('../controllers/chart.controller');
const jwt = require('jsonwebtoken');
router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.login);
router.get('/data',checkAuth, ctrlUser.data);
router.post('/calendarData', ctrlCalendar.calendarData);
router.get('/calendarData', ctrlCalendar.calendarData);
router.post('/chartData', ctrlChart.chartData);
router.get('/chartData', ctrlChart.chartData);
router.delete('/deleteAPI', ctrlUser.deleteAPI);
router.patch('/updateApi/:id',ctrlUser.updateApi);
router.post('/dataName',ctrlUser.dataName);
module.exports = router;



