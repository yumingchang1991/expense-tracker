# Expense Tracker (記帳本)
## Features
1. ...

<br><br><br>

## Technology
Runtime: `node@16.13.0` <br>
Framework: `express@4.18.1` <br>
Database: `mongoose@6.3.3` <br>
View Engine: `express-handlebars@6.0.5` <br>
Please check out package.json for more dependecies
<br><br><br>

## Routing
```
GET     /                         read a page rendering all restaurants associated with current user

GET     /users/register           render a page for user to register as member
POST    /users/register           register user input as member
GET     /users/login              render a page for user to input credential to login
POST    /users/login              authenticate user crendential
GET     /users/logout             log current user out
GET     /users/edit               edit current user profile
PUT     /users/edit               modify user profile in database
DELETE  /users/:id                remove current user from database

POST    /records                  create new record in MongoDB associated with current user
GET     /records/new              read a page rendering a form to create a record
GET     /records/:id              read a page rendering a specific record
GET     /records/:id/edit         read a page rendering a form to edit an existing record
PUT     /records/:id              modify an existing record based on form input
DELETE  /records/:id              remove a specific record from MongoDB
DELETE  /records/                 remove all records associated with current user from MongoDB

```
<br><br><br>

## Instructions
#### step1: Clone a local copy by
`git clone https://github.com/yumingchang1991/alpha-camp-restaurants`
<br><br>

#### step2: Change Directory to the copy
`cd alpha-camp-restaurants`
<br><br>

#### step3: Install dependencies
Type in command line below to automatically install dependencies listed in package.json <br>
`npm i` <br>

**NOTE**
- Font awesome & Bootstrap are linked through CDN. no actions from you, YAY!
<br><br>

#### step4: add environment variable to connect to your MongoDB
- rename file from `.env.example` to `.env`
- input necessary value in `.env`
<br><br>

#### step5: **Seed Your Database** by `npm run seed`, this will add 2 dummy users with 3 restaurants for each to MongoDB
<br><br>

#### step6: **Run Application** by `npm run dev`, this will open localhost for you automatically
<br><br>
