const mongoose = require('mongoose');
const User = mongoose.model('User');
const calendar = mongoose.model('calendar');
const bcrypt = require('bcryptjs');
const checkAuth = require('../middleware/check-auth');
const jwt = require('jsonwebtoken');
// module.exports.register = (req, res, next) => {
//     var user = new User();
//     user.fullName = req.body.fullName;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     user.save((err, doc) => {
//         if (!err)
//             res.send(doc);
//         else {
//             if (err.code == 11000)
//                 res.status(422).send(['Duplicate email adrress found.']);
//             else
//                 return next(err);
//         }

//     });
// }

module.exports.login = (req, res, next) => {
    console.log(req.body);
    User.find({email : req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json(
                    {
                        msg: "user not exist"
                    })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json(
                        {
                            msg: 'pass maching fail'
                        })
                }
                if (result) {
                    const token = jwt.sign({
                        fullName: user[0].fullName,
                        email: user[0].email,
                        password: user[0].password,
                        userType: user[0].userType,
                    },
                        'this is dummy text',
                        {
                            expiresIn: "1h"
                        }
                    );
                    res.status(200).json({
                        id:user[0].id,
                        fullName: user[0].fullName,
                        email: user[0].email,
                        // password: user[0].password,
                        userType: user[0].userType,
                        token: token
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

};


module.exports.data = (req, res, next) => {
    User.find()
        .then(result => {
            console.log(result);
            res.status(200).json({
                studentData: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}


module.exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const user = new User({
                _id : new mongoose.Types.ObjectId,
                fullName: req.body.fullName,
                password: hash,
                email: req.body.email,
                userType : req.body.userType,
                birthday:req.body.birthday,
                fatherName:req.body.fatherName,
                age:req.body.age,
                maritalStatus:req.body.maritalStatus,
                contactDetails:req.body.contactDetails,
                userType : req.body.userType
            })

            user.save((err, doc) => {
                if (!err)
                    res.send(doc);
                else {
                    if (err.code == 11000)
                        res.status(422).send(['Duplicate email adrress found.']);
                    else
                        return next(err);
                }

            });
        }
    })
}



// module.exports.deleteAPI = (req, res,next) => {
 
//       const user = User.findById(req.params.id);
//       console.log("User value",user);
//       const response =user.remove(user._id);
   
   
 
//     }

module.exports.deleteAPI=((req, res,next)=>{
        var id = req.body._id || ''
        if(id=='') 
        assert.fail('id is a required field')
      
      User.deleteOne(
            {"id": id }, 
            (err, result)=>{
            if(err==null)
            res.status(200).send('User Deleted')
          })
        })   
        

module.exports.updateApi=((req,res,next)=>{
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
})
module.exports.dataName  = ((req,res,next)=>{
    var name = req.body.fullName
      User.findOne({"fullName": name })
      .then(result => {
        console.log(result);
        res.status(200).json({
            userProfile: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})