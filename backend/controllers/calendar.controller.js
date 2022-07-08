const mongoose = require('mongoose');
const calendar = mongoose.model('calendar');
const bcrypt = require('bcryptjs');
const checkAuth = require('../middleware/check-auth');
const jwt = require('jsonwebtoken');




module.exports.calendarData = (req, res, next) => {
    const weekend = new calendar({
        weekend: req.body.weekend,
        weekendType  :req.body.weekendType
    })
    weekend.save((err, doc) => {
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


module.exports.calendarData = (req, res, next) => {
    calendar.inventory.find()
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
