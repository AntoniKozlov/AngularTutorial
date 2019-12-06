var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");

var db = mongo.connect("mongodb+srv://BackTOH:qwe123@antoni-umfug.mongodb.net/test?retryWrites=true&w=majority", function(err, response){
  if(err){ console.log( err); }
  else{ console.log('Connected to ' + db, ' + ', response); }
});


var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.status(200).json({});
  } else {
    next();
  }
 // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 // res.setHeader('Access-Control-Allow-Credentials', true);
  //next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({
  //id: { type: Number   },
  name: { type: String   },
  level: { type: Number   },
  age: { type: Number   },
  cls: { type: String   },
  power: { type: Number   },
},{ versionKey: false });


var model = mongo.model('allHeroes', UsersSchema, 'allHeroes');

app.post("/api/SaveUser",function(req,res){
  var mod = new model(req.body);
    mod.save(function(err,data){
      if(err){
        res.send(err);
      }
      else{
        mod['id']=data._id;
        console.log(data);
        console.log(mod);
        res.send({data:"Record has been Inserted..!!", mod});
      }
    });
});

app.put("/api/updateUser/:id",function(req,res){
    model.findByIdAndUpdate({_id: req.params.id}, { //id: req.body.id,
        name: req.body.name, level: req.body.level, age: req.body.age, cls: req.body.cls, power: req.body.power},
      function(err,data) {
        if (err) {
          res.send(err);
        }
        else{
          res.send({data:"Record has been Updated..!!"});
        }
      });
});

app.delete("/api/deleteUser/:id",function(req,res){
  //var mod = new model(req.body);
  model.findOneAndDelete({ _id: req.params.id }, function(err) {
    if(err){
      res.send(err);
    }
    else{
      //mod['id']=data._id;
      res.send({data:"Record has been Deleted..!!"});
    }
  });
});



app.get("/api/getUser",function(req,res){
  model.find({},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
});

app.get("/api/getUser/:id",function(req,res){
  model.findById({_id: req.params.id},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
});

app.listen(8080, function () {

  console.log('Example app listening on port 8080!')
});
/*
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

MongoClient.connect(db.url, (err, database) => {
  //console.log(database);
  //const myAwesomeDB = database.db('myDatabaseNameAsAString');
  // myAwesomeDB.collection('notes');
  if (err) return console.log(err);
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});*/
