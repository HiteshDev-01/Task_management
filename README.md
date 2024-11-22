## To-Do List Application

Overview
The To-Do List Application is a simple task management tool that allows users to create, manage, and track their tasks. It includes features like task creation, editing, marking tasks as completed, and deleting tasks. The application ensures data persistence using a database and includes validation to enhance the user experience.

## Features

Task Management:
Create tasks with a title and description and other details.
View a list of all tasks.
Mark tasks as completed.
Edit task details.
Delete tasks.

## Installation

1. Clone the repository
   git clone https://github.com/HiteshDev-01/Task_management.git

2.Install Dependencies
npm install

3.Run the application
npm run start

## Code structure

/db: Connect to the DB
/models: Contains the database schema for tasks.
/routes: Defines API routes for task management.
/controllers: Contains business logic for handling requests and responses.
server.js: Main application file that sets up the server and middleware.
.env: Configuration file for environment variables like database credentials

## Api Endpoints

tasks/create -> Creating the task.
tasks/edit/:id -> For updating the existing task.
tasks/getTasks -> Get all tasks.
tasks/getTasks/category -> Get tasks on behalf of category.
tasks/delete/:id -> For delete the task.

## Technology used
Node.js(Express.js)
MongoDB