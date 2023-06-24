const tasksRoutes = require('express').Router();
const tasksData = require('../tasksinfo.json');
const validator = require('../helpers/validator');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");

tasksRoutes.use(bodyParser.urlencoded({ extended: false }));
tasksRoutes.use(bodyParser.json());

tasksRoutes.get('/', (req, res) => {
  res.status(200);
  res.send(tasksData);
});

tasksRoutes.get('/:taskId', (req, res) => {
  let tasks = tasksData.tasks;
  let taskIdPassed = req.params.taskId;
  let result = tasks.filter(val => val.taskId == taskIdPassed);

  if (result.length > 0) {
    res.send(result);
    res.status(200);
  } else {
    res.status(400);
    res.send("Not Found the Task by Id " + taskIdPassed);
  }
})

tasksRoutes.post('/', (req, res) => {
  const taskDetails = req.body;
  let writePath = path.join(__dirname, '..', 'tasksinfo.json');
  if (validator.validatetaskInfo(taskDetails, tasksData).status) {
    let taskDataModified = JSON.parse(JSON.stringify(tasksData));
    taskDataModified.tasks.push(taskDetails);
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf8', flag: 'w' });
    res.status(200);
    res.json(validator.validatetaskInfo(taskDetails, tasksData));
  } else {
    res.status(400);
    res.json(validator.validatetaskInfo(taskDetails, tasksData))
  }
});

tasksRoutes.put('/:taskId', (req, res) => {
  let tasks = tasksData.tasks;
  let taskIdPassed = req.params.taskId;
  const newTaskDetails = req.body;
  let task = tasks.filter(val => val.taskId == taskIdPassed);
  if (task.length > 0) {
    res.send(result);
    res.status(200);
  } else {
    res.status(400);
    res.send("Not Found the Task by Id " + taskIdPassed);
  }

  let writePath = path.join(__dirname, '..', 'tasksinfo.json');

  if (validator.validatetaskInfoForUpdate(newTaskDetails, tasksData).status) {
    let taskDataModified = JSON.parse(JSON.stringify(tasksData));
    const taskIndex = tasks.indexOf({ id: taskIdPassed });
    taskDataModified.tasks.splice(taskIndex, 1, newTaskDetails);
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf8', flag: 'w' });
    res.status(200);
    res.json(validator.validatetaskInfoForUpdate(newTaskDetails, tasksData));
  } else {
    res.status(400);
    res.json(validator.validatetaskInfoForUpdate(newTaskDetails, tasksData))
  }

})

tasksRoutes.delete('/:taskId', (req, res) => {
  let tasks = tasksData.tasks;
  let taskIdPassed = req.params.taskId;
  let taskDetails = tasks.filter(val => val.taskId == taskIdPassed);

  let writePath = path.join(__dirname, '..', 'tasksinfo.json');

  if (taskDetails.length > 0) {
    const taskIndex = tasks.indexOf({ id: taskIdPassed });
    let taskDataModified = JSON.parse(JSON.stringify(tasksData));
    taskDataModified.tasks.splice(taskIndex, 1);
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), { encoding: 'utf8', flag: 'w' });
    res.status(200);
    res.send("Task " + taskIdPassed + " is sucessfully deleted.");
  } else {
    res.status(400);
    res.send("No task found by Id " + taskIdPassed + " to delete.")
  }
});



module.exports = tasksRoutes;

