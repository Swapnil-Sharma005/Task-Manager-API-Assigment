const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = express.Router();
const tasksInfo = require('./routes/tasksInfo');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.get('/', (req, res)=>{
    res.status(200).send("Task Manager API");
  });

routes.use('/tasks', tasksInfo);

app.listen(PORT,(error)=>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port " + PORT);
    else
        console.log("Error occurred, server Not start", error);
});


