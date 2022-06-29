const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./config/config').get(process.env.NODE_ENV);
const User = require('./models/user');
const {auth} =require('./middlewares/auth');
var path = require('path');
var cors = require('cors');
var globSync = require('glob').sync;

const app=express();
app.use(cors('*'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  // res.header("Access-Control-Allow-Origin", "http://localhost:8100");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app use
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.DATABASE,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err) console.log(err);
    else console.log("database is connected");
});

// app.get('/',function(req,res){
//     res.status(200).send(`Welcome to login , sign-up api`);
// });

var allRoutes = globSync('./routes/**/*', {
    cwd: __dirname
  }).map(require);

  allRoutes.forEach(function (routes) {
    app.use('/api', routes);
  });

// app.use('/', routes);

// listening port
const PORT=process.env.PORT||3100;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});