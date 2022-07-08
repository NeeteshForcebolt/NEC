const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

var calendarSchema = new mongoose.Schema({
   
    weekend: {
        type: String,
        required: 'Full name can\'t be empty'
    },
 
    weekendType : String
});

mongoose.model('calendar', calendarSchema);