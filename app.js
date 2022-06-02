const db = require('./db/connection');
const index = require('./utils/index');
const inquirer = require('inquirer');

db.connect(err => {
    if (err) throw err
});

// Welcome message
console.log(`
|============================|
|                            |
|    Welcome to EZ{Tracker}  |  
|                            |
|============================|
`)

const app = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'startUp',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee',
                "Update an employee's manager",
                'View employee by manager',
                'View employee by department',
                'View total salary expenditure'
            ]
        }
    ]).then(choice => {
        switch (choice.startUp) {
            case 'View all departments':
                index.getAllDepartments()
                break;
            case 'View all roles':
                index.getAllRoles()
                break
        }
    })
};

app()

module.exports = {app}