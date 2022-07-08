const mongoose = require('mongoose');
const chart = mongoose.model('chart');
const bcrypt = require('bcryptjs');
const checkAuth = require('../middleware/check-auth');
const jwt = require('jsonwebtoken');



var getDateArray = function(start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push((new Date(dt)).toString().substring(0,15)); //save only the Day MMM DD YYYY part
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}


var prepareDateArray = function(dtArr) {
    var arr = new Array();
    for (var i = 0; i < dtArr.length; i++) {
        arr.push((new Date(dtArr[i])).toString().substring(0,15)); //save only the Day MMM DD YYYY part
    }
    return arr;
}

var getWorkingDateArray = function(dates, hoildayDates, workingWeekendDates) {
    
    // remove holidays
    var arr = dates.filter(function(dt){
        return holidaysArray.indexOf(dt) < 0;
    });

    // remove weekend dates that are not working dates
    var result = arr.filter(function(dt){
        if (dt.indexOf("Sat") > -1 || dt.indexOf("Sun") > -1) {
            if (workingWeekendDates.indexOf(dt) > -1) {
                return dt;
            }
        }
        else {
            return dt;
        }
    });
    
    return result;
}
// start and end dates
var startDate = new Date("2022-01-01"); //YYYY-MM-DD
var endDate = new Date(); //YYYY-MM-DD

var officalHolidays = ["2022-01-01","2022-01-14","2022-01-26","2022-03-01","2022-03-18","2022-04-15","2022-05-03","2022-08-11","2022-08-15","2022-10-05","2022-10-24","2022-11-04"]; //YYYY-MM-DD
var workingWeekends = ["2022-10-07"]; //YYYY-MM-DD

var dateArray = getDateArray(startDate, endDate);

var holidaysArray = prepareDateArray(officalHolidays);

var workingWeekendsArray = prepareDateArray(workingWeekends);


var workingDateArray = getWorkingDateArray(dateArray, holidaysArray, workingWeekendsArray);


console.log(workingDateArray);

module.exports.chartData = (req, res, next) => {
    const chartData = new chart({
        time : req.body.time
    })
    chartData.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
}
    )
}
module.exports.chartData = (req, res, next) => {
   chart.find()
   .then(result => {
       console.log(result);
       res.status(200).json({
           calendarData: result
       })
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       })
   })
}
