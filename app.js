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
                'Update database',
                'View budget'
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
            case 'Update database':
                updateDB();
                break;
            case 'View budget':
                getBudget();
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
    WHERE employees.manager_id IS NULL
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
                const sqlViewByManager = `
                SELECT *
                `;


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

const updateDB = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'updateDB',
            message: 'what data would you like to add?',
            choices: [
                'Add department',
                'Add role',
                'Add employee',
                'Update employee role',
                'Update employee manager',
                'Delete department',
                'Delete role',
                'Delete employee',
                'Back'
            ]
        }
    ]).then(input => {
        switch (input.updateDB) {
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole()
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'Update employee manager':
                updateEmployeeManager();
                break;
            case 'Delete department':
                deleteDept();
                break;
            case 'Delete role':
                deleteRole();
                break;
            case 'Delete employee':
                deleteEmployee();
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
            updateDB()
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
            updateDB();
        })
    })
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'text',
            name: 'firstName',
            message: "Please enter the employee's first name.",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter a valid name!');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'lastName',
            message: "Please enter the employee's last name.",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter a valid name!');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'roleId',
            message: "Please enter the employee's role id.",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log('Please enter a valid role id!');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'managerId',
            message: "Please enter the employee's manager id, if the employee is a manager leave blank"
        }
    ]).then(response => {
        const sql = `
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)
        `;
        let values
        if (!response.managerId) {
            values = [response.firstName, response.lastName, response.roleId, null];
        } else {
            values = [response.firstName, response.lastName, response.roleId, response.managerId];
        }

        db.query(sql, values, (err, results) => {
            if (err) throw err;
            console.log(`${response.firstName} has been added.`)
            updateDB();
        });
    });
};

const updateEmployeeRole = () => {
    const sqlEmployees = `
    SELECT * FROM employees
    `;

    db.query(sqlEmployees, (err, results) => {
        if (err) throw err;
        const employees = results.map(({id,first_name, last_name }) => ({name: first_name + ' ' + last_name, value: id}))
        return inquirer.prompt({

            type: 'list',
            name: 'name',
            message: 'Which employee would you like to update?',
            choices: employees

        }).then(input => {
            const sql = `
            SELECT * FROM roles
            `;

            db.query(sql, (err, results) => {
                if (err) throw err;
                const employeeName = input.name
                const roles = results.map(({id, title}) => ({name: title, value: id}))
                return inquirer.prompt([
                    {
                        type: 'list',
                        name: 'newRole',
                        message: "What's the employees new role?",
                        choices: roles
                    }
                ]).then(inputs => {
                    const sqlUpdate = `
                    UPDATE employees
                    SET role_id = ?
                    WHERE id = ?
                    `;
                    const params = [inputs.newRole, employeeName];

                    db.query(sqlUpdate, params, (err, results) => {
                        if (err) throw err;
                        console.log("Employee's role has been updated.");
                        updateDB();
                    });
                });
            });
        });
    });
};

const updateEmployeeManager = () => {
    const sqlEmployees = `
        SELECT * FROM employees
    `;

    db.query(sqlEmployees, (err, results) => {
        if (err) throw err;
        const employees = results.map(({id,first_name, last_name }) => ({name: first_name + ' ' + last_name, value: id}))
        return inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee would you like to update?',
                choices: employees
            },
            {
                type: 'number',
                name: 'manager',
                message: "Please enter the id of the employee's new manager",
            }
        ]).then(input => {
            const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`
            let params
            if (!input.manager) {
                params = [null, input.name];            
            } else {
                params = [input.manager, input.name];    
            }

            db.query(sql, params, (err, result) => {
                if (err) throw err
                console.log("Employee's manager updated successfully.")
                app()
            })
        })
    })
};


const deleteDept = () => {
    const sqlGetNames = `
    SELECT * FROM departments
    `;
    db.query(sqlGetNames, (err, results) => {
        if (err) throw err;
        const departments = results.map(({id, name}) => ({name: name, value: id}));
        return inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Please select which department you would like to delete.',
                choices: departments
            }
        ]).then(input => {
            const sqlDelete = `
            DELETE FROM departments WHERE id = ?
            `;
            const department = input.name;
            db.query(sqlDelete, department, (err, results) => {
                if (err) throw err;
                console.log('Department deleted.');
                updateDB();
            })
        })
    })
}

const deleteRole = () => {
    const sqlGetRole = `
    SELECT * FROM roles
    `;

    db.query(sqlGetRole, (err, results) => {
        if (err) throw err;
        const roles = results.map(({id, title}) => ({name: title, value: id}));
        return inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Please select which role you want to delete.',
                choices: roles
            }
        ]).then(input => {
            const sqlDelete = `
            DELETE FROM roles WHERE id = ?
            `;
            const role = input.name;
            db.query(sqlDelete, role, (err, results) => {
                if (err) throw err;
                console.log(`Role has been deleted.`);
                updateDB();
            });
        });
    });
};

const deleteEmployee = () => {
    const sqlGetNames = `
    SELECT * FROM employees
    `;
    db.query(sqlGetNames, (err, results) => {
        if (err) throw err;
        const employees = results.map(({id, first_name, last_name}) => ({name: first_name + ' ' + last_name, value: id}))
        return inquirer.prompt([
            {
                type: 'list', 
                name: 'name',
                message: 'Please select which employee you would like to delete.',
                choices: employees
            }
        ]).then(input => {
            const employee = input.name;
            const sqlDelete = `
            DELETE FROM employees WHERE id = ?
            `;
            db.query(sqlDelete, employee, (err, result) => {
                if (err) throw err;
                console.log('Employee deleted.');
                updateDB();
            })
        })   
    })
}

const getBudget = () => {
    const sql = `SELECT * FROM departments`
    db.query(sql, (err, result) => {
        if (err) throw err;
        const departments = result.map(({ id, name }) => ({ name: name, value: id}))
        inquirer.prompt({
            type: 'list',
            name: 'dept',
            message: "Select department who's budget you would like to view.",
            choices: departments
        }).then(choice => {
            const sql = `SELECT SUM(salary) AS budget FROM roles WHERE department_id = ?`;
            db.query(sql, choice.dept, (err, rows) => {
                if (err) throw err;
                console.table(rows)
                app()
            })
        })
    })
}

app()

module.exports = app;