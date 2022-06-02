const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

db.connect(err => {
    if (err) throw err
});

// Welcome message
console.log(`
|============================|
|                            |
|   Welcome to EZ{Tracker}   |  
|                            |
|============================|
`)

const app = function() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'startUp',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all managers',
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
                getAllDepartments()
                break;
            case 'View all roles':
                getAllRoles()
                break
            case 'View all managers':
                getAllManagers()
                break;
        }
    })
};

const getAllDepartments = () => {
    const sql = `
        SELECT departments.id, departments.name
        AS departments
        FROM departments
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
    })
};

const getAllRoles = () => {
    const sql = `
        SELECT roles.id, roles.title AS Role, roles.salary AS Salary, departments.name AS Department
        FROM roles
        LEFT JOIN departments
        ON roles.department_id = departments.id
    `;

    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
    })
};

const getAllManagers = () => {
    const sql = `
    SELECT employees.id, employees.first_name AS First, employees.last_name AS Last, roles.title AS Role
    FROM employees 
    LEFT JOIN roles
    ON employees.role_id = roles.id
    WHERE employees.id <= 3
    `;

    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
    })
}




app()