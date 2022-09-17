const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db/queries')
const dotenv = require('dotenv');
dotenv.config();

//define port
const PORT = (process.env.NODE_ENV == "production")?(process.env.PROD_PORT || 3030):(process.env.DEV_PORT || 3020);

//define host
const HOST = process.env.HOST || '0.0.0.0';

//handle the incoming requests
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//inital index to verify the status od the app
app.get('/', (request, response) => {
  response.json({ info: 'App is up and running on Node.js, Express, and Postgres' })
})

//get the list of tasks
app.get('/tasks', db.getTasks)
//get the indvidual task
app.get('/tasks/:id', db.getTaskById)
//create new tasks
app.post('/tasks', db.createTask)
//update individual task
app.put('/tasks/:id', db.updateTask)
//delete task
app.delete('/tasks/:id', db.deleteTask)

//any other service
app.get('*',(req,res)=>{
  res.json({ info: 'Requested service not found!' })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
  console.log(`Running on http://${HOST}:${PORT} in ${process.env.NODE_ENV}`);
})