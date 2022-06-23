# Expense Tracker (記帳本)
Expense tracker is an online tool to track our expenses with user system in place.
<br><br><br>

## Features
1. Create a web server under **Express framework**
2. Design backend route based on **RESTful** principle
3. Implement user authentication using **Passport.js** with `bcrypt` to improve security
4. Deliver user interface by **server-side rendering** with `handlebars` (previously called `mustache`)
5. Perform CRUD actions via **Mongoose**
6. Write **promised-based** & **async/await** program to ensure smooth asynchronous calls
7. Deploy solution to **Heroku**
<br><br><br>

## Technology
Runtime: `node@16.13.0` <br>
Framework: `express@4.18.1` <br>
Database ODM: `mongoose@6.3.3` <br>
View Engine: `express-handlebars@6.0.5` <br>
Please check out package.json for more dependecies
<br><br><br>

## Routing
```
GET     /                         read a page rendering all restaurants associated with current user

GET     /users/register           render a page for user to register as member
POST    /users                    register user input as member
GET     /users/login              render a page for user to input credential to login
POST    /users/login              authenticate user crendential
GET     /users/:id/logout         log current user out
GET     /users/:id/edit           edit user profile
PUT     /users/:id                modify user profile in database

POST    /records                  create new record in MongoDB associated with current user
GET     /records/new              read a page rendering a form to create a record
GET     /records/:id/edit         read a page rendering a form to edit an existing record
PUT     /records/:id              modify an existing record based on form input
DELETE  /records/:id              remove a specific record from MongoDB

```
<br><br><br>

## Instructions
#### step1: Clone a local copy by
`git clone https://github.com/yumingchang1991/expense-tracker`
<br><br>

#### step2: Change Directory to the copy
`cd expense-tracker`
<br><br>

#### step3: Install dependencies
`npm i`
<br><br>

#### step4: add environment variable to connect to your MongoDB
- rename file from `.env.example` to `.env`
- input necessary value in `.env`
<br><br>

#### step5: **Seed Your Database** by `npm run seed`, this will add 2 dummy users with 4 expense records for each
<br><br>

#### step6: **Run Application** by `npm run dev`, this will open localhost for you automatically
<br><br>
