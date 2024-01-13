const express = require('express');
const port = process.env.PORT || 8000;
const app = express();
require('dotenv').config()
const connectDB = require('./dbConn');
const mongoose = require('mongoose');
const Bonus = require('./Model/bonus');
const User = require('./Model/users');
const cookieParser = require('cookie-parser');
// const secret = 'mysecretsshhh';
// const jwt = require('jsonwebtoken');
// const withAuth = require('./middleware')
var bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
let build = 'build';
console.log(path.join(__dirname, '..',build))


//MIDDLEWARES...
app.use(express.static(path.join(__dirname, '..',build)));
app.use(cors({origin: true, credentials: true}));
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.set('strictQuery', true);
//Connect to MongoDB...
connectDB();
mongoose.connection.once("open",()=>{
    console.log("Connected to MongoDB");
    app.listen(port,()=>{console.log("Server Running on Port " + port +"...")});
})
app.get('/',function(req,res){
    res.send('Haee')
})
//Create HR account ...
// app.post('/register', (req, res) => {
//   var myData = new User(req.body);
// myData.save()
// .then(item => {
// console.log("item saved to database");
// return res.status(200).json({
//   success:true,
//   msg:"Successfully signed Up"
// })

// })
// .catch(err => {
// console.log("unable to save to database");
// return res.status(500).json({
//   success:false,
//   msg:'Error while signing Up .Try again later'
// })

// });

// });

// // //Authenticate HR...
// app.post('/login', function(req, res) {
//   const { username, password } = req.body;

//   User.findOne({ username }, function(err, user) {
//     if (err) {
//       console.error(err);
//       console.log('Internal error please try again')
//      return res.status(500)
//         .json({
//           success: false,
//           msg: 'Internal error please try again'
//       });
//     } else if (!user) {
//       console.log("Incorrect email or password")

//      return res.status(401)
//         .json({
//           success: false,
//           msg: 'Incorrect email or password'
//         });
//     } else {
//       user.isCorrectPassword(password, function(err, same) {
//         if (err) {
//           console.log("Internal err please try again")

//          return  res.status(500)
//             .json({
//               success: false,
//               msg: 'Internal error please try again'
//           });
//         } else if (!same) {
//           console.log("Incorrect email or password")
//          return res.status(401)
//             .json({
//               success: false,
//               msg: 'Incorrect email or password'
//           });
//         } else {
//           // Issue token
//           const payload = { username };
//           const token = jwt.sign(payload, secret, {
//             expiresIn: '1h'
//           });
//           console.log("success")
//           res.cookie('token', token, { httpOnly: true })
//          return res.status(200).json({
//             success: true,
//             msg: 'success',
//           })
//         }
//       });
//     }
//   });
// });


// app.get('/secret', withAuth, function(req, res) {
//   res.send('The password is potato');
// });

// app.get('/checkToken', withAuth, function(req, res) {
//   return res.statusCode(200).json({
//     success:true,
//     msg:"success"
//   });
// });

//Post an employee
app.post('/add', (req, res) => {
  // console.log(req.body)
    var myData = new Bonus(req.body);
 myData.save()
 .then(item => {
  console.log("person saved to database");
  return res.status(200).json({
    success:true,
    msg:"Successfully saved to database"
  })

 })
 .catch(err => {
  console.log("unable to save to database");
  return res.status(500).json({
    success:false,
    msg:'Error while signing Up .Try again later'
  })

 });

});

//get employees
app.get('/employees', (req, res)=>{
let employees = Bonus.find({},function(err,product){
    if (err){
        console.log(err)
    } else {
      console.log(product)
     return    res.json(product)
    }
})
});

//Delete an employee
app.get('/employees/:id',async (req, res) => {
  console.log('hae')
try{
  await Bonus.deleteOne({_id:req.params.id})
  res.json({msg:'User Deleted Successfully',success:true})
}catch(error){
  res.status(500).json({msg:"Something wrong happened,try deleting later",success:false})
}
});

