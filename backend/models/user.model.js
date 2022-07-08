const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    birthday:{
        type: String,
        required: 'birthday can\'t be empty'
    },
    fatherName: {
        type: String,
        required: 'fatherName can\'t be empty'
    },
    age:{
        type: String,
        required: 'agecan\'t be empty'
    },
    maritalStatus:{
        type: String,
        required: 'maritalStatus can\'t be empty'
    },
    contactDetails:{
        type: String,
        required: 'contactDetails can\'t be empty'
    },
    userType : String
    // ,
    // saltSecret: String
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
// userSchema.pre('save', function (next) {
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(this.password, salt, (err, hash) => {
//             this.password = hash;
//             this.saltSecret = salt;
//             next();
//         });
//     });
// });

mongoose.model('User', userSchema);