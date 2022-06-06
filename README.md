# EZ{Tracker}


## Summary
EZ{Tracker} is an application that lets the user view and manage a companies database. the application is used in the command line and present the user with a menu from which they can choose what they wish to see and/or change about the database.

## Technologies
* JavaScript - 100%

## Code Breakdown
The Application uses the "companydb" database that is made up of 3 tables, the "departments" table, the "Roles" table and the "employees" table. Each table has an id column that generates unique ids for each row added to the tables. These tables are made using the "schema.sql" file and are populated using the "seeds.sql" file and can be edited and viewed using the application. "schema.js" deletes any tables in the db that have matching names with the tables it creates. The connection to mysql is made with "connection.js", this file is then exported to the app file using module.exports. The "app.js" file holds all of the functions that the app uses, it's made up of many functions that call inquirer, to let the user choose what they want to do, but also db.query's, which communicates with mysql to get and change the data from the database. Many of the inquirer prompts have multiple choices and use switch statements to choose what function is triggered depending on the choice the user picks.

##  Walkthrough Video
https://drive.google.com/file/d/1wJ8SORP7NxQC2ytfe_-hvepQxZ77MNMo/view