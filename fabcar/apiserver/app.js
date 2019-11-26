var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var taskList = [];
app.get('/list', function(req,res){
  res.send(taskList);
});
app.post('/task', function(req,res){
  taskList.push(req.body.task);
  res.send(taskList);
});
app.put('/task/:task_index', function(req,res){
  var taskIndex = req.params.task_index;
  taskList[taskIndex] = req.body.task;
  res.send(taskList);
});
app.listen(8080);