const Pool = require('pg').Pool
const dotenv = require('dotenv');
dotenv.config();
//db connection
const pool = new Pool({
  user: process.env.dbUser,
  host: process.env.dbHost,
  database: process.env.dbName,
  password: process.env.dbPassword,
  port: process.env.dbPort,
})
//get task list
const getTasks = (request, response) => {
    pool.query('SELECT * FROM imperial_tasks ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  //get individual task
  const getTaskById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM imperial_tasks WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
   //get individual task by title
   const getTaskByTitle = (title) => {
   
    pool.query('SELECT * FROM imperial_tasks WHERE title = $1', [title], (error, results) => {
      if (error) {
        throw error
      }
      results.rows;
    })
  }
  //create task
  const createTask = (request, response) => {
    const { title, description, status } = request.body
    //check if the title already exist in the db
    pool.query('SELECT * FROM imperial_tasks WHERE title = $1', [title], (error, results) => {
      if (error) {
        throw error
      }
     const checkTitleExists =  results.rows;
     if(checkTitleExists.length == 0){
      //if does not exist insert the new task
      pool.query('INSERT INTO imperial_tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *', [title, description, status], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`Task added with ID: ${results.rows[0].id}`)
      })
    }else{
      //if exists return the id
      response.status(200).send(`Task already exist with ID: ${checkTitleExists[0].id}`)
    }
    })
  
  }
  //update task by id
  const updateTask = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, description, status } = request.body
  
    pool.query(
      'UPDATE imperial_tasks SET title = $1, description = $2, status = $3 WHERE id = $4',
      [title, description,status,id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Task modified with ID: ${id}`)
      }
    )
  }
  //delete task by id
  const deleteTask = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM imperial_tasks WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Task deleted with ID: ${id}`)
    })
  }
//export the function
module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
  }
  
