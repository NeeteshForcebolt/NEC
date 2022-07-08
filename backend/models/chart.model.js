const mongoose = require('mongoose');
var chartSchema = new mongoose.Schema({
   
    dates: {
        type: String,
        required: 'Dates can\'t be empty'
    },
    time : String
});

mongoose.model('chart', chartSchema);