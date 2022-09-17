# nodejs-postgres

Task: Develop a backend API Service using NodeJS (or any other framework you are
comfortable with). It should use PostgreSQL as a data store. You need to develop all
the necessary APIs to enable the UI to perform all the CRUD operations.

# Overview

This is a backend app and it runs on nodejs with postgres as db. This app can be run on a docker container.
# Installation

Assuming Docker is already installed, git clone the app from the git repo git@github.com:brittaj/nodejs-postgres.git.

For running in development mode, use the same .env & docker-compose.yml file provided. This can be changed for production environment.

Run the following commands:

 1. docker-compose build
 2. docker-compose up
  
Once all the containers are up and running access the API endpoits as below:

# Check the status of the app
  http://0.0.0.0:3020/
  
 # [POST] Create Task
  http://0.0.0.0:3020/tasks
  
  Sample JSON : {
                  "title":"Test-01",
                  "description":"Hello this is a test-01",
                  "status":"Not Completed"
                 }

# [GET] List all Tasks
  http://0.0.0.0:3020/tasks
  
# [PUT] Update Task
  http://0.0.0.0:3020/tasks/:id
 
 Sample JSON : {
                  "title":"Test-01",
                  "description":"Hello this is a test-01",
                  "status":"Completed"
                 }
# [GET] Task By Id
  http://0.0.0.0:3020/tasks/:id

# [DELETE] Delete Task By Id
  http://0.0.0.0:3020/tasks/:id
  
  Alternatively, if in case the docker set upp didn't work, you can still run it manually in your local. Follow the below steps:
  
  1. Assuming nodejs and postgres is installed locally, git clone the project from the repository.
  2. Navigate to the root directory of the app and run the below commands:
     1. npm install
     2. npm run pm2
  
