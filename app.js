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

const app = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'startUp',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all managers',
                'View employees',
                'Add to database',
                'View total salary expenditure'
            ]
        }
    ]).then(choice => {
        switch (choice.startUp) {
            case 'View all departments':
                getAllDepartments();
                break;
            case 'View all roles':
                getAllRoles();
                break;
            case 'View all managers':
                getAllManagers();
                break;
            case 'View employees':
                getEmployees();
                break;
            case 'Add to database':
                console.log('case log')
                addToDB();
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
        app()
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
        app();
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
        app()
    })
}

const getEmployees = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'How would you like to view employees',
            choices: [
                'View all employees',
                'View employee by manager',
                'View employee by department',
                'Back'
            ]
        }
    ]).then(choice => {
        switch (choice.menu) {
            case 'View all employees':
                const sqlViewAll = `
                SELECT employees.id, employees.first_name AS First, employees.last_name AS Last,
                roles.title AS Role, departments.name AS Department, roles.salary AS salary, 
                employees.manager_id AS Manager
                FROM employees
                INNER JOIN roles
                ON employees.role_id = roles.id
                INNER JOIN departments
                on roles.department_id = departments.id
                WHERE employees.id >= 4
                `;
                db.query(sqlViewAll, (err, results) => {
                    if (err) throw err;
                    console.table(results);
                    getEmployees()
                });
                break;
            case 'View employee by manager':
                inquirer.prompt([
                    {
                        type: 'number',
                        name: 'manager_id',
                        message: 'Please input the id of the manager you want to sort by.',
                        validate: input => {
                            if (input) {
                                console.log("If no table is show, check that the id you're using is correct")
                                return true;
                            } else {
                                console.log('Please enter a valid id!');
                                return false;
                            }
                        }

                    }
                ]).then(id => {
                    const sqlViewByManager = `
                    SELECT employees.id, employees.first_name AS First, employees.last_name AS last, 
                    roles.title AS Role
                    FROM employees 
                    LEFT JOIN roles
                    ON employees.role_id = roles.id
                    WHERE manager_id = ?
                    `;

                    db.query(sqlViewByManager, id.manager_id, (err, results) => {
                        if (err) throw err;
                        console.table(results);
                        getEmployees()
                    })
                   
                })
                break;
            case 'View employee by department':
                return inquirer.prompt([
                    {
                        type: 'number',
                        name: 'department_id',
                        message: 'Please input departments id.',
                        validate: input => {
                            if (input) {
                                return true;
                            } else {
                                console.log('Please enter a valid id')
                                return false;
                            }
                        }
                    }
                ]).then(id => {
                    const sqlViewByDepartment = `
                    SELECT employees.id, employees.first_name AS First, employees.last_name AS Last, 
                    roles.title AS Role
                    FROM employees
                    INNER JOIN roles
                    ON employees.role_id = roles.id
                    INNER JOIN departments
                    ON roles.department_id = departments.id
                    Where roles.department_id = ?
                    `;

                    db.query(sqlViewByDepartment, id.department_id, (err, results) => {
                        if (err) throw err;
                        console.table(results);
                        getEmployees();
                    })

                });
                break;
            case 'Back':
                app();
                break;
        }
    })
}


const addToDB = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'addDB',
            message: 'what data would you like to add?',
            choices: [
                'Add department',
                'Add role',
                'Add employee',
                'Update an employee',
                "Update an employee's manager",
                'Back'
            ]
        }
    ]).then(input => {
        switch (input.addDB) {
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole()
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update an employee':
                updateEmployee();
                break;
            case"Update an employee's manager":
                updateEmployeeManager();
                break;
            case 'Back':
                app();
                break;
        }
    })
}

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'addDepartment',
            message: 'Place enter the name of the new department.',
            validate: input => {
                if (input) {
                    return true;
                } else { 
                    console.log('Please enter a valid name!');
                    return false;
                }
            }
        }
    ]).then(input => {
        const sql = `
        INSERT INTO departments (name)
        VALUES (?)
        `;

        db.query(sql, input.addDepartment, (err, results) => {
            if (err) throw err;
            console.log(`${input.addDepartment} department has been added.`);
            addToDB()
        })
    })
}

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'roleName',
            message: 'Please enter the name of the new role.',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please input a valid name!');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'roleSalary',
            message: "Please enter the role's salary, using numbers only.",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please input a valid salary!');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'roleDeptId',
            message: "Please enter the id of the role's department.",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please input a valid id!');
                    return false;
                }
            }
        }
    ]).then(response => {
        const sql = `
        INSERT INTO roles (title, salary, department_id)
        VALUES (?,?,?)
        `;
        const values = [response.roleName, response.roleSalary, response.roleDeptId];

        db.query(sql, values, (err, results) => {
            if (err) throw err;
            console.log(`${response.roleName} has been added.`);
            addToDB();
        })
    })
}

app()